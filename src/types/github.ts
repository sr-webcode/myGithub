// Type for a GitHub user in search results
export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
}

export type GithubUserList = GitHubUser[];

export interface GitHubSearchUsersResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GithubUserList;
}

export type GithubUserRepository = {
  id: number;
  name: string;
  stargazers_count: number;
  watchers_count: number;
};

export type GithubIssue = {
  id: number;
  title: string;
  created_at: string;
  user: GitHubUser;
};

export type GithubIssues = GithubIssue[];

export type GithubUserRepositories = GithubUserRepository[];
