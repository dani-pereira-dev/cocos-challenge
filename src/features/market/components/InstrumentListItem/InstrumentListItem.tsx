import { Pressable, View } from 'react-native';
import { Instrument } from '@/domain/entities/instrument';
import { calculateInstrumentReturn } from '@/domain/use-cases/calculations';
import { formatCurrency } from '@/utils/formatters';
import { Text } from '@ui-kit/components/Text';
import { ReturnBadge } from '@/components/ReturnBadge';
import { TickerAvatar } from '@/components/TickerAvatar';
import { styles } from './InstrumentListItem.styles';

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
