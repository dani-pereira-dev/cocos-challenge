import { FlatList, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { Button, Text } from '@ui-kit';

import { formatCurrency } from '@/utils/formatters';
import { EnrichedAllocation } from '../../hooks/useWalletDetail';
import { WalletAssetItem } from '../WalletAssetItem';
import { styles } from './WalletAssetList.styles';

interface WalletAssetListProps {
  allocations: EnrichedAllocation[];
  totalValue: number;
  walletId: string;
  onDeleteAllocation: (ticker: string) => void;
}

export function WalletAssetList({
  allocations,
  totalValue,
  walletId,
  onDeleteAllocation,
}: WalletAssetListProps) {
  const { t } = useTranslation();

  return (
    <>
      <View style={styles.totalRow}>
        <Text variant="caption" color="secondary">
          {t('wallets.totalValorizado')}
        </Text>
        <Text variant="bodySemibold">{formatCurrency(totalValue)}</Text>
      </View>

      <FlatList
        data={allocations}
        keyExtractor={(item) => item.ticker}
        renderItem={({ item }) => (
          <WalletAssetItem allocation={item} onDelete={onDeleteAllocation} />
        )}
        style={styles.list}
      />

      <View style={styles.footer}>
        <Button
          label={t('wallets.addAsset')}
          onPress={() => router.push(`/wallets/${walletId}/add-asset`)}
          size="md"
          fullWidth
        />
      </View>
    </>
  );
}
