import { Octokit } from '@octokit/core';

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN
});

const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await octokit.request('GET /users', {
      since: start,
      per_page: 1,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Invalid API response');
  } catch (err) {
    console.error('An error occurred:', err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await octokit.request('GET /users/{username}', {
      username,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Invalid API response');
  } catch (err) {
    console.error('An error occurred:', err);
    return {};
  }
};

export { searchGithub, searchGithubUser };