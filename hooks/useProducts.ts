import { useInfiniteQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export function useProducts(search?: string) {
  return useInfiniteQuery({
    queryKey: ['products', search],
    queryFn: async ({ pageParam = 0 }: { pageParam?: number }) => {
      const resp = await api.get('/products', { params: { q: search, page: pageParam, size: 20 } });
      return resp.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: any, pages: any[]) => {
      if (lastPage?.hasNext) return pages.length;
      return undefined;
    },
  });
}
