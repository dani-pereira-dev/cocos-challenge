import { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { router, useLocalSearchParams } from 'expo-router';
import { Button, Text, TextInput } from '@ui-kit';

import { WalletNavBar } from '@/features/wallets/components/WalletNavBar';
import { useWalletsStore } from '@/features/wallets/store/walletsStore';
import { styles } from '@/features/wallets/styles/wallet-rename.styles';

export default function RenameWalletScreen() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();

  const wallet = useWalletsStore((state) => state.wallets.find((w) => w.id === id));
  const renameWallet = useWalletsStore((state) => state.renameWallet);

  const [name, setName] = useState(wallet?.name ?? '');

  function handleSave() {
    const trimmed = name.trim();
    if (!trimmed) return;
    renameWallet(id, trimmed);
    router.back();
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <WalletNavBar title={t('wallets.renameTitle')} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <Text variant="label" color="secondary">
            {t('wallets.nameLabel')}
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={t('wallets.namePlaceholder')}
            returnKeyType="done"
            onSubmitEditing={handleSave}
            autoFocus
          />
        </View>

        <View style={styles.footer}>
          <Button
            label={t('wallets.saveButton')}
            onPress={handleSave}
            disabled={!name.trim() || name.trim() === wallet?.name}
            size="md"
            fullWidth
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
