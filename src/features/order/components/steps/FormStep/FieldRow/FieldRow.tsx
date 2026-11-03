import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@ui-kit/components/Text';
import { styles } from './FieldRow.styles';

interface FieldRowProps {
  label: string;
  onModify: () => void;
}

export function FieldRow({ label, onModify }: FieldRowProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.row}>
      <Text variant="body" color="primary" style={styles.label}>
        {label}
      </Text>
      <Pressable onPress={onModify} hitSlop={8}>
        <Text variant="label" color="brand">
          {t('order.modify')}
        </Text>
      </Pressable>
    </View>
  );
}
