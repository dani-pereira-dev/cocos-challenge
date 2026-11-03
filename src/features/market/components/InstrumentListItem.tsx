import { Pressable, StyleSheet, View } from 'react-native';
import { Instrument } from '@/domain/entities/instrument';
import { calculateInstrumentReturn } from '@/domain/use-cases/calculations';
import { formatCurrency } from '@/utils/formatters';
import { Text } from '@ui-kit/components/Text';
import { colors } from '@ui-kit/foundations/colors';
import { spacing } from '@ui-kit/foundations/spacing';
import { ReturnBadge } from './ReturnBadge';
import { TickerAvatar } from './TickerAvatar';

interface InstrumentListItemProps {
  instrument: Instrument;
  onPress?: (instrument: Instrument) => void;
}

export function InstrumentListItem({ instrument, onPress }: InstrumentListItemProps) {
  const returnRate = calculateInstrumentReturn(instrument.last_price, instrument.close_price);

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() => onPress?.(instrument)}
    >
      <TickerAvatar ticker={instrument.ticker} />

      <View style={styles.info}>
        <Text variant="bodySemibold" numberOfLines={1}>
          {instrument.ticker}
        </Text>
        <Text variant="caption" color="secondary" numberOfLines={1}>
          {instrument.name}
        </Text>
      </View>

      <View style={styles.priceBlock}>
        <Text variant="bodySemibold" align="right">
          {formatCurrency(instrument.last_price)}
        </Text>
        <ReturnBadge value={returnRate} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing['4'],
    paddingVertical: spacing['3'],
    backgroundColor: colors.surface,
    gap: spacing['3'],
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  pressed: {
    backgroundColor: colors.surfaceSecondary,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  priceBlock: {
    alignItems: 'flex-end',
    gap: 2,
  },
});
