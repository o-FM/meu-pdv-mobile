import authReducer, { setAuthenticated, clearAuth } from '@/store/auth-slice';

describe('auth slice', () => {
  it('should set authenticated user', () => {
    const initialState = { isAuthenticated: false, user: null };
    const next = authReducer(initialState as any, setAuthenticated({ name: 'Tiago', email: 't@t.com' }));
    expect(next.isAuthenticated).toBe(true);
    expect(next.user).toEqual({ name: 'Tiago', email: 't@t.com' });
  });

  it('should clear auth', () => {
    const state = { isAuthenticated: true, user: { name: 'X', email: 'x@x.com' } };
    const next = authReducer(state as any, clearAuth());
    expect(next.isAuthenticated).toBe(false);
    expect(next.user).toBeNull();
  });
});
