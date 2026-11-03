import '@/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { styles } from '@/styles/layout.styles';

// Reactotron solo se inicializa en desarrollo — no afecta builds de producción
if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@/config/reactotron.config');
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Reintenta una sola vez ante un error antes de mostrar el estado de fallo
      retry: 1,
      // Considera los datos frescos por 2 minutos para evitar refetches innecesarios
      staleTime: 2 * 60 * 1000,
    },
  },
});

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }} />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
