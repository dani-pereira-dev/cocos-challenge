import { Modal, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { Text } from '@ui-kit';
import { styles } from './WalletOptionsSheet.styles';

interface WalletOptionsSheetProps {
  visible: boolean;
  walletId: string;
  hasAssets: boolean;
  onClose: () => void;
  onDeletePress: () => void;
}

export function WalletOptionsSheet({
  visible,
  walletId,
  hasAssets,
  onClose,
  onDeletePress,
}: WalletOptionsSheetProps) {
  const { t } = useTranslation();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose} />
      <SafeAreaView style={styles.sheet} edges={['bottom']}>
        <View style={styles.handle} />

        {hasAssets && (
          <Pressable
            style={styles.option}
            onPress={() => {
              onClose();
              router.push(`/wallets/${walletId}/remove-assets`);
            }}
          >
            <Text variant="bodySemibold" color="secondary" align="center">
              {t('wallets.removeAssets')}
            </Text>
          </Pressable>
        )}

        <Pressable
          style={styles.option}
          onPress={() => {
            onClose();
            router.push(`/wallets/${walletId}/rename`);
          }}
        >
          <Text variant="bodySemibold" color="brand" align="center">
            {t('wallets.rename')}
          </Text>
        </Pressable>

        <View style={styles.divider} />

        <Pressable style={styles.option} onPress={onDeletePress}>
          <Text variant="bodySemibold" color="error" align="center">
            {t('wallets.deleteWallet')}
          </Text>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
}
