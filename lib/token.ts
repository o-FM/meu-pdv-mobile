import * as SecureStore from 'expo-secure-store';

const ACCESS_KEY = 'meupdv_access_token';
const REFRESH_KEY = 'meupdv_refresh_token';

let accessToken: string | null = null;
let refreshToken: string | null = null;

export async function loadTokensFromStorage() {
  try {
    accessToken = await SecureStore.getItemAsync(ACCESS_KEY);
    refreshToken = await SecureStore.getItemAsync(REFRESH_KEY);
  } catch (e) {
    // ignore
  }
}

export function getAccessToken() {
  return accessToken;
}

export function getRefreshToken() {
  return refreshToken;
}

export async function setTokens({ access, refresh }: { access: string; refresh?: string }) {
  accessToken = access;
  if (refresh) refreshToken = refresh;
  try {
    await SecureStore.setItemAsync(ACCESS_KEY, access);
    if (refresh) await SecureStore.setItemAsync(REFRESH_KEY, refresh);
  } catch (e) {
    // ignore
  }
}

export async function clearTokens() {
  accessToken = null;
  refreshToken = null;
  try {
    await SecureStore.deleteItemAsync(ACCESS_KEY);
    await SecureStore.deleteItemAsync(REFRESH_KEY);
  } catch (e) {
    // ignore
  }
}
