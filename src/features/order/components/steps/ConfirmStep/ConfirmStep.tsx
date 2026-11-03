import { ScrollView, View } from 'react-native';
import { Text } from '@ui-kit/components/Text';
import { colors } from '@ui-kit/foundations/colors';
import {
  isBuyOrder,
  isLimitOrder,
  OrderableInstrument,
  OrderSide,
  OrderType,
} from '@/domain/entities/order';
import { styles } from './ConfirmStep.styles';
import { formatDate } from '@/utils/formatters';
import { copy } from '@/constants/copy';
import { InstrumentCard } from '../shared/InstrumentCard/InstrumentCard';
import { OrderNavBar } from '../shared/OrderNavBar/OrderNavBar';
import { OrderDetailCard } from './OrderDetailCard/OrderDetailCard';
import { OrderBreakdownCard } from './OrderBreakdownCard/OrderBreakdownCard';
import { ConfirmFooter } from './ConfirmFooter/ConfirmFooter';

const COMISION_RATE = 0.006;
const IMPUESTOS_RATE = 0.0012;

interface ConfirmStepProps {
  instrument: OrderableInstrument;
  side: OrderSide;
  orderType: OrderType;
  derivedShares: number;
  limitPriceInput: string;
  systemError: string | null;
  isPending: boolean;
  onBack: () => void;
  onSubmit: () => void;
}

export function ConfirmStep({
  instrument,
  side,
  orderType,
  derivedShares,
  limitPriceInput,
  systemError,
  isPending,
  onBack,
  onSubmit,
}: ConfirmStepProps) {
  const isBuy = isBuyOrder(side);
  const accentColor = isBuy ? colors.success : colors.error;
  const title = isBuy ? copy.order.confirmTitleBuy : copy.order.confirmTitleSell;

  const orderPrice = isLimitOrder(orderType)
    ? parseFloat(limitPriceInput.replace(',', '.'))
    : instrument.last_price;

  const subtotal = derivedShares * instrument.last_price;
  const comision = subtotal * COMISION_RATE;
  const impuestos = subtotal * IMPUESTOS_RATE;
  const netTotal = isBuy ? subtotal + comision + impuestos : subtotal - comision - impuestos;

  const estimatedLabel = isBuy
    ? copy.order.estimatedToPayLabel
    : copy.order.estimatedToReceiveLabel;

  return (
    <View style={styles.screen}>
      <OrderNavBar title={title} accentColor={accentColor} onBack={onBack} />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <InstrumentCard ticker={instrument.ticker} name={instrument.name} avatarSize={44} />

        <OrderDetailCard
          orderType={orderType}
          orderPrice={orderPrice}
          today={formatDate(new Date())}
        />

        <Text variant="h3" style={styles.sectionTitle}>
          {copy.order.detallesTitle}
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
        onSubmit={onSubmit}
      />
    </View>
  );
}
