import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '@ui-kit/components/Text';
import { colors } from '@ui-kit/foundations/colors';
import { borderRadius, spacing } from '@ui-kit/foundations/spacing';

interface SegmentOption<T> {
  value: T;
  label: string;
  activeColor?: string;
}

interface SegmentedControlProps<T> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  compact?: boolean;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  compact = false,
}: SegmentedControlProps<T>) {
  return (
    <View style={[styles.container, compact && styles.compact]}>
      {options.map((option) => {
        const isActive = option.value === value;
        const activeColor = option.activeColor ?? colors.primary;

        return (
          <Pressable
            key={option.value}
            style={[
              styles.option,
              isActive && { backgroundColor: activeColor, borderColor: activeColor },
            ]}
            onPress={() => onChange(option.value)}
          >
            <Text
              variant={compact ? 'caption' : 'bodySemibold'}
              style={{ color: isActive ? colors.white : colors.textSecondary }}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSecondary,
    borderRadius: borderRadius.md,
    padding: 3,
    gap: 3,
  },
  compact: {
    borderRadius: borderRadius.sm,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['2'],
    borderRadius: borderRadius.sm,
    borderWidth: 1.5,
    borderColor: colors.transparent,
  },
});
