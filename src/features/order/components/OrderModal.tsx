import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@ui-kit/components/Button';
import { Text } from '@ui-kit/components/Text';
import { TextInput } from '@ui-kit/components/TextInput';
import { colors } from '@ui-kit/foundations/colors';
import { borderRadius, spacing } from '@ui-kit/foundations/spacing';
import { fontSize, fontWeight } from '@ui-kit/foundations/typography';
import { OrderRequest, OrderResponse, OrderSide, OrderType } from '@/domain/entities/order';
import { isUserError, resolveErrorMessage } from '@/domain/interfaces/api-error';
import { calculateSharesFromAmount } from '@/domain/use-cases/calculations';
import { computeUseAllValue, isUseAllAvailable, QuantityMode } from '../utils/order-form';
import { usePortfolioQuery } from '@/hooks/usePortfolioQuery';
import { useSubmitOrderMutation } from '@/hooks/useSubmitOrderMutation';
import { useOrderModalStore } from '@/store';
import { formatAmount, formatCurrency, formatDate } from '@/utils/formatters';
import { copy } from '@/constants/copy';
import { TickerAvatar } from '@/features/market/components/TickerAvatar';
import { OrderResult } from './OrderResult';

type Step = 'select' | 'form' | 'confirm' | 'result';
// QuantityMode se importa de utils/order-form

// Tasas estimadas del mercado argentino (BYMA) — solo para mostrar en el presupuesto
const COMISION_RATE = 0.006;
const IMPUESTOS_RATE = 0.0012;
type SubSheet = 'mode' | 'price' | null;

// ------------------------------------------------------------------
// Componente interno: fila de opción de radio en sub-sheet
// ------------------------------------------------------------------
interface RadioRowProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

function RadioRow({ label, selected, onPress }: RadioRowProps) {
  return (
    <Pressable style={styles.radioRow} onPress={onPress}>
      <Text
        variant={selected ? 'bodySemibold' : 'body'}
        color={selected ? 'brand' : 'primary'}
        style={styles.radioLabel}
      >
        {label}
      </Text>
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected ? <View style={styles.radioInner} /> : null}
      </View>
    </Pressable>
  );
}

// ------------------------------------------------------------------
// Componente interno: fila de campo con valor y link "Modificar"
// ------------------------------------------------------------------
interface FieldRowProps {
  label: string;
  onModify: () => void;
}

function FieldRow({ label, onModify }: FieldRowProps) {
  return (
    <View style={styles.fieldRow}>
      <Text variant="body" color="primary" style={styles.fieldRowLabel}>
        {label}
      </Text>
      <Pressable onPress={onModify} hitSlop={8}>
        <Text variant="label" color="brand">
          {copy.order.modify}
        </Text>
      </Pressable>
    </View>
  );
}

// ------------------------------------------------------------------
// Modal principal
// ------------------------------------------------------------------
export function OrderModal() {
  const { visible, instrument, closeOrder } = useOrderModalStore();
  const { mutateAsync, isPending } = useSubmitOrderMutation();
  const { cash } = usePortfolioQuery();

  const [step, setStep] = useState<Step>('select');
  const [side, setSide] = useState<OrderSide>('BUY');
  const [orderType, setOrderType] = useState<OrderType>('MARKET');
  const [quantityMode, setQuantityMode] = useState<QuantityMode>('amount');
  const [amountInput, setAmountInput] = useState('');
  const [limitPriceInput, setLimitPriceInput] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [systemError, setSystemError] = useState<string | null>(null);
  const [result, setResult] = useState<OrderResponse | null>(null);
  const [subSheet, setSubSheet] = useState<SubSheet>(null);

  // Resetea todo cuando el modal termina de abrirse (onShow es un event handler, no un efecto)
  function handleModalShow() {
    setStep('select');
    setSide('BUY');
    setOrderType('MARKET');
    setQuantityMode('amount');
    setAmountInput('');
    setLimitPriceInput('');
    setValidationError(null);
    setSystemError(null);
    setResult(null);
    setSubSheet(null);
  }

  if (!instrument) return null;

  // ----------------------------------------------------------------
  // Cálculos derivados
  // ----------------------------------------------------------------
  const parsedAmount = parseFloat(amountInput.replace(/\./g, '').replace(',', '.')) || 0;

  const derivedShares =
    quantityMode === 'amount'
      ? calculateSharesFromAmount(parsedAmount, instrument.last_price)
      : parseInt(amountInput, 10) || 0;

  const derivedTotal =
    quantityMode === 'amount' ? parsedAmount : derivedShares * instrument.last_price;

  const estimatedValid = derivedShares > 0 && Number.isFinite(derivedShares);

  const modeLabelText =
    quantityMode === 'amount' ? copy.order.byAmount : copy.order.byShares;

  const priceLabelText =
    orderType === 'MARKET' ? copy.order.typeMarket : copy.order.typeLimit;

  const showUseAll = isUseAllAvailable({ side, cash, ownedShares: instrument?.quantity });

  const exceedsCash =
    side === 'BUY' && cash != null && estimatedValid && derivedTotal > cash;
  const exceedsShares =
    side === 'SELL' &&
    instrument?.quantity != null &&
    estimatedValid &&
    derivedShares > instrument.quantity;

  const submitBlockReason = exceedsCash
    ? copy.order.exceedsCash
    : exceedsShares
      ? copy.order.exceedsShares
      : null;

  const isSubmitDisabled =
    isPending ||
    !estimatedValid ||
    (orderType === 'LIMIT' && limitPriceInput.trim() === '') ||
    exceedsCash ||
    exceedsShares;

  // ----------------------------------------------------------------
  // Handlers
  // ----------------------------------------------------------------
  function handleSelectSide(selected: OrderSide) {
    setSide(selected);
    setStep('form');
  }

  function handleBack() {
    if (subSheet) {
      setSubSheet(null);
    } else {
      setStep('select');
    }
  }

  function handleUseAll() {
    const value = computeUseAllValue({
      side,
      quantityMode,
      cash,
      ownedShares: instrument!.quantity,
      lastPrice: instrument!.last_price,
    });
    if (value !== null) setAmountInput(value);
  }

  async function handleSubmit() {
    setValidationError(null);

    if (!estimatedValid) {
      setValidationError(copy.order.invalidQuantity);
      return;
    }

    let limitPrice: number | undefined;
    if (orderType === 'LIMIT') {
      limitPrice = parseFloat(limitPriceInput.replace(',', '.'));
      if (!limitPrice || limitPrice <= 0 || !Number.isFinite(limitPrice)) {
        setValidationError(copy.order.invalidPrice);
        return;
      }
    }

    const request: OrderRequest = {
      instrument_id: instrument!.id,
      side,
      type: orderType,
      quantity: derivedShares,
      price: limitPrice,
    };

    try {
      const response = await mutateAsync(request);
      setResult(response);
      setStep('result');
    } catch (err) {
      const message = resolveErrorMessage(err, copy.order.fetchError);
      if (isUserError(err)) {
        // Error de negocio (4xx): el usuario puede corregirlo, mostrar en el formulario
        setValidationError(message);
        setStep('form');
      } else {
        // Error de sistema (red, 5xx, parseo): mostrar en banner separado
        setSystemError(message);
      }
    }
  }

  // ----------------------------------------------------------------
  // Renderizado del paso "seleccionar acción"
  // ----------------------------------------------------------------
  function renderSelectStep() {
    const canSell = instrument != null && instrument.quantity != null && instrument.quantity > 0;

    return (
      <View style={styles.selectSheet}>
        <View style={styles.handle} />

        <Pressable
          style={[styles.actionButton, styles.buyButton]}
          onPress={() => handleSelectSide('BUY')}
        >
          <Text variant="bodySemibold" style={styles.buyButtonText}>
            {copy.order.buy}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.actionButton, styles.sellButton, !canSell && styles.actionButtonDisabled]}
          onPress={canSell ? () => handleSelectSide('SELL') : undefined}
          disabled={!canSell}
        >
          <Text variant="bodySemibold" style={styles.sellButtonText}>
            {copy.order.sell}
          </Text>
          {!canSell ? (
            <Text variant="caption" style={styles.noPositionHint}>
              {copy.order.noPositionHint}
            </Text>
          ) : null}
        </Pressable>

        <Pressable style={[styles.actionButton, styles.cancelButton]} onPress={closeOrder}>
          <Text variant="bodySemibold" color="secondary">
            {copy.order.cancelButton}
          </Text>
        </Pressable>
      </View>
    );
  }

  // ----------------------------------------------------------------
  // Renderizado del sub-sheet de selección
  // ----------------------------------------------------------------
  function renderSubSheet() {
    if (!subSheet) return null;

    return (
      <>
        <Pressable style={styles.subBackdrop} onPress={() => setSubSheet(null)} />
        <View style={styles.subSheet}>
          <View style={styles.handle} />

          {subSheet === 'mode' ? (
            <>
              <RadioRow
                label={copy.order.byAmount}
                selected={quantityMode === 'amount'}
                onPress={() => {
                  setQuantityMode('amount');
                  setAmountInput('');
                  setSubSheet(null);
                }}
              />
              <RadioRow
                label={copy.order.byShares}
                selected={quantityMode === 'shares'}
                onPress={() => {
                  setQuantityMode('shares');
                  setAmountInput('');
                  setSubSheet(null);
                }}
              />
            </>
          ) : (
            <>
              <RadioRow
                label={copy.order.typeMarket}
                selected={orderType === 'MARKET'}
                onPress={() => {
                  setOrderType('MARKET');
                  setSubSheet(null);
                }}
              />
              <RadioRow
                label={copy.order.typeLimit}
                selected={orderType === 'LIMIT'}
                onPress={() => {
                  setOrderType('LIMIT');
                  setSubSheet(null);
                }}
              />
            </>
          )}
        </View>
      </>
    );
  }

  // ----------------------------------------------------------------
  // Renderizado del formulario
  // ----------------------------------------------------------------
  function renderFormStep() {
    const isBuy = side === 'BUY';
    const accentColor = isBuy ? colors.success : colors.error;
    const sideLabel = isBuy ? copy.order.buy : copy.order.sell;

    const modeRowLabel = isBuy
      ? copy.order.modeLabel(modeLabelText)
      : copy.order.modeLabelSell(modeLabelText);

    const estimatedText = isBuy
      ? copy.order.estimatedLabel(formatAmount(derivedTotal))
      : copy.order.estimatedLabelSell(formatAmount(derivedTotal));

    const inputPlaceholder =
      quantityMode === 'amount' ? copy.order.amountPlaceholder : copy.order.amountPlaceholder;

    return (
      <View style={styles.formScreen}>
        {/* Encabezado de navegación */}
        <View style={styles.navBar}>
          <Pressable onPress={handleBack} hitSlop={12} style={styles.navButton}>
            <Ionicons name="arrow-back" size={22} color={accentColor} />
          </Pressable>

          <Text variant="bodySemibold" style={[styles.navTitle, { color: accentColor }]}>
            {sideLabel}
          </Text>

          <Pressable onPress={closeOrder} hitSlop={12} style={styles.navButton}>
            <Ionicons name="close" size={22} color={accentColor} />
          </Pressable>
        </View>

        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={0}
        >
          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.formContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Tarjeta del instrumento */}
            <View style={styles.instrumentCard}>
              <TickerAvatar ticker={instrument!.ticker} size={40} />
              <View style={styles.instrumentInfo}>
                <Text variant="bodySemibold">{instrument!.ticker}</Text>
                <Text variant="caption" color="secondary" numberOfLines={1}>
                  {instrument!.name}
                </Text>
              </View>
              <View style={styles.priceBox}>
                <Text variant="caption" color="secondary">{copy.common.currencyPrefix}</Text>
                <Text variant="bodySemibold">{formatAmount(instrument!.last_price)}</Text>
              </View>
            </View>

            {/* Tarjeta del formulario */}
            <View style={styles.formCard}>
              {/* Fila modo (Por monto / Cantidad de títulos) */}
              <FieldRow label={modeRowLabel} onModify={() => setSubSheet('mode')} />

              <View style={styles.divider} />

              {/* Disponible + Usar todo */}
              <View style={styles.availableRow}>
                <Text variant="caption" color="secondary">
                  {side === 'BUY'
                    ? copy.order.availableLabel(formatAmount(cash ?? 0))
                    : copy.portfolio.shares(instrument!.quantity ?? 0)}
                </Text>
                {showUseAll ? (
                  <Pressable onPress={handleUseAll} hitSlop={8}>
                    <Text variant="label" color="brand">
                      {copy.order.useAll}
                    </Text>
                  </Pressable>
                ) : null}
              </View>

              {/* Input de monto / cantidad */}
              <View style={styles.amountRow}>
                {quantityMode === 'amount' ? (
                  <Text variant="bodySemibold" style={styles.currencyPrefix}>
                    {copy.common.currencyPrefix}
                  </Text>
                ) : null}
                <TextInput
                  value={amountInput}
                  onChangeText={(v) => {
                    setAmountInput(v);
                    setValidationError(null);
                  }}
                  keyboardType="numeric"
                  placeholder={inputPlaceholder}
                  containerStyle={styles.amountInputContainer}
                  inputContainerStyle={styles.amountInputInner}
                  inputStyle={styles.amountInputText}
                />
              </View>

              <View style={styles.divider} />

              {/* Fila precio (Mercado / Límite) */}
              <FieldRow
                label={copy.order.priceLabel(priceLabelText)}
                onModify={() => setSubSheet('price')}
              />

              {/* Input precio límite */}
              {orderType === 'LIMIT' ? (
                <View style={styles.limitPriceRow}>
                  <TextInput
                    value={limitPriceInput}
                    onChangeText={(v) => {
                      setLimitPriceInput(v);
                      setValidationError(null);
                    }}
                    keyboardType="numeric"
                    prefix={copy.common.currencyPrefix}
                    placeholder={copy.order.limitPricePlaceholder}
                  />
                </View>
              ) : (
                <View style={styles.marketPriceDisplay}>
                  <Text variant="body" color="secondary">
                    {copy.common.currencyPrefix} {formatAmount(instrument!.last_price)}
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

          {/* Footer pegajoso */}
          <View style={styles.footer}>
            {submitBlockReason ? (
              <Text variant="caption" color="error" style={styles.estimatedText}>
                {submitBlockReason}
              </Text>
            ) : estimatedValid ? (
              <Text variant="caption" color="secondary" style={styles.estimatedText}>
                {estimatedText}
              </Text>
            ) : null}
            <Button
              label={copy.order.submitButton}
              onPress={() => setStep('confirm')}
              disabled={isSubmitDisabled}
              size="md"
              fullWidth
            />
          </View>
        </KeyboardAvoidingView>

        {/* Sub-sheet sobre el formulario */}
        {renderSubSheet()}
      </View>
    );
  }

  // ----------------------------------------------------------------
  // Renderizado del presupuesto (paso confirm)
  // ----------------------------------------------------------------
  function renderConfirmStep() {
    const isBuy = side === 'BUY';
    const title = isBuy ? copy.order.confirmTitleBuy : copy.order.confirmTitleSell;
    const accentColor = isBuy ? colors.success : colors.error;

    const orderPrice =
      orderType === 'LIMIT'
        ? parseFloat(limitPriceInput.replace(',', '.'))
        : instrument!.last_price;

    const subtotal = derivedShares * instrument!.last_price;
    const comision = subtotal * COMISION_RATE;
    const impuestos = subtotal * IMPUESTOS_RATE;
    const netTotal = isBuy ? subtotal + comision + impuestos : subtotal - comision - impuestos;

    const today = formatDate(new Date());

    const detailLabel = isBuy
      ? copy.order.buyDetailLabel(derivedShares)
      : copy.order.sellDetailLabel(derivedShares);

    const estimatedFooterLabel = isBuy
      ? copy.order.estimatedToPayLabel
      : copy.order.estimatedToReceiveLabel;

    return (
      <View style={styles.formScreen}>
        {/* Encabezado de navegación */}
        <View style={styles.navBar}>
          <Pressable onPress={() => { setSystemError(null); setStep('form'); }} hitSlop={12} style={styles.navButton}>
            <Ionicons name="arrow-back" size={22} color={accentColor} />
          </Pressable>
          <Text variant="bodySemibold" style={[styles.navTitle, { color: accentColor }]}>
            {title}
          </Text>
          <View style={styles.navButton} />
        </View>

        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.formContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Tarjeta del instrumento */}
          <View style={styles.instrumentCard}>
            <TickerAvatar ticker={instrument!.ticker} size={44} />
            <View style={styles.instrumentInfo}>
              <Text variant="bodySemibold">{instrument!.ticker}</Text>
              <Text variant="caption" color="secondary" numberOfLines={1}>
                {instrument!.name}
              </Text>
            </View>
          </View>

          {/* Detalle de la orden */}
          <View style={styles.confirmDetailCard}>
            <View style={styles.confirmDetailRow}>
              <View style={styles.confirmDetailLeft}>
                <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
                <Text variant="body" color="secondary">{copy.order.liquidacionLabel}</Text>
              </View>
              <Text variant="bodySemibold">{copy.order.liquidacionValue}</Text>
            </View>

            <View style={styles.confirmDivider} />

            <View style={styles.confirmDetailRow}>
              <View style={styles.confirmDetailLeft}>
                <Ionicons name="swap-horizontal-outline" size={16} color={colors.textSecondary} />
                <Text variant="body" color="secondary">
                  {orderType === 'MARKET' ? copy.order.priceMarketLabel : copy.order.priceLimitLabel}
                </Text>
              </View>
              <Text variant="bodySemibold">
                {'≈ '}{formatCurrency(orderPrice)}
              </Text>
            </View>

            <View style={styles.confirmDivider} />

            <View style={styles.confirmDetailRow}>
              <View style={styles.confirmDetailLeft}>
                <Ionicons name="calendar-outline" size={16} color={colors.textSecondary} />
                <Text variant="body" color="secondary">{copy.order.validezLabel}</Text>
              </View>
              <Text variant="bodySemibold">{copy.order.validezValue(today)}</Text>
            </View>
          </View>

          {/* Sección detalles */}
          <Text variant="h3" style={styles.sectionTitle}>{copy.order.detallesTitle}</Text>

          <View style={styles.confirmBreakdownCard}>
            <View style={styles.confirmBreakdownRow}>
              <Text variant="body" color="secondary" style={styles.confirmBreakdownLabel} numberOfLines={1} ellipsizeMode="tail">{detailLabel}</Text>
              <Text variant="bodySemibold" style={styles.confirmBreakdownValue} adjustsFontSizeToFit minimumFontScale={0.6} numberOfLines={1}>{formatCurrency(subtotal)}</Text>
            </View>
            <View style={styles.confirmBreakdownRow}>
              <Text variant="body" color="secondary" style={styles.confirmBreakdownLabel} numberOfLines={1} ellipsizeMode="tail">{copy.order.comisionesLabel}</Text>
              <Text variant="bodySemibold" style={[styles.confirmBreakdownValue, { color: colors.error }]} adjustsFontSizeToFit minimumFontScale={0.6} numberOfLines={1}>
                {`-${formatCurrency(comision)}`}
              </Text>
            </View>
            <View style={styles.confirmBreakdownRow}>
              <Text variant="body" color="secondary" style={styles.confirmBreakdownLabel} numberOfLines={1} ellipsizeMode="tail">{copy.order.impuestosLabel}</Text>
              <Text variant="bodySemibold" style={[styles.confirmBreakdownValue, { color: colors.error }]} adjustsFontSizeToFit minimumFontScale={0.6} numberOfLines={1}>
                {`-${formatCurrency(impuestos)}`}
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Footer pegajoso */}
        <View style={styles.confirmFooter}>
          {systemError ? (
            <View style={styles.systemErrorBanner}>
              <Ionicons name="alert-circle-outline" size={16} color={colors.warning} />
              <Text variant="caption" style={styles.systemErrorText}>
                {systemError}
              </Text>
            </View>
          ) : null}
          <View style={styles.confirmFooterTotal}>
            <Text variant="body" color="secondary" style={styles.confirmFooterLabel}>{estimatedFooterLabel}</Text>
            <Text variant="bodySemibold" style={[styles.confirmFooterAmount, { color: accentColor }]} adjustsFontSizeToFit minimumFontScale={0.5} numberOfLines={1}>
              {'≈ '}{formatCurrency(netTotal)}
            </Text>
          </View>
          <Button
            label={isPending ? copy.order.sendingButton : copy.order.confirmButton}
            onPress={handleSubmit}
            loading={isPending}
            disabled={isPending}
            size="md"
            fullWidth
          />
        </View>
      </View>
    );
  }

  // ----------------------------------------------------------------
  // Render
  // ----------------------------------------------------------------
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={closeOrder}
      onShow={handleModalShow}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={step === 'select' ? closeOrder : undefined} />

        {step === 'select' && renderSelectStep()}

        {step === 'form' && renderFormStep()}

        {step === 'confirm' && renderConfirmStep()}

        {step === 'result' && result && (
          <View style={styles.resultSheet}>
            <View style={styles.handle} />
            <OrderResult result={result} onClose={closeOrder} />
          </View>
        )}
      </View>
    </Modal>
  );
}

// ------------------------------------------------------------------
// Estilos
// ------------------------------------------------------------------
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  flex: {
    flex: 1,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: spacing['3'],
    marginBottom: spacing['2'],
  },

  // ----- Step: select -----
  selectSheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius['2xl'],
    borderTopRightRadius: borderRadius['2xl'],
    paddingHorizontal: spacing['4'],
    paddingBottom: spacing['8'],
    gap: spacing['3'],
  },
  actionButton: {
    height: 56,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButton: {
    backgroundColor: colors.successLight,
  },
  buyButtonText: {
    color: colors.success,
  },
  sellButton: {
    backgroundColor: colors.errorLight,
  },
  sellButtonText: {
    color: colors.error,
  },
  cancelButton: {
    backgroundColor: colors.surfaceSecondary,
  },
  actionButtonDisabled: {
    opacity: 0.45,
  },
  noPositionHint: {
    color: colors.error,
    fontSize: 11,
    marginTop: 2,
  },

  // ----- Step: form -----
  formScreen: {
    flex: 1,
    backgroundColor: colors.background,
    marginTop: 60, // deja espacio para la status bar / notch
    borderTopLeftRadius: borderRadius['2xl'],
    borderTopRightRadius: borderRadius['2xl'],
    overflow: 'hidden',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing['4'],
    paddingTop: spacing['3'],
    paddingBottom: spacing['3'],
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  navButton: {
    width: 36,
    alignItems: 'center',
  },
  navTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  formContent: {
    padding: spacing['4'],
    gap: spacing['3'],
    paddingBottom: spacing['6'],
  },

  // Tarjeta del instrumento
  instrumentCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing['4'],
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['3'],
  },
  instrumentInfo: {
    flex: 1,
    gap: 2,
  },
  priceBox: {
    alignItems: 'flex-end',
    gap: 2,
  },

  // Tarjeta del formulario
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing['4'],
    paddingVertical: spacing['3'],
  },
  fieldRowLabel: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing['4'],
  },
  availableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing['4'],
    paddingTop: spacing['3'],
    paddingBottom: spacing['1'],
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing['4'],
    paddingBottom: spacing['3'],
  },
  currencyPrefix: {
    fontSize: fontSize.xl,
    color: colors.textSecondary,
    marginRight: spacing['1'],
  },
  amountInputContainer: {
    flex: 1,
  },
  amountInputInner: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    minHeight: 48,
  },
  amountInputText: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    textAlign: 'right',
  },
  limitPriceRow: {
    paddingHorizontal: spacing['4'],
    paddingBottom: spacing['3'],
  },
  marketPriceDisplay: {
    paddingHorizontal: spacing['4'],
    paddingVertical: spacing['3'],
    backgroundColor: colors.surfaceSecondary,
    marginHorizontal: spacing['4'],
    marginBottom: spacing['3'],
    borderRadius: borderRadius.md,
  },

  errorText: {
    textAlign: 'center',
  },

  // Footer
  footer: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing['4'],
    paddingTop: spacing['3'],
    paddingBottom: spacing['8'],
    gap: spacing['2'],
  },
  estimatedText: {
    textAlign: 'center',
  },

  // Sub-sheet de opciones
  subBackdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  subSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius['2xl'],
    borderTopRightRadius: borderRadius['2xl'],
    paddingHorizontal: spacing['4'],
    paddingBottom: spacing['8'],
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing['4'],
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  radioLabel: {
    flex: 1,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },

  // Step: result
  resultSheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius['2xl'],
    borderTopRightRadius: borderRadius['2xl'],
  },

  // Estilos del step confirm
  confirmDetailCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  confirmDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing['4'],
    paddingVertical: spacing['3'],
  },
  confirmDetailLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['2'],
  },
  confirmDivider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginHorizontal: spacing['4'],
  },
  sectionTitle: {
    marginTop: spacing['2'],
    marginBottom: spacing['1'],
  },
  confirmBreakdownCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing['4'],
    paddingVertical: spacing['2'],
    gap: spacing['3'],
    paddingBottom: spacing['4'],
  },
  confirmBreakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing['2'],
  },
  confirmBreakdownLabel: {
    flex: 1,
    marginRight: spacing['2'],
  },
  confirmBreakdownValue: {
    flexShrink: 1,
    textAlign: 'right',
  },
  confirmFooterLabel: {
    flex: 1,
    marginRight: spacing['2'],
  },
  confirmFooter: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing['4'],
    paddingTop: spacing['3'],
    paddingBottom: spacing['8'],
    gap: spacing['3'],
  },
  confirmFooterTotal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  confirmFooterAmount: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    flexShrink: 1,
    textAlign: 'right',
  },
  systemErrorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['2'],
    backgroundColor: colors.warningLight,
    borderWidth: 1,
    borderColor: colors.warningBorder,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing['3'],
    paddingVertical: spacing['2'],
  },
  systemErrorText: {
    flex: 1,
    color: colors.warning,
  },
});
