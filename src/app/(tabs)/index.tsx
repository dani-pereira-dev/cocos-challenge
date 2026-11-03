import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Text } from '@ui-kit/components/Text';
import { EmptyView } from '@/components/EmptyView';
import { styles } from '@/features/portfolio/portfolio.screen.styles';
import { ErrorView } from '@/components/ErrorView';
import { PortfolioSkeleton } from '@/features/portfolio/components/PortfolioSkeleton';
import { PortfolioAssetWithMetrics } from '@/domain/entities/portfolio';
import { PortfolioListItem } from '@/features/portfolio/components/PortfolioListItem';
import { PortfolioSummaryHeader } from '@/features/portfolio/components/PortfolioSummaryHeader';
import { resolveErrorMessage } from '@/domain/interfaces/api-error';
import { usePortfolioQuery } from '@/hooks/usePortfolioQuery';
import { useOrderModalStore } from '@/store';
import { WalletBanner } from '@/features/wallets/components/WalletBanner';

export default function PortfolioScreen() {
  const { t } = useTranslation();
  const { holdings, cash, isLoading, isError, error, refetch } = usePortfolioQuery();
  const openOrder = useOrderModalStore((s) => s.openOrder);

  function handleAssetPress(asset: PortfolioAssetWithMetrics) {
    openOrder({
      id: asset.instrument_id,
      ticker: asset.ticker,
      name: asset.ticker,
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

          ListEmptyComponent={
            <EmptyView message={t('portfolio.noAssets')} style={styles.emptyContainer} />
          }
          contentContainerStyle={holdings.length === 0 ? styles.emptyList : undefined}
          removeClippedSubviews
          maxToRenderPerBatch={20}
          windowSize={10}
        />
      )}
    </SafeAreaView>
  );
}
