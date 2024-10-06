import { useState } from 'react';
import { useBoolean } from '@chakra-ui/react';

import { composeUrl } from '../utils/url';
import { getUsers, REQUEST_OPTIONS } from '../api/github';
import { GitHubSearchUsersResponse, GithubUserList } from '../types/github';

const DEFAULT_LIMIT = 12;

export const useSearchUsers = () => {
  const [isLoading, setLoading] = useBoolean(false);
  const [data, setData] = useState<GithubUserList | null>(null);

  const fetchGithubInfo = async (searchTerm: string = '') => {
    setLoading.on();
    try {
      const url = composeUrl(getUsers, {
        q: searchTerm,
        per_page: DEFAULT_LIMIT
      });

      const response = await fetch(url, REQUEST_OPTIONS);
      if (!response.ok) throw new Error('Unable to fetch users');

      const data: GitHubSearchUsersResponse = await response.json();
      setData(data.items);
    } catch (error) {
      setData(null);
    } finally {
      setLoading.off();
    }
  };
  const onClickSearch = (searchTerm: string) => fetchGithubInfo(searchTerm);

  return {
    isLoading,
    onClickSearch,
    data
  };
};
