import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@ui-kit/components/Text';
import { colors } from '@ui-kit/foundations/colors';
import { spacing } from '@ui-kit/foundations/spacing';
import { EmptyView } from '@/components/EmptyView';
import { ErrorView } from '@/components/ErrorView';
import { LoadingView } from '@/components/LoadingView';
import { PortfolioAssetWithMetrics } from '@/domain/entities/portfolio';
import { PortfolioListItem } from '@/features/portfolio/components/PortfolioListItem';
import { PortfolioSummaryHeader } from '@/features/portfolio/components/PortfolioSummaryHeader';
import { resolveErrorMessage } from '@/domain/interfaces/api-error';
import { usePortfolioQuery } from '@/hooks/usePortfolioQuery';
import { useOrderModalStore } from '@/store';
import { copy } from '@/constants/copy';

export default function PortfolioScreen() {
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
        <Text variant="h3">{copy.portfolio.title}</Text>
      </View>

      {isLoading ? (
        <LoadingView />
      ) : isError ? (
        <ErrorView
          message={resolveErrorMessage(error, copy.portfolio.fetchError)}
          onRetry={refetch}
        />
      ) : (
        <FlatList
          data={holdings}
          keyExtractor={(item) => item.instrument_id.toString()}
          renderItem={({ item }) => <PortfolioListItem asset={item} onPress={handleAssetPress} />}
          ListHeaderComponent={<PortfolioSummaryHeader assets={holdings} cash={cash} />}
          ListEmptyComponent={
            <EmptyView message={copy.portfolio.noAssets} style={styles.emptyContainer} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing['4'],
    paddingVertical: spacing['4'],
    backgroundColor: colors.surface,
  },
  emptyList: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    minHeight: 300,
  },
});
