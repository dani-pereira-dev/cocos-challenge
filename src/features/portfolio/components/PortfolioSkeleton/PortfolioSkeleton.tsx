import { View } from 'react-native';
import { Skeleton, SkeletonListItem } from '@ui-kit';
import { styles } from './PortfolioSkeleton.styles';

const ITEM_COUNT = 6;

export function PortfolioSkeleton() {
  return (
    <>
      <View style={styles.header}>
        <Skeleton width={100} height={12} style={styles.bone} />
        <Skeleton width={200} height={42} style={styles.bone} />
        <View style={styles.gainRow}>
          <Skeleton width={32} height={12} style={styles.bone} />
          <Skeleton width={80} height={12} style={styles.bone} />
        </View>
      </View>

      {Array.from({ length: ITEM_COUNT }).map((_, i) => (
        <SkeletonListItem key={i} />
      ))}
    </>
  );
}
