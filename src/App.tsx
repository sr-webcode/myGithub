import { useState } from 'react';
import { useBoolean, VStack } from '@chakra-ui/react';

import { useFetchIssues } from './hooks/useFetchIssues';
import { useSearchUsers } from './hooks/useSearchUsers';
import { useFetchRepository } from './hooks/useFetchRepository';
import Layout from './ui/Layout';
import Users from './components/Users';
import Search from './components/Search';
import Issues from './components/Issues';
import Repositories from './components/Repositories';

const App = () => {
  const [isRepositoryViewActive, setRepositoryViewActive] = useBoolean(true);
  const [currentRepoTitle, setRepoTitle] = useState<string | undefined>(
    undefined
  );

  const {
    onClickSearch,
    data: githubUsers,
    isLoading: isUsersLoading
  } = useSearchUsers();

  const {
    onClickUser,
    selectedUser,
    data: userRepositories,
    isLoading: isRepositoryLoading
  } = useFetchRepository();

  const {
    onFetchIssues,
    data: repoIssues,
    isLoading: isRepoIssuesLoading
  } = useFetchIssues();

  const isUsersVisible = isRepositoryViewActive && Boolean(githubUsers);

  const isRepositoryViewVisible = isUsersVisible && selectedUser;

  const isIssuesViewVisible =
    !isRepositoryViewVisible && githubUsers && repoIssues;

  return (
    <Layout mt={10} mb={10}>
      <VStack rowGap={24} alignItems="flex-start">
        <Search
          onClickSearch={(searchTerm) => {
            onClickSearch(searchTerm);
            setRepositoryViewActive.on();
          }}
        />
        <Users
          data={githubUsers}
          selectedUser={selectedUser}
          onClickUser={(userName) => {
            onClickUser(userName);
            setRepositoryViewActive.on();
          }}
          isLoading={isUsersLoading}
        />
        {isRepositoryViewVisible && (
          <Repositories
            data={userRepositories}
            isLoading={isRepositoryLoading}
            paginatorRefreshTrigger={selectedUser}
            onClickRepository={(title) => {
              onFetchIssues({ owner: selectedUser, repositoryTitle: title });
              setRepoTitle(title);
              setRepositoryViewActive.off();
            }}
          />
        )}
        {isIssuesViewVisible && (
          <Issues
            data={repoIssues}
            selectedUser={selectedUser}
            repoTitle={currentRepoTitle}
            isLoading={isRepoIssuesLoading}
          />
        )}
      </VStack>
    </Layout>
  );
};

export default App;
