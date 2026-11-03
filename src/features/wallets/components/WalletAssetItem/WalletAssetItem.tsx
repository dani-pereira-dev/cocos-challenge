import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon, Text } from '@ui-kit';
import ReanimatedSwipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';

import { TickerAvatar } from '@/components/TickerAvatar';
import { formatCurrency } from '@/utils/formatters';
import { EnrichedAllocation } from '../../hooks/useWalletDetail';
import { styles, DELETE_ACTION_WIDTH } from './WalletAssetItem.styles';

interface WalletAssetItemProps {
  allocation: EnrichedAllocation;
  onDelete?: (ticker: string) => void;
}

interface DeleteActionProps {
  progress: SharedValue<number>;
  methods: SwipeableMethods;
  ticker: string;
  onDelete: (ticker: string) => void;
}

function DeleteAction({ progress, methods, ticker, onDelete }: DeleteActionProps) {
  const { t } = useTranslation();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: DELETE_ACTION_WIDTH * (1 - progress.value) }],
  }));

  function handlePress() {
    methods.close();
    onDelete(ticker);
  }

  return (
    <Animated.View style={[styles.deleteAction, animatedStyle]}>
      <Pressable style={styles.deleteButton} onPress={handlePress}>
        <Icon name="trash-outline" size={20} color="#fff" />
        <Text variant="caption" style={styles.deleteLabel}>
          {t('wallets.confirmDelete')}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

export function WalletAssetItem({ allocation, onDelete }: WalletAssetItemProps) {
  const { t } = useTranslation();

  const content = (
    <View style={styles.container}>
      <TickerAvatar ticker={allocation.ticker} size={44} />

      <View style={styles.info}>
        <Text variant="bodySemibold" numberOfLines={1}>
          {allocation.ticker}
        </Text>
        <Text variant="caption" color="tertiary">
          {t('wallets.shares', { count: allocation.quantity })}
        </Text>
      </View>

      <View style={styles.metrics}>
        <Text variant="bodySemibold" align="right">
          {formatCurrency(allocation.currentValue)}
        </Text>
        {allocation.holding ? (
          <Text variant="caption" color="secondary" align="right">
            {formatCurrency(allocation.holding.last_price)}
          </Text>
        ) : null}
      </View>
    </View>
  );

  if (!onDelete) return content;

  return (
    <ReanimatedSwipeable
      renderRightActions={(progress, _translation, methods) => (
        <DeleteAction
          progress={progress}
          methods={methods}
          ticker={allocation.ticker}
          onDelete={onDelete}
        />
      )}
      rightThreshold={DELETE_ACTION_WIDTH / 2}
      overshootRight={false}
    >
      {content}
    </ReanimatedSwipeable>
  );
}
