import { View } from 'react-native';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Icon, Text, colors } from '@ui-kit';
import { styles } from './PortfolioEmptyState.styles';

export function PortfolioEmptyState() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Icon name="trending-up" size={42} color={colors.primary} />
      </View>
      <Text variant="h3" align="center" style={styles.title}>
        {t('portfolio.emptyTitle')}
      </Text>
      <Text variant="body" color="secondary" align="center" style={styles.subtitle}>
        {t('portfolio.emptySubtitlePrefix')}{' '}
        <Link href="/(tabs)/market" style={styles.link}>
          {t('portfolio.emptySubtitleLink')}
        </Link>{' '}
        {t('portfolio.emptySubtitleSuffix')}
      </Text>
    </View>
  );
}
