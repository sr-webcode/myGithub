import { VStack } from '@chakra-ui/react';
import { PropsWithChildren, ReactNode } from 'react';
import Title from './Title';

export type ContentSectionProps = PropsWithChildren<{
  title?: ReactNode;
}>;

const ContentSection = (props: ContentSectionProps) => {
  const { title, children } = props;
  return (
    <VStack rowGap={6} width="100%">
      {title && (
        <>
          {typeof title === 'string' ? (
            <Title text={title} alignSelf="flex-start" />
          ) : (
            title
          )}
        </>
      )}
      {children}
    </VStack>
  );
};

export default ContentSection;
