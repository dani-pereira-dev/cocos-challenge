import { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { Button, Icon, Text, TextInput, colors } from '@ui-kit';

import { WalletNavBar } from '@/features/wallets/components/WalletNavBar';
import { useWalletsStore } from '@/features/wallets/store/wallets.store';
import { styles } from '@/features/wallets/styles/wallet-new.styles';

export default function NewWalletScreen() {
  const { t } = useTranslation();
  const createWallet = useWalletsStore((state) => state.createWallet);
  const [name, setName] = useState('');

  function handleCreate() {
    const trimmed = name.trim();
    if (!trimmed) return;
    const wallet = createWallet(trimmed);
    router.replace(`/wallets/${wallet.id}/add-asset`);
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <WalletNavBar title={t('wallets.newTitle')} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <View style={styles.iconWrapper}>
            <Icon name="briefcase-outline" size={64} color={colors.primary} />
          </View>

          <Text variant="h3" align="center">
            {t('wallets.newTitle')}
          </Text>

          <View style={styles.fieldWrapper}>
            <Text variant="label" color="secondary" style={styles.label}>
              {t('wallets.nameLabel')}
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder={t('wallets.namePlaceholder')}
              returnKeyType="done"
              onSubmitEditing={handleCreate}
              autoFocus
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            label={t('wallets.createButton')}
            onPress={handleCreate}
            disabled={!name.trim()}
            size="md"
            fullWidth
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
