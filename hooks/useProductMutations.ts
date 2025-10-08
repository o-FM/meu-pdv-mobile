import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => {
      const resp = await api.post('/products', payload);
      return resp.data;
    },
  onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] as const }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...payload }: any) => {
      const resp = await api.put(`/products/${id}`, payload);
      return resp.data;
    },
  onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] as const }),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string | number) => {
      const resp = await api.delete(`/products/${id}`);
      return resp.data;
    },
  onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] as const }),
  });
}
