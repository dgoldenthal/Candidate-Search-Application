import { Octokit } from '@octokit/core';

// Add debug logging to check token
console.log('Token exists:', !!import.meta.env.VITE_GITHUB_TOKEN);
console.log('Token first few characters:', import.meta.env.VITE_GITHUB_TOKEN?.slice(0, 4));

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN
});

const searchGithubUser = async (username: string) => {
  try {
    console.log('Attempting to search for:', username);
    console.log('Using token:', !!octokit.auth); // Will log true/false if token exists
    
    const response = await octokit.request('GET /users/{username}', {
      username,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    console.log('API Response status:', response.status);
    console.log('API Response exists:', !!response.data);

    if (response.status === 200 && response.data) {
      return response.data;
    }
    throw new Error('No user data returned');
  } catch (err: any) {
    console.error('Full error:', err);
    if (err.status === 404) {
      throw new Error('No user found with that username');
    }
    if (err.status === 401) {
      throw new Error('Authentication error - check GitHub token');
    }
    throw new Error(`Error fetching user data: ${err.message}`);
  }
};

export { searchGithubUser };