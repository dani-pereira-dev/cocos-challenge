import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@ui-kit/components/Text';
import { formatPercent } from '@/utils/formatters';
import { resolveGainColor } from '@/utils/colors';
import { styles } from './ReturnBadge.styles';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface ReturnBadgeProps {
  value: number;
}

export function ReturnBadge({ value }: ReturnBadgeProps) {
  const color = resolveGainColor(value);

  const iconName: IoniconName | null =
    value > 0 ? 'caret-up' : value < 0 ? 'caret-down' : null;

  return (
    <View style={styles.container}>
      {iconName ? <Ionicons name={iconName} size={12} color={color} /> : null}
      <Text variant="caption" style={[styles.text, { color }]}>
        {formatPercent(value)}
      </Text>
    </View>
  );
}
