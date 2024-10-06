import { useState } from 'react';
import { useBoolean } from '@chakra-ui/react';

import { composeUrl } from '../utils/url';
import { GithubUserRepositories } from '../types/github';
import { getRepositories, REQUEST_OPTIONS } from '../api/github';

export const useFetchRepository = () => {
  const [isLoading, setLoading] = useBoolean(false);
  const [data, setData] = useState<GithubUserRepositories | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | undefined>(
    undefined
  );

  const fetchUserRepositoryInfo = async (username: string) => {
    setLoading.on();
    try {
      const url = composeUrl(getRepositories(username), {});
      const response = await fetch(url, REQUEST_OPTIONS);
      if (!response.ok) throw new Error('Unable to users repositories');

      const repositories: GithubUserRepositories = await response.json();
      setData(repositories);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading.off();
    }
  };

  const onClickUser = (username: string) => {
    setSelectedUser(username);
    fetchUserRepositoryInfo(username);
  };

  return {
    data,
    isLoading,
    onClickUser,
    selectedUser
  };
};
