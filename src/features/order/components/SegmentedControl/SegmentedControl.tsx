import { Pressable, View } from 'react-native';
import { Text } from '@ui-kit/components/Text';
import { colors } from '@ui-kit/foundations/colors';
import { styles } from './SegmentedControl.styles';

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
