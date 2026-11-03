import { Pressable, View } from 'react-native';
import { Text } from '@ui-kit/components/Text';
import { copy } from '@/constants/copy';
import { styles } from './FieldRow.styles';

interface FieldRowProps {
  label: string;
  onModify: () => void;
}

export function FieldRow({ label, onModify }: FieldRowProps) {
  return (
    <View style={styles.row}>
      <Text variant="body" color="primary" style={styles.label}>
        {label}
      </Text>
      <Pressable onPress={onModify} hitSlop={8}>
        <Text variant="label" color="brand">
          {copy.order.modify}
        </Text>
      </Pressable>
    </View>
  );
}
