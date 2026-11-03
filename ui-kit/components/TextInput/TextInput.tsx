import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../../foundations/colors';
import { borderRadius, spacing } from '../../foundations/spacing';
import { fontSize, fontWeight } from '../../foundations/typography';
import { Text } from '../Text/Text';

interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  label?: string;
  hint?: string;
  error?: string;
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  onSuffixPress?: () => void;
  testID?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  hint,
  error,
  prefix,
  suffix,
  disabled = false,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  onSuffixPress,
  testID,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? colors.error
    : focused
    ? colors.inputFocusBorder
    : colors.inputBorder;

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? (
        <Text variant="label" color="secondary" style={styles.label}>
          {label}
        </Text>
      ) : null}

      <View
        style={[
          styles.inputContainer,
          { borderColor },
          disabled && styles.disabledContainer,
          inputContainerStyle,
        ]}
      >
        {prefix ? (
          <Text variant="bodyMedium" color="secondary" style={styles.prefix}>
            {prefix}
          </Text>
        ) : null}

        <RNTextInput
          testID={testID}
          style={[styles.input, disabled && styles.disabledText, inputStyle]}
          placeholderTextColor={colors.placeholder}
          editable={!disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        />

        {suffix ? (
          <Pressable onPress={onSuffixPress} disabled={!onSuffixPress}>
            <Text
              variant="label"
              color={onSuffixPress ? 'brand' : 'tertiary'}
              style={styles.suffix}
            >
              {suffix}
            </Text>
          </Pressable>
        ) : null}
      </View>

      {error ? (
        <Text variant="caption" color="error" style={styles.helperText}>
          {error}
        </Text>
      ) : hint ? (
        <Text variant="caption" color="tertiary" style={styles.helperText}>
          {hint}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing['1'],
  },
  label: {
    marginBottom: spacing['1'],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderWidth: 1.5,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing['3'],
    minHeight: 48,
  },
  disabledContainer: {
    backgroundColor: colors.surfaceSecondary,
    opacity: 0.7,
  },
  input: {
    flex: 1,
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    color: colors.textPrimary,
    paddingVertical: spacing['2'],
  },
  disabledText: {
    color: colors.textSecondary,
  },
  prefix: {
    marginRight: spacing['2'],
  },
  suffix: {
    marginLeft: spacing['2'],
  },
  helperText: {
    marginTop: spacing['1'],
  },
});
