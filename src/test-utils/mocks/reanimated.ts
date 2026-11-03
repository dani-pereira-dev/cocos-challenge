const { View } = require('react-native');

const useSharedValue = (value: unknown) => ({ value });
const useAnimatedStyle = (_fn: () => object) => ({});
const withRepeat = (animation: unknown) => animation;
const withTiming = (value: unknown) => value;
const Easing = { inOut: (_fn: unknown) => _fn, ease: 0 };

const Animated = { View };

module.exports = {
  default: { View },
  Animated,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  SharedValue: {},
};
