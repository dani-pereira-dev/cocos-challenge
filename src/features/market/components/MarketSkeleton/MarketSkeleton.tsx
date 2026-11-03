import { SkeletonListItem } from '@ui-kit';

const ITEM_COUNT = 10;

export function MarketSkeleton() {
  return (
    <>
      {Array.from({ length: ITEM_COUNT }).map((_, i) => (
        <SkeletonListItem key={i} />
      ))}
    </>
  );
}
