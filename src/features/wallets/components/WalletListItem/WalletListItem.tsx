import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@ui-kit/components/Text';
import { CustomWallet } from '@/domain/entities/wallet';
import { colors } from '@ui-kit/foundations/colors';
import { formatCurrency } from '@/utils/formatters';
import { useWalletTotals } from '../../hooks/useWalletTotals';
import { styles } from './WalletListItem.styles';

interface WalletListItemProps {
  wallet: CustomWallet;
  onPress: (wallet: CustomWallet) => void;
}

export function WalletListItem({ wallet, onPress }: WalletListItemProps) {
  const { t } = useTranslation();
  const total = useWalletTotals(wallet);
  const assetCount = wallet.allocations.length;

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() => onPress(wallet)}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="briefcase-outline" size={22} color={colors.primary} />
      </View>

      <View style={styles.info}>
        <Text variant="bodySemibold" numberOfLines={1}>
          {wallet.name}
        </Text>
        <Text variant="caption" color="secondary">
          {t('wallets.assetsCount', { count: assetCount })}
          {assetCount > 0 ? `  ·  ${formatCurrency(total)}` : ''}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
    </Pressable>
  );
}
