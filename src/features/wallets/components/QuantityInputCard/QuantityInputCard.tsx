import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text, TextInput } from '@ui-kit';

import { formatAmount } from '@/utils/formatters';
import { PortfolioAssetWithMetrics } from '@/domain/entities/portfolio';
import { styles } from './QuantityInputCard.styles';

interface QuantityInputCardProps {
  holding: PortfolioAssetWithMetrics | undefined;
  quantityInput: string;
  exceedsHolding: boolean;
  onChangeText: (value: string) => void;
  onUseAll: () => void;
  onSubmit: () => void;
}

export function QuantityInputCard({
  holding,
  quantityInput,
  exceedsHolding,
  onChangeText,
  onUseAll,
  onSubmit,
}: QuantityInputCardProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text variant="label" color="secondary">
          {t('wallets.quantityLabel')}
        </Text>
        {holding ? (
          <View style={styles.availableRow}>
            <Text variant="caption" color="secondary">
              {t('wallets.availableQuantity', { quantity: holding.quantity })}
            </Text>
            <Pressable onPress={onUseAll} hitSlop={8}>
              <Text variant="label" color="brand">
                {t('wallets.useAll')}
              </Text>
            </Pressable>
          </View>
        ) : null}
      </View>

      <TextInput
        value={quantityInput}
        onChangeText={onChangeText}
        keyboardType="numeric"
        placeholder="0"
        returnKeyType="done"
        onSubmitEditing={onSubmit}
      />

      {exceedsHolding && holding ? (
        <Text variant="caption" color="error">
          {t('wallets.exceededHolding', { quantity: holding.quantity })}
        </Text>
      ) : holding ? (
        <Text variant="caption" color="secondary" style={styles.priceHint}>
          {t('common.currencyPrefix')} {formatAmount(holding.last_price)} / título
        </Text>
      ) : null}
    </View>
  );
}
