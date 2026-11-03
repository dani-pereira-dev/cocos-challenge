import { View } from 'react-native';
import { Icon, Text, type IconName } from '@ui-kit';

import { formatPercent } from '@/utils/formatters';
import { resolveGainColor } from '@/utils/colors';
import { styles } from './ReturnBadge.styles';

interface ReturnBadgeProps {
  value: number;
}

export function ReturnBadge({ value }: ReturnBadgeProps) {
  const color = resolveGainColor(value);

  const iconName: IconName | null =
    value > 0 ? 'caret-up' : value < 0 ? 'caret-down' : null;

  return (
    <View style={styles.container}>
      {iconName ? <Icon name={iconName} size={12} color={color} /> : null}
      <Text variant="caption" style={[styles.text, { color }]}>
        {formatPercent(value)}
      </Text>
    </View>
  );
}
