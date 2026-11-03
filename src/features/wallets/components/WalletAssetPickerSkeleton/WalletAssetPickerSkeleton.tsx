import { SkeletonListItem } from '@ui-kit';

const ITEM_COUNT = 8;

export function WalletAssetPickerSkeleton() {
  return (
    <>
      {Array.from({ length: ITEM_COUNT }).map((_, i) => (
        <SkeletonListItem key={i} />
      ))}
    </>
  );
}
