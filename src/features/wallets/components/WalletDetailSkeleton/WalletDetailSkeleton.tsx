import { View } from 'react-native';
import { Skeleton, SkeletonListItem } from '@ui-kit';
import { styles } from './WalletDetailSkeleton.styles';

const ITEM_COUNT = 4;

export function WalletDetailSkeleton() {
  return (
    <>
      <View style={styles.totalRow}>
        <Skeleton width={96} height={12} />
        <Skeleton width={80} height={16} />
      </View>

      {Array.from({ length: ITEM_COUNT }).map((_, i) => (
        <SkeletonListItem key={i} />
      ))}
    </>
  );
}

