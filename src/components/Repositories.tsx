import {
  Text,
  VStack,
  Skeleton,
  ListItem,
  UnorderedList
} from '@chakra-ui/react';

import { usePaginator } from '../hooks/usePaginator';
import { GithubUserRepositories, GithubUserRepository } from '../types/github';
import Pagination from './Pagination';
import { DataProps } from '../types/data';
import ContentSection from '../ui/ContentSection';

const SkeletonLoader = ({ count }: { count: number }) => {
  const loaderItems = new Array(count).fill(null);
  return (
    <VStack width="100%" rowGap={6}>
      {loaderItems.map((_, idx) => (
        <Skeleton key={idx} width="100%" height="10" />
      ))}
    </VStack>
  );
};

type RepositoryProps = DataProps<{
  paginatorRefreshTrigger?: string;
  data: GithubUserRepositories | null;
  onClickRepository: (title: string) => void;
}>;

const Repositories = (props: RepositoryProps) => {
  const { data, paginatorRefreshTrigger, isLoading, onClickRepository } = props;
  const { handlePageChange, pageCount, paginatedData } =
    usePaginator<GithubUserRepository>({
      data: data ?? [],
      paginatorRefreshTrigger
    });

  const hasRepository = Boolean(paginatedData.length);

  if (isLoading) return <SkeletonLoader count={6} />;
  if (!hasRepository) return <Text>No repository found...</Text>;

  return (
    <ContentSection title={'Repositories'}>
      <UnorderedList
        margin={0}
        spacing={2}
        width="100%"
        listStyleType="none"
        alignSelf="flex-start"
      >
        {paginatedData?.map(
          ({ id, name, stargazers_count, watchers_count }, index) => (
            <ListItem
              key={id}
              marginTop={0}
              padding={2}
              display={'flex'}
              onClick={() => onClickRepository(name)}
              justifyContent="space-between"
              bgColor={index % 2 === 0 ? 'gray.50' : 'white'}
              sx={{
                cursor: 'pointer',
                ':hover': {
                  bgColor: 'gray.100'
                }
              }}
            >
              <Text>{name}</Text>
              <Text color="gray.700">{`${stargazers_count} stars / ${watchers_count} watching`}</Text>
            </ListItem>
          )
        )}
      </UnorderedList>
      <Pagination
        pageCount={pageCount}
        key={paginatorRefreshTrigger}
        onPageChange={handlePageChange}
      />
    </ContentSection>
  );
};

export default Repositories;
