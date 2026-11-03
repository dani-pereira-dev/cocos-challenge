import { StyleSheet, View, ViewStyle } from 'react-native';
import { Button } from '@ui-kit/components/Button';
import { Text } from '@ui-kit/components/Text';
import { spacing } from '@ui-kit/foundations/spacing';
import { copy } from '@/constants/copy';

interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
  style?: ViewStyle;
}

export function ErrorView({
  message = copy.common.genericError,
  onRetry,
  style,
}: ErrorViewProps) {
  return (
    <View style={[styles.container, style]}>
      <Text variant="h3" style={styles.icon}>⚠️</Text>
      <Text variant="bodyMedium" color="primary" align="center">
        {copy.common.somethingWentWrong}
      </Text>
      <Text variant="body" color="secondary" align="center" style={styles.message}>
        {message}
      </Text>
      {onRetry ? (
        <Button
          label={copy.common.retry}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['8'],
    gap: spacing['3'],
  },
  icon: {
    fontSize: 40,
  },
  message: {
    marginBottom: spacing['2'],
  },
  button: {
    marginTop: spacing['2'],
  },
});
