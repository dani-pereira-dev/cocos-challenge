import { useState } from 'react';
import { Alert, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { router, useLocalSearchParams } from 'expo-router';
import { Icon, colors } from '@ui-kit';
import { WalletDetailSkeleton } from '@/features/wallets/components/WalletDetailSkeleton';

import { WalletNavBar } from '@/features/wallets/components/WalletNavBar';
import { WalletEmptyContent } from '@/features/wallets/components/WalletEmptyContent';
import { WalletAssetList } from '@/features/wallets/components/WalletAssetList';
import { WalletOptionsSheet } from '@/features/wallets/components/WalletOptionsSheet';
import { useWalletDetail } from '@/features/wallets/hooks/useWalletDetail';
import { useWalletsStore } from '@/features/wallets/store/wallets.store';
import { styles } from '@/features/wallets/styles/wallet-detail.styles';

export default function WalletDetailScreen() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [optionsVisible, setOptionsVisible] = useState(false);

  const deleteWallet = useWalletsStore((state) => state.deleteWallet);
  const removeAllocations = useWalletsStore((state) => state.removeAllocations);
  const { wallet, enrichedAllocations, totalValue, isLoading } = useWalletDetail(id);

  if (!wallet) return null;

  const isEmpty = enrichedAllocations.length === 0;

  function handleDelete() {
    setOptionsVisible(false);
    Alert.alert(
      t('wallets.deleteWalletConfirm', { name: wallet!.name }),
      t('wallets.deleteWalletBody'),
      [
        { text: t('wallets.cancel'), style: 'cancel' },
        {
          text: t('wallets.confirmDelete'),
          style: 'destructive',
          onPress: () => {
            deleteWallet(id);
            router.replace('/wallets');
          },
        },
      ],
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <WalletNavBar
        title={wallet.name}
        rightElement={
          <Pressable onPress={() => setOptionsVisible(true)} hitSlop={12}>
            <Icon name="ellipsis-vertical" size={22} color={colors.textSecondary} />
          </Pressable>
        }
      />

      {isLoading ? (
        <WalletDetailSkeleton />
      ) : isEmpty ? (
        <WalletEmptyContent walletId={id} />
      ) : (
        <WalletAssetList
          allocations={enrichedAllocations}
          totalValue={totalValue}
          walletId={id}
          onDeleteAllocation={(ticker) => removeAllocations(id, [ticker])}
        />
      )}

      <WalletOptionsSheet
        visible={optionsVisible}
        walletId={id}
        hasAssets={!isEmpty}
        onClose={() => setOptionsVisible(false)}
        onDeletePress={handleDelete}
      />
    </SafeAreaView>
  );
}
