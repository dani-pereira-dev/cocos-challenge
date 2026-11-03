import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@ui-kit/components/Text';
import { formatPercent } from '@/utils/formatters';
import { resolveGainColor } from '@/utils/colors';
import { styles } from './ReturnBadge.styles';

interface ReturnBadgeProps {
  value: number;
}

export function ReturnBadge({ value }: ReturnBadgeProps) {
  const { t } = useTranslation();
  const color = resolveGainColor(value);
  const arrow =
    value > 0 ? t('returnBadge.up') : value < 0 ? t('returnBadge.down') : t('returnBadge.neutral');

  return (
    <View style={styles.container}>
      <Text variant="caption" style={[styles.text, { color }]}>
        {arrow} {formatPercent(value)}
      </Text>
    </View>
  );
}
