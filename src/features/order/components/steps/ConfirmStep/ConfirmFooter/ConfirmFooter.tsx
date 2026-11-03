import { View } from 'react-native';
import { Button } from '@ui-kit/components/Button';
import { Text } from '@ui-kit/components/Text';
import { formatCurrency } from '@/utils/formatters';
import { copy } from '@/constants/copy';
import { SystemErrorBanner } from '../SystemErrorBanner/SystemErrorBanner';
import { styles } from './ConfirmFooter.styles';

interface ConfirmFooterProps {
  estimatedLabel: string;
  netTotal: number;
  accentColor: string;
  systemError: string | null;
  isPending: boolean;
  onSubmit: () => void;
}

export function ConfirmFooter({
  estimatedLabel,
  netTotal,
  accentColor,
  systemError,
  isPending,
  onSubmit,
}: ConfirmFooterProps) {
  return (
    <View style={styles.footer}>
      {systemError ? <SystemErrorBanner message={systemError} /> : null}
      <View style={styles.total}>
        <Text variant="body" color="secondary" style={styles.totalLabel}>
          {estimatedLabel}
        </Text>
        <Text
          variant="bodySemibold"
          style={[styles.totalAmount, { color: accentColor }]}
          adjustsFontSizeToFit
          minimumFontScale={0.5}
          numberOfLines={1}
        >
          {'≈ '}
          {formatCurrency(netTotal)}
        </Text>
      </View>
      <Button
        label={isPending ? copy.order.sendingButton : copy.order.confirmButton}
        onPress={onSubmit}
        loading={isPending}
        disabled={isPending}
        size="md"
        fullWidth
      />
    </View>
  );
}
