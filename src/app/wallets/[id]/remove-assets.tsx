import { useState } from 'react';
import { Alert, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from '@ui-kit';
import { WalletRemoveAssetsSkeleton } from '@/features/wallets/components/WalletRemoveAssetsSkeleton';
import { WalletNavBar } from '@/features/wallets/components/WalletNavBar';
import { SelectableAssetItem } from '@/features/wallets/components/SelectableAssetItem';
import { useWalletDetail } from '@/features/wallets/hooks/useWalletDetail';
import { useWalletsStore } from '@/features/wallets/store/wallets.store';
import { styles } from '@/features/wallets/styles/wallet-remove-assets.styles';

export default function RemoveAssetsScreen() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const removeAllocations = useWalletsStore((state) => state.removeAllocations);

  const { enrichedAllocations, isLoading } = useWalletDetail(id);

  function handleToggle(ticker: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(ticker)) {
        next.delete(ticker);
      } else {
        next.add(ticker);
      }
      return next;
    });
  }

  function handleRemove() {
    Alert.alert(
      t('wallets.removeConfirmTitle'),
      t('wallets.removeConfirmBody', { count: selected.size }),
      [
        { text: t('wallets.cancel'), style: 'cancel' },
        {
          text: t('wallets.confirmDelete'),
          style: 'destructive',
          onPress: () => {
            router.back();
            removeAllocations(id, Array.from(selected));
          },
        },
      ],
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <WalletNavBar title={t('wallets.removeAssetsTitle')} />

      {isLoading ? (
        <WalletRemoveAssetsSkeleton />
      ) : (
        <>
          <FlatList
            data={enrichedAllocations}
            keyExtractor={(item) => item.ticker}
            renderItem={({ item }) => (
              <SelectableAssetItem
                allocation={item}
                selected={selected.has(item.ticker)}
                onToggle={handleToggle}
              />
            )}

            style={styles.list}
          />

          <View style={styles.footer}>
            <Button
              label={t('wallets.removeAssetsButton')}
              onPress={handleRemove}
              disabled={selected.size === 0}
              size="md"
              fullWidth
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
