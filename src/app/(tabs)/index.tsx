import { FlatList, RefreshControl, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Text, colors } from '@ui-kit';
import { styles } from '@/features/portfolio/portfolio.screen.styles';
import { PortfolioEmptyState } from '@/features/portfolio/components/PortfolioEmptyState';
import { ErrorView } from '@/components/ErrorView';
import { PortfolioSkeleton } from '@/features/portfolio/components/PortfolioSkeleton';
import { PortfolioAssetWithMetrics } from '@/domain/entities/portfolio';
import { PortfolioListItem } from '@/features/portfolio/components/PortfolioListItem';
import { PortfolioSummaryHeader } from '@/features/portfolio/components/PortfolioSummaryHeader';
import { resolveErrorMessage } from '@/domain/interfaces';
import { usePortfolioQuery } from '@/hooks/usePortfolioQuery';
import { useOrderModalStore } from '@/features/order/store/orderModal.store';
import { WalletBanner } from '@/features/wallets/components/WalletBanner';

export default function PortfolioScreen() {
  const { t } = useTranslation();
  const { holdings, cash, isLoading, isRefetching, isError, error, refetch } = usePortfolioQuery();
  const openOrder = useOrderModalStore((s) => s.openOrder);

  function handleRefresh() {
    refetch();
  }

  function handleAssetPress(asset: PortfolioAssetWithMetrics) {
    openOrder({
      id: asset.instrument_id,
      ticker: asset.ticker,
      last_price: asset.last_price,
      quantity: asset.quantity,
    });
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text variant="h3">{t('portfolio.title')}</Text>
      </View>

      {isLoading ? (
        <PortfolioSkeleton />
      ) : isError ? (
        <ErrorView
          message={resolveErrorMessage(error, t('portfolio.fetchError'))}
          onRetry={refetch}
        />
      ) : (
        <FlatList
          data={holdings}
          keyExtractor={(item) => item.instrument_id.toString()}
          renderItem={({ item }) => <PortfolioListItem asset={item} onPress={handleAssetPress} />}
          ListHeaderComponent={
            <>
              <PortfolioSummaryHeader assets={holdings} cash={cash} />
              <WalletBanner />
            </>
          }

          ListEmptyComponent={<PortfolioEmptyState />}
          contentContainerStyle={holdings.length === 0 ? styles.emptyList : undefined}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={handleRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
          removeClippedSubviews
          maxToRenderPerBatch={20}
          windowSize={10}
        />
      )}
    </SafeAreaView>
  );
}
