import { ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text, colors } from '@ui-kit';

import { isBuyOrder, isLimitOrder } from '@/domain/entities/order';
import { useOrderFormContext } from '@/features/order/contexts/OrderFormContext';
import { formatDate } from '@/utils/formatters';
import { InstrumentCard } from '../shared/InstrumentCard/InstrumentCard';
import { OrderNavBar } from '../shared/OrderNavBar/OrderNavBar';
import { OrderDetailCard } from './OrderDetailCard/OrderDetailCard';
import { OrderBreakdownCard } from './OrderBreakdownCard/OrderBreakdownCard';
import { ConfirmFooter } from './ConfirmFooter/ConfirmFooter';
import { styles } from './ConfirmStep.styles';

const COMISION_RATE = 0.006;
const IMPUESTOS_RATE = 0.0012;

export function ConfirmStep() {
  const { t } = useTranslation();
  const {
    instrument,
    side,
    orderType,
    derivedShares,
    limitPriceInput,
    systemError,
    setSystemError,
    isPending,
    handleSubmit,
    setStep,
  } = useOrderFormContext();

  const isBuy = isBuyOrder(side);
  const accentColor = isBuy ? colors.success : colors.error;
  const title = isBuy ? t('order.confirmTitleBuy') : t('order.confirmTitleSell');

  const orderPrice = isLimitOrder(orderType)
    ? parseFloat(limitPriceInput.replace(',', '.'))
    : instrument!.last_price;

  const subtotal = derivedShares * instrument!.last_price;
  const comision = subtotal * COMISION_RATE;
  const impuestos = subtotal * IMPUESTOS_RATE;
  const netTotal = isBuy ? subtotal + comision + impuestos : subtotal - comision - impuestos;

  const estimatedLabel = isBuy
    ? t('order.estimatedToPayLabel')
    : t('order.estimatedToReceiveLabel');

  function handleClose() {
    setSystemError(null);
    setStep('form');
  }

  return (
    <View style={styles.screen}>
      <OrderNavBar title={title} onClose={handleClose} />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <InstrumentCard ticker={instrument!.ticker} name={instrument!.name} avatarSize={44} />

        <OrderDetailCard
          orderType={orderType}
          orderPrice={orderPrice}
          today={formatDate(new Date())}
        />

        <Text variant="h3" style={styles.sectionTitle}>
          {t('order.detallesTitle')}
        </Text>

        <OrderBreakdownCard
          side={side}
          derivedShares={derivedShares}
          subtotal={subtotal}
          comision={comision}
          impuestos={impuestos}
        />
      </ScrollView>

      <ConfirmFooter
        estimatedLabel={estimatedLabel}
        netTotal={netTotal}
        accentColor={accentColor}
        systemError={systemError}
        isPending={isPending}
        onSubmit={handleSubmit}
      />
    </View>
  );
}
