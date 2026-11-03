import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kit/components/Text';

const AVATAR_PALETTE = [
  '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B',
  '#EF4444', '#EC4899', '#06B6D4', '#84CC16',
];

/**
 * Deriva un color consistente del ticker para el avatar
 * sumando los char codes de las letras.
 */
function colorFromTicker(ticker: string): string {
  const sum = ticker.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_PALETTE[sum % AVATAR_PALETTE.length];
}

interface TickerAvatarProps {
  ticker: string;
  size?: number;
}

export function TickerAvatar({ ticker, size = 44 }: TickerAvatarProps) {
  const initials = ticker.slice(0, 2).toUpperCase();
  const backgroundColor = colorFromTicker(ticker);
  const fontSize = size * 0.36;

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2, backgroundColor }]}>
      <Text variant="label" style={{ color: '#FFFFFF', fontSize, fontWeight: '700' }}>
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
