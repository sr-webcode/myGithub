import {
  Text,
  HStack,
  Button,
  VStack,
  ListItem,
  UnorderedList,
  useDisclosure
} from '@chakra-ui/react';

import { usePaginator } from '../hooks/usePaginator';
import { GithubIssue, GithubIssues } from '../types/github';
import Pagination from './Pagination';
import { DataProps } from '../types/data';
import ContentSection from '../ui/ContentSection';
import { SkeletonRowLoader } from '../ui/Skeleton';
import { timeAgo } from '../utils/time';
import Title from '../ui/Title';
import NewIssue from './NewIssue';

type RepositoryProps = DataProps<{
  data: GithubIssues | null;
  selectedUser?: string;
  repoTitle?: string;
}>;

const Issues = (props: RepositoryProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading, selectedUser = '', repoTitle = '' } = props;
  const { handlePageChange, pageCount, paginatedData } =
    usePaginator<GithubIssue>({
      data: data ?? []
    });

  const hasIssues = Boolean(paginatedData.length);
  const createIssueButton = (
    <Button
      size="lg"
      maxW={120}
      width="100%"
      flexShrink={0}
      colorScheme="gray"
      onClick={onOpen}
    >
      New Issue
    </Button>
  );

  const newIssueModal = (
    <NewIssue
      isOpen={isOpen}
      repo={repoTitle}
      onClose={onClose}
      owner={selectedUser}
    />
  );

  if (isLoading) return <SkeletonRowLoader count={6} />;
  if (!hasIssues)
    return (
      <>
        <VStack
          width="100%"
          minHeight={280}
          justify="center"
          alignItems="center"
        >
          <Text fontSize="8xl" color="gray.200" userSelect="none">
            No issues found
          </Text>
          {createIssueButton}
        </VStack>
        {newIssueModal}
      </>
    );

  return (
    <>
      <ContentSection
        title={
          <HStack width="100%" justifyContent="space-between">
            <Title text={'Open Issues'} />
            {createIssueButton}
          </HStack>
        }
      >
        <UnorderedList
          margin={0}
          spacing={2}
          width="100%"
          listStyleType="none"
          alignSelf="flex-start"
        >
          {paginatedData?.map(({ id, title, created_at, user }, index) => (
            <ListItem
              key={id}
              marginTop={0}
              padding={2}
              display={'flex'}
              justifyContent="space-between"
              bgColor={index % 2 === 0 ? 'gray.50' : 'white'}
              sx={{
                cursor: 'pointer',
                ':hover': {
                  bgColor: 'gray.100'
                }
              }}
            >
              <Text
                maxW={420}
                noOfLines={1}
                title={title}
                textOverflow="ellipsis"
              >
                {title}
              </Text>
              <Text color="gray.700">
                {timeAgo(created_at)} by {user.login}
              </Text>
            </ListItem>
          ))}
        </UnorderedList>
        <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
      </ContentSection>
      {newIssueModal}
    </>
  );
};

export default Issues;
