import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{ email: string, password?: string }>) => {
      // Em um aplicativo real, você faria uma chamada de API aqui
      // para verificar as credenciais do usuário.
      state.isAuthenticated = true;
      state.user = { name: 'Usuário', email: action.payload.email };
    },
    signUp: (state, action: PayloadAction<{ name: string, email: string, password?: string }>) => {
      // Em um aplicativo real, você faria uma chamada de API aqui
      // para registrar o usuário.
      state.isAuthenticated = true;
      state.user = { name: action.payload.name, email: action.payload.email };
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { signIn, signUp, signOut } = authSlice.actions;
export default authSlice.reducer;
