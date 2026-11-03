import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * En web, devuelve siempre el esquema de colores del sistema.
 * En SSR/pre-render no aplica para React Native.
 */
export function useColorScheme() {
  return useRNColorScheme();
}
