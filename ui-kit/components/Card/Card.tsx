import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '../../foundations/colors';
import { borderRadius, shadow, spacing } from '../../foundations/spacing';

type CardElevation = 'flat' | 'sm' | 'md' | 'lg';

interface CardProps {
  children: React.ReactNode;
  elevation?: CardElevation;
  onPress?: () => void;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  testID?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevation = 'sm',
  onPress,
  style,
  contentStyle,
  testID,
}) => {
  const elevationStyle = elevation === 'flat' ? {} : shadow[elevation];

  if (onPress) {
    return (
      <Pressable
        testID={testID}
        onPress={onPress}
        style={({ pressed }) => [
          styles.base,
          elevationStyle,
          pressed && styles.pressed,
          style,
        ]}
      >
        <View style={[styles.content, contentStyle]}>{children}</View>
      </Pressable>
    );
  }

  return (
    <View testID={testID} style={[styles.base, elevationStyle, style]}>
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  content: {
    padding: spacing['4'],
  },
  pressed: {
    opacity: 0.92,
  },
});
