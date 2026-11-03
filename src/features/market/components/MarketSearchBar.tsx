import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { colors } from '@ui-kit/foundations/colors';
import { borderRadius, spacing } from '@ui-kit/foundations/spacing';
import { fontSize } from '@ui-kit/foundations/typography';
import { copy } from '@/constants/copy';

interface MarketSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

export function MarketSearchBar({ value, onChangeText, onClear }: MarketSearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Ionicons name="search" size={18} color={colors.textTertiary} style={styles.icon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={copy.market.searchPlaceholder}
          placeholderTextColor={colors.placeholder}
          autoCapitalize="characters"
          autoCorrect={false}
          returnKeyType="search"
          clearButtonMode="never"
        />
        {value.length > 0 && (
          <Pressable onPress={onClear} hitSlop={8}>
            <Ionicons name="close-circle" size={18} color={colors.textTertiary} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing['4'],
    paddingVertical: spacing['3'],
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingHorizontal: spacing['3'],
    height: 44,
    gap: spacing['2'],
  },
  icon: {
    flexShrink: 0,
  },
  input: {
    flex: 1,
    fontSize: fontSize.base,
    color: colors.textPrimary,
    padding: 0,
  },
});
