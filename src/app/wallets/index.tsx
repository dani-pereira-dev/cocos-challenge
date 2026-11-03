import { FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { Icon, Text, colors } from '@ui-kit';

import { EmptyView } from '@/components/EmptyView';

import { CustomWallet } from '@/domain/entities/wallet';
import { WalletNavBar } from '@/features/wallets/components/WalletNavBar';
import { WalletListItem } from '@/features/wallets/components/WalletListItem';
import { useWalletsStore } from '@/features/wallets/store/walletsStore';
import { styles } from '@/features/wallets/styles/wallets-list.styles';

export default function WalletsScreen() {
  const { t } = useTranslation();
  const wallets = useWalletsStore((state) => state.wallets);

  function handleWalletPress(wallet: CustomWallet) {
    router.push(`/wallets/${wallet.id}`);
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <WalletNavBar title={t('wallets.title')} />

      <FlatList
        data={wallets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <WalletListItem wallet={item} onPress={handleWalletPress} />}
        ListHeaderComponent={
          <Pressable
            style={({ pressed }) => [styles.createRow, pressed && styles.createRowPressed]}
            onPress={() => router.push('/wallets/new')}
          >
            <Icon name="add-circle-outline" size={22} color={colors.primary} />
            <Text variant="bodySemibold" color="brand">
              {t('wallets.createNew')}
            </Text>
          </Pressable>
        }
        ListEmptyComponent={
          <EmptyView
            message={t('wallets.emptyListTitle')}
            icon="briefcase-outline"
            style={styles.emptyContainer}
          />
        }
        contentContainerStyle={wallets.length === 0 ? styles.emptyList : undefined}
      />
    </SafeAreaView>
  );
}
