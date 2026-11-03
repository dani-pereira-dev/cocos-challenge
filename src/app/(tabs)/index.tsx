import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyView } from '@/components/EmptyView';
import { ErrorView } from '@/components/ErrorView';
import { LoadingView } from '@/components/LoadingView';
import { Instrument } from '@/domain/entities/instrument';
import { MarketSearchBar } from '@/features/market/components/MarketSearchBar';
import { InstrumentListItem } from '@/features/market/components/InstrumentListItem';
import { useDebounce } from '@/hooks/useDebounce';
import { useInstrumentsQuery } from '@/hooks/useInstrumentsQuery';
import { useSearchQuery } from '@/hooks/useSearchQuery';
import { resolveErrorMessage } from '@/domain/interfaces/api-error';
import { useOrderModalStore } from '@/store';
import { Text } from '@ui-kit/components/Text';
import { colors } from '@ui-kit/foundations/colors';
import { spacing } from '@ui-kit/foundations/spacing';
import { copy } from '@/constants/copy';

export default function MarketScreen() {
  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useDebounce(searchText, 400);
  const openOrder = useOrderModalStore((s) => s.openOrder);

  const isSearching = debouncedSearch.trim().length > 0;

  const instrumentsQuery = useInstrumentsQuery();
  const searchQuery = useSearchQuery(debouncedSearch);

  // La query activa depende de si hay texto en el buscador
  const activeQuery = isSearching ? searchQuery : instrumentsQuery;
  const { data, isLoading, isError, error, refetch } = activeQuery;

  function handleClear() {
    setSearchText('');
  }

  function handleInstrumentPress(instrument: Instrument) {
    openOrder(instrument);
  }

  const listData = (data as Instrument[] | undefined) ?? [];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text variant="h3">{copy.market.title}</Text>
      </View>

      <MarketSearchBar
        value={searchText}
        onChangeText={setSearchText}
        onClear={handleClear}
      />

      {isLoading ? (
        <LoadingView message={copy.market.loading} />
      ) : isError ? (
        <ErrorView
          message={resolveErrorMessage(error, copy.market.fetchError)}
          onRetry={refetch}
        />
      ) : (
        <FlatList
          data={listData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <InstrumentListItem
              instrument={item}
              onPress={handleInstrumentPress}
            />
          )}
          ListEmptyComponent={
            <EmptyView
              message={
                isSearching
                  ? copy.market.noSearchResults(debouncedSearch)
                  : copy.market.noInstruments
              }
              style={styles.emptyContainer}
            />
          }
          // Mejora el rendimiento en listas largas
          removeClippedSubviews
          maxToRenderPerBatch={20}
          windowSize={10}
          contentContainerStyle={listData.length === 0 ? styles.emptyList : undefined}
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
