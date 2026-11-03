import { View } from 'react-native';
import { Skeleton, SkeletonListItem } from '@ui-kit';
import { styles } from './PortfolioSkeleton.styles';

const ITEM_COUNT = 6;

export function PortfolioSkeleton() {
  return (
    <>
      <View style={styles.header}>
        <View style={styles.stat}>
          <Skeleton width={80} height={12} />
          <Skeleton width={140} height={28} />
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Skeleton width={80} height={12} />
          <Skeleton width={100} height={18} />
          <Skeleton width={72} height={12} />
        </View>
      </View>

      {Array.from({ length: ITEM_COUNT }).map((_, i) => (
        <SkeletonListItem key={i} />
      ))}
    </>
  );
}
