import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const resp = await api.get('/auth/me');
      return resp.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
}
