import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '@ui-kit/components/Button';
import { Text } from '@ui-kit/components/Text';
import { TextInput } from '@ui-kit/components/TextInput';
import { colors } from '@ui-kit/foundations/colors';
import {
  isBuyOrder,
  isLimitOrder,
  isMarketOrder,
  OrderableInstrument,
  OrderSide,
  OrderType,
} from '@/domain/entities/order';
import { QuantityMode } from '@/features/order/utils/order-form';
import { SubSheetType } from '@/features/order/hooks/useOrderForm';
import { formatAmount } from '@/utils/formatters';
import { InstrumentCard } from '../shared/InstrumentCard/InstrumentCard';
import { OrderNavBar } from '../shared/OrderNavBar/OrderNavBar';
import { FieldRow } from './FieldRow/FieldRow';
import { SubSheet } from './SubSheet/SubSheet';
import { styles } from './FormStep.styles';

interface FormStepProps {
  instrument: OrderableInstrument;
  side: OrderSide;
  orderType: OrderType;
  quantityMode: QuantityMode;
  amountInput: string;
  limitPriceInput: string;
  validationError: string | null;
  submitBlockReason: string | null;
  estimatedValid: boolean;
  isSubmitDisabled: boolean;
  showUseAll: boolean;
  cash: number | undefined;
  derivedTotal: number;
  subSheet: SubSheetType;
  onBack: () => void;
  onClose: () => void;
  onAmountChange: (v: string) => void;
  onLimitPriceChange: (v: string) => void;
  onUseAll: () => void;
  onOpenModeSheet: () => void;
  onOpenPriceSheet: () => void;
  onSubmit: () => void;
  onCloseSubSheet: () => void;
  onSelectQuantityMode: (mode: QuantityMode) => void;
  onSelectOrderType: (type: OrderType) => void;
}

export function FormStep({
  instrument,
  side,
  orderType,
  quantityMode,
  amountInput,
  limitPriceInput,
  validationError,
  submitBlockReason,
  estimatedValid,
  isSubmitDisabled,
  showUseAll,
  cash,
  derivedTotal,
  subSheet,
  onBack,
  onClose,
  onAmountChange,
  onLimitPriceChange,
  onUseAll,
  onOpenModeSheet,
  onOpenPriceSheet,
  onSubmit,
  onCloseSubSheet,
  onSelectQuantityMode,
  onSelectOrderType,
}: FormStepProps) {
  const { t } = useTranslation();
  const isBuy = isBuyOrder(side);
  const accentColor = isBuy ? colors.success : colors.error;
  const sideLabel = isBuy ? t('order.buy') : t('order.sell');

  const modeLabelText = quantityMode === 'amount' ? t('order.byAmount') : t('order.byShares');
  const priceLabelText = isMarketOrder(orderType) ? t('order.typeMarket') : t('order.typeLimit');
  const modeRowLabel = isBuy
    ? t('order.modeLabel', { mode: modeLabelText })
    : t('order.modeLabelSell', { mode: modeLabelText });
  const estimatedText = isBuy
    ? t('order.estimatedLabel', { amount: formatAmount(derivedTotal) })
    : t('order.estimatedLabelSell', { amount: formatAmount(derivedTotal) });

  return (
    <View style={styles.screen}>
      <OrderNavBar title={sideLabel} accentColor={accentColor} onBack={onBack} onClose={onClose} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <InstrumentCard
            ticker={instrument.ticker}
            name={instrument.name}
            lastPrice={instrument.last_price}
          />

          <View style={styles.formCard}>
            <FieldRow label={modeRowLabel} onModify={onOpenModeSheet} />

            <View style={styles.divider} />

            <View style={styles.availableRow}>
              <Text variant="caption" color="secondary">
                {isBuy
                  ? t('order.availableLabel', { amount: formatAmount(cash ?? 0) })
                  : t('portfolio.shares', { count: instrument.quantity ?? 0 })}
              </Text>
              {showUseAll ? (
                <Pressable onPress={onUseAll} hitSlop={8}>
                  <Text variant="label" color="brand">
                    {t('order.useAll')}
                  </Text>
                </Pressable>
              ) : null}
            </View>

            <View style={styles.amountRow}>
              {quantityMode === 'amount' ? (
                <Text variant="bodySemibold" style={styles.currencyPrefix}>
                  {t('common.currencyPrefix')}
                </Text>
              ) : null}
              <TextInput
                value={amountInput}
                onChangeText={onAmountChange}
                keyboardType="numeric"
                placeholder={t('order.amountPlaceholder')}
                containerStyle={styles.amountInputContainer}
                inputContainerStyle={styles.amountInputInner}
                inputStyle={styles.amountInputText}
              />
            </View>

            <View style={styles.divider} />

            <FieldRow
              label={t('order.priceLabel', { type: priceLabelText })}
              onModify={onOpenPriceSheet}
            />

            {isLimitOrder(orderType) ? (
              <View style={styles.limitPriceRow}>
                <TextInput
                  value={limitPriceInput}
                  onChangeText={onLimitPriceChange}
                  keyboardType="numeric"
                  prefix={t('common.currencyPrefix')}
                  placeholder={t('order.limitPricePlaceholder')}
                />
              </View>
            ) : (
              <View style={styles.marketPriceDisplay}>
                <Text variant="body" color="secondary">
                  {t('common.currencyPrefix')} {formatAmount(instrument.last_price)}
                </Text>
              </View>
            )}
          </View>

          {validationError ? (
            <Text variant="caption" color="error" style={styles.errorText}>
              {validationError}
            </Text>
          ) : null}
        </ScrollView>

        <View style={styles.footer}>
          {submitBlockReason ? (
            <Text variant="caption" color="error" style={styles.footerHint}>
              {submitBlockReason}
            </Text>
          ) : estimatedValid ? (
            <Text variant="caption" color="secondary" style={styles.footerHint}>
              {estimatedText}
            </Text>
          ) : null}
          <Button
            label={t('order.submitButton')}
            onPress={onSubmit}
            disabled={isSubmitDisabled}
            size="md"
            fullWidth
          />
        </View>
      </KeyboardAvoidingView>

      <SubSheet
        subSheet={subSheet}
        quantityMode={quantityMode}
        orderType={orderType}
        onClose={onCloseSubSheet}
        onSelectQuantityMode={onSelectQuantityMode}
        onSelectOrderType={onSelectOrderType}
      />
    </View>
  );
}
