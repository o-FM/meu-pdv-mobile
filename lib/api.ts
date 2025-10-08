import axios from 'axios';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from './token';

const BASE_URL = 'https://api.meupdv.com/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (val?: any) => void; reject: (err?: any) => void; config: any }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;

    if (err.response && err.response.status === 401 && !originalConfig._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject, config: originalConfig });
        })
          .then((token) => {
            originalConfig.headers.Authorization = `Bearer ${token}`;
            return api(originalConfig);
          })
          .catch((e) => Promise.reject(e));
      }

      originalConfig._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        await clearTokens();
        isRefreshing = false;
        processQueue(new Error('No refresh token'));
        return Promise.reject(err);
      }

      try {
        const response = await axios.post(`${BASE_URL}/auth/refresh`, { token: refreshToken });
        const newAccess = response.data?.accessToken || response.data?.access;
        const newRefresh = response.data?.refreshToken || response.data?.refresh;
        if (newAccess) {
          await setTokens({ access: newAccess, refresh: newRefresh });
          processQueue(null, newAccess);
          originalConfig.headers.Authorization = `Bearer ${newAccess}`;
          return api(originalConfig);
        }
      } catch (e) {
        await clearTokens();
        processQueue(e, null);
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default api;
