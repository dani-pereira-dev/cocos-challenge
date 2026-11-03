import { Pressable, View } from 'react-native';
import { Text } from '@ui-kit/components/Text';
import { isLimitOrder, isMarketOrder, OrderType } from '@/domain/entities/order';
import { QuantityMode } from '@/features/order/utils/order-form';
import { SubSheetType } from '@/features/order/hooks/useOrderForm';
import { copy } from '@/constants/copy';
import { styles } from './SubSheet.styles';

// RadioRow es un detalle de implementación interno del SubSheet
interface RadioRowProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

function RadioRow({ label, selected, onPress }: RadioRowProps) {
  return (
    <Pressable style={styles.radioRow} onPress={onPress}>
      <Text
        variant={selected ? 'bodySemibold' : 'body'}
        color={selected ? 'brand' : 'primary'}
        style={styles.radioLabel}
      >
        {label}
      </Text>
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected ? <View style={styles.radioInner} /> : null}
      </View>
    </Pressable>
  );
}

interface SubSheetProps {
  subSheet: SubSheetType;
  quantityMode: QuantityMode;
  orderType: OrderType;
  onClose: () => void;
  onSelectQuantityMode: (mode: QuantityMode) => void;
  onSelectOrderType: (type: OrderType) => void;
}

export function SubSheet({
  subSheet,
  quantityMode,
  orderType,
  onClose,
  onSelectQuantityMode,
  onSelectOrderType,
}: SubSheetProps) {
  if (!subSheet) return null;

  return (
    <>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.handle} />

        {subSheet === 'mode' ? (
          <>
            <RadioRow
              label={copy.order.byAmount}
              selected={quantityMode === 'amount'}
              onPress={() => onSelectQuantityMode('amount')}
            />
            <RadioRow
              label={copy.order.byShares}
              selected={quantityMode === 'shares'}
              onPress={() => onSelectQuantityMode('shares')}
            />
          </>
        ) : (
          <>
            <RadioRow
              label={copy.order.typeMarket}
              selected={isMarketOrder(orderType)}
              onPress={() => onSelectOrderType('MARKET')}
            />
            <RadioRow
              label={copy.order.typeLimit}
              selected={isLimitOrder(orderType)}
              onPress={() => onSelectOrderType('LIMIT')}
            />
          </>
        )}
      </View>
    </>
  );
}
