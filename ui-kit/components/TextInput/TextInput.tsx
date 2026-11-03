import React, { useState } from 'react';
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../../foundations/colors';
import { borderRadius, spacing } from '../../foundations/spacing';
import { Text } from '../Text/Text';
import { styles } from './TextInput.styles';

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

  const borderColor = error ? colors.error : focused ? colors.inputFocusBorder : colors.inputBorder;

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
