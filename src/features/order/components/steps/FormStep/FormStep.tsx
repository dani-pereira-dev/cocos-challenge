import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
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
import { copy } from '@/constants/copy';
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
  const isBuy = isBuyOrder(side);
  const accentColor = isBuy ? colors.success : colors.error;
  const sideLabel = isBuy ? copy.order.buy : copy.order.sell;

  const modeLabelText = quantityMode === 'amount' ? copy.order.byAmount : copy.order.byShares;
  const priceLabelText = isMarketOrder(orderType) ? copy.order.typeMarket : copy.order.typeLimit;
  const modeRowLabel = isBuy
    ? copy.order.modeLabel(modeLabelText)
    : copy.order.modeLabelSell(modeLabelText);
  const estimatedText = isBuy
    ? copy.order.estimatedLabel(formatAmount(derivedTotal))
    : copy.order.estimatedLabelSell(formatAmount(derivedTotal));

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
                  ? copy.order.availableLabel(formatAmount(cash ?? 0))
                  : copy.portfolio.shares(instrument.quantity ?? 0)}
              </Text>
              {showUseAll ? (
                <Pressable onPress={onUseAll} hitSlop={8}>
                  <Text variant="label" color="brand">
                    {copy.order.useAll}
                  </Text>
                </Pressable>
              ) : null}
            </View>

            <View style={styles.amountRow}>
              {quantityMode === 'amount' ? (
                <Text variant="bodySemibold" style={styles.currencyPrefix}>
                  {copy.common.currencyPrefix}
                </Text>
              ) : null}
              <TextInput
                value={amountInput}
                onChangeText={onAmountChange}
                keyboardType="numeric"
                placeholder={copy.order.amountPlaceholder}
                containerStyle={styles.amountInputContainer}
                inputContainerStyle={styles.amountInputInner}
                inputStyle={styles.amountInputText}
              />
            </View>

            <View style={styles.divider} />

            <FieldRow label={copy.order.priceLabel(priceLabelText)} onModify={onOpenPriceSheet} />

            {isLimitOrder(orderType) ? (
              <View style={styles.limitPriceRow}>
                <TextInput
                  value={limitPriceInput}
                  onChangeText={onLimitPriceChange}
                  keyboardType="numeric"
                  prefix={copy.common.currencyPrefix}
                  placeholder={copy.order.limitPricePlaceholder}
                />
              </View>
            ) : (
              <View style={styles.marketPriceDisplay}>
                <Text variant="body" color="secondary">
                  {copy.common.currencyPrefix} {formatAmount(instrument.last_price)}
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
            label={copy.order.submitButton}
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
