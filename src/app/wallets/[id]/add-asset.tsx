import { useMemo } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { router, useLocalSearchParams } from 'expo-router';
import { WalletAssetPickerSkeleton } from '@/features/wallets/components/WalletAssetPickerSkeleton';
import { ErrorView } from '@/components/ErrorView';
import { EmptyView } from '@/components/EmptyView';
import { PortfolioAssetWithMetrics } from '@/domain/entities/portfolio';
import { WalletNavBar } from '@/features/wallets/components/WalletNavBar';
import { AssetPickerItem } from '@/features/wallets/components/AssetPickerItem';
import { useWalletsStore } from '@/features/wallets/store/wallets.store';
import { usePortfolioQuery } from '@/hooks/usePortfolioQuery';
import { resolveErrorMessage } from '@/domain/interfaces';
import { styles } from '@/features/wallets/styles/wallet-add-asset.styles';

export default function AddAssetScreen() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();

  const wallet = useWalletsStore((state) => state.wallets.find((wallet) => wallet.id === id));
  const { holdings, isLoading, isError, error, refetch } = usePortfolioQuery();

  const allocationMap = useMemo(
    () => new Map(wallet?.allocations.map((alloc) => [alloc.ticker, alloc.quantity]) ?? []),
    [wallet?.allocations],
  );

  function handleAssetPress(asset: PortfolioAssetWithMetrics) {
    router.push(`/wallets/${id}/${asset.ticker}`);
  }

  const title = t('wallets.addAssetTitle', { walletName: wallet?.name ?? '' });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <WalletNavBar title={title} />

      {isLoading ? (
        <WalletAssetPickerSkeleton />
      ) : isError ? (
        <ErrorView
          message={resolveErrorMessage(error, t('wallets.fetchError'))}
          onRetry={refetch}
        />
      ) : (
        <FlatList
          data={holdings}
          keyExtractor={(item) => item.instrument_id.toString()}
          renderItem={({ item }) => (
            <AssetPickerItem
              asset={item}
              assignedQuantity={allocationMap.get(item.ticker) ?? null}
              onPress={handleAssetPress}
            />
          )}
          ListEmptyComponent={
            <EmptyView message={t('wallets.noPortfolioAssets')} icon="wallet-outline" />
          }
        />
      )}
    </SafeAreaView>
  );
}
