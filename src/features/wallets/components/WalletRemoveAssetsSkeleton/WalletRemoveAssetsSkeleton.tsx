import { SkeletonListItem } from '@ui-kit';

const ITEM_COUNT = 6;

export function WalletRemoveAssetsSkeleton() {
  return (
    <>
      {Array.from({ length: ITEM_COUNT }).map((_, i) => (
        <SkeletonListItem key={i} />
      ))}
    </>
  );
}
