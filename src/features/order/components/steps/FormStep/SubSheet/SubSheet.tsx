import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@ui-kit';
import { isLimitOrder, isMarketOrder, OrderType } from '@/domain/entities/order';
import { QuantityMode } from '@/features/order/utils/order-form';
import { SubSheetType } from '@/features/order/hooks/useOrderForm';
import { styles } from './SubSheet.styles';

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
  const { t } = useTranslation();

  if (!subSheet) return null;

  return (
    <>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.handle} />

        {subSheet === 'mode' ? (
          <>
            <RadioRow
              label={t('order.byAmount')}
              selected={quantityMode === 'amount'}
              onPress={() => onSelectQuantityMode('amount')}
            />
            <RadioRow
              label={t('order.byShares')}
              selected={quantityMode === 'shares'}
              onPress={() => onSelectQuantityMode('shares')}
            />
          </>
        ) : (
          <>
            <RadioRow
              label={t('order.typeMarket')}
              selected={isMarketOrder(orderType)}
              onPress={() => onSelectOrderType('MARKET')}
            />
            <RadioRow
              label={t('order.typeLimit')}
              selected={isLimitOrder(orderType)}
              onPress={() => onSelectOrderType('LIMIT')}
            />
          </>
        )}
      </View>
    </>
  );
}
