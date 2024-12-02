import { Octokit } from '@octokit/core';

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN
});

const searchGithubUser = async (username: string) => {
  try {
    console.log('Searching for user:', username); // Debug log
    const response = await octokit.request('GET /users/{username}', {
      username,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    if (response.status === 200 && response.data) {
      return response.data;
    }
    throw new Error('No user data returned');
  } catch (err: any) {
    console.error('GitHub API Error:', err.message); // Debug log
    if (err.status === 404) {
      throw new Error('No user found with that username');
    }
    throw new Error('Error fetching user data');
  }
};

export { searchGithubUser };