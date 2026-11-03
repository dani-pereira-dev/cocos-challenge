import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams } from 'expo-router';
import { Button, Text } from '@ui-kit';

import { WalletNavBar } from '@/features/wallets/components/WalletNavBar';
import { QuantityAssetHeader } from '@/features/wallets/components/QuantityAssetHeader';
import { QuantityInputCard } from '@/features/wallets/components/QuantityInputCard';
import { useQuantityInput } from '@/features/wallets/hooks/useQuantityInput';
import { formatAmount } from '@/utils/formatters';
import { styles } from '@/features/wallets/styles/wallet-ticker.styles';

export default function QuantityInputScreen() {
  const { t } = useTranslation();
  const { id, ticker } = useLocalSearchParams<{ id: string; ticker: string }>();

  const {
    holding,
    quantityInput,
    setQuantityInput,
    exceedsHolding,
    isValidQuantity,
    estimatedValue,
    handleUseAll,
    handleConfirm,
  } = useQuantityInput(id, ticker);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <WalletNavBar title={ticker} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <QuantityAssetHeader ticker={ticker} />

          <QuantityInputCard
            holding={holding}
            quantityInput={quantityInput}
            exceedsHolding={exceedsHolding}
            onChangeText={setQuantityInput}
            onUseAll={handleUseAll}
            onSubmit={handleConfirm}
          />

          {estimatedValue !== null ? (
            <Text variant="caption" color="secondary" align="center">
              {t('wallets.estimatedToAdd', { amount: formatAmount(estimatedValue) })}
            </Text>
          ) : null}
        </View>

        <View style={styles.footer}>
          <Button
            label={t('wallets.addAssetButton')}
            onPress={handleConfirm}
            disabled={!isValidQuantity}
            size="md"
            fullWidth
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
