import { VStack, Skeleton, Wrap, WrapItem } from '@chakra-ui/react';

type SkeletonProps = { count: number };

export const SkeletonRowLoader = ({ count }: SkeletonProps) => {
  const loaderItems = new Array(count).fill(null);
  return (
    <VStack width="100%" rowGap={6}>
      {loaderItems.map((_, idx) => (
        <Skeleton key={idx} width="100%" height="10" />
      ))}
    </VStack>
  );
};

export const SkeletonAvatarLoader = ({ count }: SkeletonProps) => {
  const loaderItems = new Array(count).fill(null);
  return (
    <VStack rowGap={6} width="100%">
      <Skeleton width="20%" height="30px" marginRight="auto" />
      <Wrap spacing={10}>
        {loaderItems.map((_, idx) => (
          <WrapItem key={idx}>
            <Skeleton key={idx} width="128px" height="128px" />
          </WrapItem>
        ))}
      </Wrap>
    </VStack>
  );
};
