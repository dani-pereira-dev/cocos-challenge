import { ErrorBoundaryProps } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { boundaryStyles } from './GlobalErrorFallback.styles';

export function GlobalErrorFallback({ error, retry }: ErrorBoundaryProps) {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={boundaryStyles.container}>
      <Text style={boundaryStyles.title}>{t('common.somethingWentWrong')}</Text>
      <Text style={boundaryStyles.message}>{t('common.unexpectedError')}</Text>
      {__DEV__ && <Text style={boundaryStyles.detail}>{error.message}</Text>}
      <Pressable style={boundaryStyles.button} onPress={retry}>
        <Text style={boundaryStyles.buttonLabel}>{t('common.retry')}</Text>
      </Pressable>
    </SafeAreaView>
  );
}
