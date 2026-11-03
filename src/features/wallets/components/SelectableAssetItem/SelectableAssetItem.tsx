import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@ui-kit/components/Text';
import { TickerAvatar } from '@/components/TickerAvatar';
import { colors } from '@ui-kit/foundations/colors';
import { formatCurrency } from '@/utils/formatters';
import { EnrichedAllocation } from '../../hooks/useWalletDetail';
import { styles } from './SelectableAssetItem.styles';

interface SelectableAssetItemProps {
  allocation: EnrichedAllocation;
  selected: boolean;
  onToggle: (ticker: string) => void;
}

export function SelectableAssetItem({ allocation, selected, onToggle }: SelectableAssetItemProps) {
  const { t } = useTranslation();

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() => onToggle(allocation.ticker)}
    >
      <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
        {selected ? (
          <Ionicons name="checkmark" size={14} color={colors.textInverse} />
        ) : null}
      </View>

      <TickerAvatar ticker={allocation.ticker} size={44} />

      <View style={styles.info}>
        <Text variant="bodySemibold" numberOfLines={1}>
          {allocation.ticker}
        </Text>
        <Text variant="caption" color="tertiary">
          {t('wallets.shares', { count: allocation.quantity })}
        </Text>
      </View>

      <Text variant="caption" color="secondary" align="right">
        {formatCurrency(allocation.currentValue)}
      </Text>
    </Pressable>
  );
}
