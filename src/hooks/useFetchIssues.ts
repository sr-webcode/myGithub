import { useState } from 'react';
import { getIssues, REQUEST_OPTIONS } from '../api/github';
import { GithubIssues } from '../types/github';
import { composeUrl } from '../utils/url';
import { useBoolean } from '@chakra-ui/react';

type IssueFetchParams = {
  owner: string;
  repositoryTitle: string;
};

export const useFetchIssues = () => {
  const [isLoading, setLoading] = useBoolean(false);
  const [data, setData] = useState<GithubIssues | null>(null);

  const fetchRepositoryIssues = async ({
    owner,
    repositoryTitle
  }: IssueFetchParams) => {
    setLoading.on();
    try {
      const url = composeUrl(getIssues({ owner, repo: repositoryTitle }), {});
      const response = await fetch(url, REQUEST_OPTIONS);
      if (!response.ok) throw new Error('Unable to users repositories');

      const githubIssues: GithubIssues = await response.json();
      setData(githubIssues);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading.off();
    }
  };

  const onFetchIssues = (params: IssueFetchParams) => {
    fetchRepositoryIssues(params);
  };

  return {
    data,
    isLoading,
    onFetchIssues
  };
};
