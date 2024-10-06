export type RepoParams = {
  owner: string;
  repo: string;
};

export const GITHUB_API_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN;
export const GITHUB_BASE_URL = 'https://api.github.com';
export const REQUEST_OPTIONS: RequestInit = {
  headers: {
    Authorization: `token ${GITHUB_API_TOKEN}`
  }
};

export const getUsers = `${GITHUB_BASE_URL}/search/users`;

export const getRepositories = (userName: string): string => {
  return `${GITHUB_BASE_URL}/users/${userName}/repos`;
};

export const getIssues = ({ owner, repo }: RepoParams): string => {
  return `${GITHUB_BASE_URL}/repos/${owner}/${repo}/issues`;
};

export const createIssue = (params: RepoParams): string => {
  return getIssues(params);
};
