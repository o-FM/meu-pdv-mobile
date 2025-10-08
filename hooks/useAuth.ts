import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { setTokens, clearTokens, loadTokensFromStorage } from '@/lib/token';
import { useEffect, useState } from 'react';

export function useLoadTokens() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      await loadTokensFromStorage();
      setLoaded(true);
    })();
  }, []);
  return loaded;
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation<any, Error, { email: string; password: string }>({
    mutationFn: async (payload) => {
      const resp = await api.post('/auth/login', payload);
      const { accessToken, refreshToken } = resp.data;
      if (!accessToken) throw new Error('No access token returned');
      await setTokens({ access: accessToken, refresh: refreshToken });
      qc.clear();
      return resp.data;
    },
  });
}

export function useLogout() {
  return useMutation<void, Error, void>({
    mutationFn: async () => {
      await clearTokens();
    },
  });
}
