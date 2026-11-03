import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kit/components/Text';
import { colors } from '@ui-kit/foundations/colors';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text variant="h2" color="primary">
        Cocos Challenge
      </Text>
      <Text variant="body" color="secondary">
        Fase 2: Tab navigation coming soon
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
});
