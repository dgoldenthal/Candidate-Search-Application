# GitHub Candidate Search Application

A React TypeScript application for searching and managing potential candidates using the GitHub API. This application allows recruiters or hiring managers to search for GitHub users, view their profiles, and save potential candidates for future reference.

Live Demo: [https://candidate-search-application-u219.onrender.com](https://candidate-search-application-u219.onrender.com)

## Features

- Search GitHub users by username
- View detailed user profiles including:
  - Avatar
  - Name
  - Location
  - Email
  - Company
  - Bio
  - GitHub profile link
- Save potential candidates to a local list
- View saved candidates with sorting and filtering capabilities
- Responsive design for desktop and mobile devices

## Technologies Used

- React 18
- TypeScript
- Vite
- React Router DOM
- Octokit (GitHub API client)
- CSS3 with modern features
- Local Storage for data persistence

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v14 or higher)
- npm (v6 or higher)
- A GitHub Personal Access Token

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/candidate-search-application.git
cd candidate-search-application
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `environment` folder:
```
VITE_GITHUB_TOKEN=your_github_token_here
```

4. Start the development server:
```bash
npm run dev
```

## Usage

### Home Page (Search)

- Enter a GitHub username in the search bar
- View the user's profile information
- Click "+" to save a candidate
- Click "-" to skip to the next candidate

### Saved Candidates Page

- View all saved candidates in a table format
- Sort candidates by clicking column headers
- Filter candidates using the search bar
- Remove candidates using the "-" button

## Creating a GitHub Personal Access Token

1. Go to GitHub.com and sign in
2. Click your profile picture → Settings
3. Scroll to "Developer settings" → "Personal access tokens" → "Tokens (classic)"
4. Generate new token
5. Select the following scopes:
   - read:user
   - user:email
6. Copy the token and add it to your `.env` file

## Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Deployment

The application is deployed on Render. For your own deployment:

1. Connect your GitHub repository to Render
2. Set the build command: `npm install && npm run build`
3. Set the start command: `npm run preview`
4. Add your GitHub token as an environment variable `VITE_GITHUB_TOKEN`
