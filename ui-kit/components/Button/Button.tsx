import React from 'react';
import { ActivityIndicator, Pressable, TextStyle, ViewStyle } from 'react-native';
import { colors } from '../../foundations/colors';
import { borderRadius, spacing } from '../../foundations/spacing';
import { textStyles } from '../../foundations/typography';
import { Text } from '../Text/Text';
import { styles } from './Button.styles';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  testID?: string;
}

interface VariantStyles {
  container: ViewStyle;
  label: TextStyle;
  pressed: ViewStyle;
}

const variantMap: Record<ButtonVariant, VariantStyles> = {
  primary: {
    container: { backgroundColor: colors.primary },
    label: { color: colors.textInverse },
    pressed: { backgroundColor: colors.primaryDark },
  },
  secondary: {
    container: { backgroundColor: '#334155' },
    label: { color: colors.textInverse },
    pressed: { backgroundColor: '#1E293B' },
  },
  outline: {
    container: {
      backgroundColor: colors.transparent,
      borderWidth: 1.5,
      borderColor: colors.border,
    },
    label: { color: colors.textPrimary },
    pressed: { backgroundColor: colors.surfaceSecondary },
  },
  ghost: {
    container: { backgroundColor: colors.transparent },
    label: { color: colors.primary },
    pressed: { backgroundColor: colors.primaryLight },
  },
  danger: {
    container: { backgroundColor: colors.error },
    label: { color: colors.textInverse },
    pressed: { backgroundColor: '#B91C1C' },
  },
};

const sizeMap: Record<ButtonSize, { container: ViewStyle; label: TextStyle }> = {
  sm: {
    container: {
      paddingVertical: spacing['2'],
      paddingHorizontal: spacing['4'],
      borderRadius: borderRadius.md,
    },
    label: textStyles.buttonSm,
  },
  md: {
    container: {
      paddingVertical: spacing['3'],
      paddingHorizontal: spacing['5'],
      borderRadius: borderRadius.lg,
    },
    label: textStyles.button,
  },
  lg: {
    container: {
      paddingVertical: spacing['4'],
      paddingHorizontal: spacing['6'],
      borderRadius: borderRadius.lg,
    },
    label: textStyles.button,
  },
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'lg',
  disabled = false,
  loading = false,
  fullWidth = true,
  style,
  testID,
}) => {
  const variantStyles = variantMap[variant];
  const sizeStyles = sizeMap[size];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        variantStyles.container,
        sizeStyles.container,
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        pressed && !isDisabled && variantStyles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'ghost' ? colors.primary : colors.textInverse}
        />
      ) : (
        <Text variant="button" style={[sizeStyles.label, variantStyles.label]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};
