import { View, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@ui-kit/components/Button';
import { Text } from '@ui-kit/components/Text';
import { colors } from '@ui-kit/foundations/colors';
import { styles } from './ErrorView.styles';

interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
  style?: ViewStyle;
}

export function ErrorView({ message, onRetry, style }: ErrorViewProps) {
  const { t } = useTranslation();
  const resolvedMessage = message ?? t('common.genericError');

  return (
    <View style={[styles.container, style]}>
      <Ionicons name="alert-circle-outline" size={48} color={colors.warning} style={styles.icon} />
      <Text variant="bodyMedium" color="primary" align="center">
        {t('common.somethingWentWrong')}
      </Text>
      <Text variant="body" color="secondary" align="center" style={styles.message}>
        {resolvedMessage}
      </Text>
      {onRetry ? (
        <Button
          label={t('common.retry')}
          onPress={onRetry}
          variant="outline"
          size="sm"
          fullWidth={false}
          style={styles.button}
        />
      ) : null}
    </View>
  );
}
