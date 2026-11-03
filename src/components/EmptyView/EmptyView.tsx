import { View, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@ui-kit/components/Text';
import { styles } from './EmptyView.styles';

interface EmptyViewProps {
  title?: string;
  message?: string;
  style?: ViewStyle;
}

export function EmptyView({ title, message, style }: EmptyViewProps) {
  const { t } = useTranslation();
  const resolvedTitle = title ?? t('common.noResults');

  return (
    <View style={[styles.container, style]}>
      <Text variant="h3" align="center" style={styles.icon}>
        🔍
      </Text>
      <Text variant="bodyMedium" color="primary" align="center">
        {resolvedTitle}
      </Text>
      {message ? (
        <Text variant="body" color="secondary" align="center">
          {message}
        </Text>
      ) : null}
    </View>
  );
}
