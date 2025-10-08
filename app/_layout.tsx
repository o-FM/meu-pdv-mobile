import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { RootState, store } from '@/store/store';
import { useLoadTokens } from '@/hooks/useAuth';
import { getAccessToken } from '@/lib/token';
import { setAuthenticated } from '@/store/auth-slice';
import { useProfile } from '@/hooks/useProfile';

function RootLayoutNav() {
  const segments = useSegments();
  const router = useRouter();
  const rootNavigation = useRootNavigationState();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const tokensLoaded = useLoadTokens();
  const profileQuery = useProfile();

  useEffect(() => {
    // 1️⃣ Aguarda a navegação raiz ser inicializada
    if (!rootNavigation?.key) return;

    // 2️⃣ Aguarda tokens e perfil carregarem
    if (!tokensLoaded || profileQuery.isLoading) return;

    const token = getAccessToken();

    if (token && profileQuery.status === 'success' && profileQuery.data) {
      const { name, email } = profileQuery.data;
      dispatch(setAuthenticated({ name, email }));
    }

    const inAuthGroup = segments[0] === '(auth)';

    // 3️⃣ Só navega se tudo estiver consistente
    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/signin');
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [
    isAuthenticated,
    segments,
    router,
    tokensLoaded,
    dispatch,
    profileQuery.status,
    profileQuery.data,
    rootNavigation?.key,
  ]);

  return <Slot />;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <RootLayoutNav />
          <StatusBar style="auto" />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
