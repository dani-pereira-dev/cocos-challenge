import { View, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon, type IconName } from '@ui-kit';
import { Text } from '@ui-kit/components/Text';
import { colors } from '@ui-kit/foundations/colors';
import { styles } from './EmptyView.styles';


interface EmptyViewProps {
  title?: string;
  message?: string;
  icon?: IconName;
  style?: ViewStyle;
}

export function EmptyView({ title, message, icon = 'search-outline', style }: EmptyViewProps) {
  const { t } = useTranslation();
  const resolvedTitle = title ?? t('common.noResults');

  return (
    <View style={[styles.container, style]}>
      <Icon name={icon} size={48} color={colors.textTertiary} style={styles.icon} />
      <Text variant="bodyMedium" color="primary" align="center">
        {resolvedTitle}
      </Text>
      {message ? (
        <Text variant="body" color="secondary" align="center">
          {message}
        </Text>
      ) : null}
    </View>
  );
}
