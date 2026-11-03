import { View } from 'react-native';
import { Skeleton } from './Skeleton';
import { styles } from './SkeletonListItem.styles';

interface SkeletonListItemProps {
  avatarSize?: number;
}

export function SkeletonListItem({ avatarSize = 44 }: SkeletonListItemProps) {
  return (
    <View style={styles.row}>
      <Skeleton width={avatarSize} height={avatarSize} borderRadius={avatarSize / 2} />

      <View style={styles.left}>
        <Skeleton width={120} height={14} />
        <Skeleton width={80} height={12} />
      </View>

      <View style={styles.right}>
        <Skeleton width={64} height={14} />
        <Skeleton width={44} height={12} />
      </View>
    </View>
  );
}
