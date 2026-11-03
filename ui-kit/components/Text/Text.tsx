import React from 'react';
import { Text as RNText, StyleProp, StyleSheet, TextStyle } from 'react-native';
import { colors, ColorToken } from '../../foundations/colors';
import { textStyles, TextStyleToken } from '../../foundations/typography';

type TextColor = ColorToken | string;

interface TextProps {
  children: React.ReactNode;
  variant?: TextStyleToken;
  color?: TextColor;
  align?: TextStyle['textAlign'];
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  adjustsFontSizeToFit?: boolean;
  minimumFontScale?: number;
  style?: StyleProp<TextStyle>;
  testID?: string;
}

const colorMap: Record<string, string> = {
  primary: colors.textPrimary,
  secondary: colors.textSecondary,
  tertiary: colors.textTertiary,
  inverse: colors.textInverse,
  brand: colors.textBrand,
  success: colors.success,
  error: colors.error,
  warning: colors.warning,
};

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  color = 'primary',
  align,
  numberOfLines,
  ellipsizeMode,
  adjustsFontSizeToFit,
  minimumFontScale,
  style,
  testID,
}) => {
  const resolvedColor = colorMap[color] ?? color;

  return (
    <RNText
      testID={testID}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      minimumFontScale={minimumFontScale}
      style={[
        styles.base,
        textStyles[variant],
        { color: resolvedColor },
        align ? { textAlign: align } : undefined,
        style,
      ]}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    color: colors.textPrimary,
  },
});
