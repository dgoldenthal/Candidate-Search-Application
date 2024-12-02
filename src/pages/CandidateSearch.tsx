import { useState } from 'react';
import { searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/candidate.interface';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      const userData = await searchGithubUser(searchQuery);
      if ('login' in userData) {
        setCurrentCandidate(userData as Candidate);
      } else {
        setError('No user found with that username');
      }
    } catch (err) {
      setError('Error fetching user data');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = () => {
    if (currentCandidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      localStorage.setItem(
        'savedCandidates',
        JSON.stringify([...savedCandidates, currentCandidate])
      );
      setCurrentCandidate(null);
      setSearchQuery('');
    }
  };

  return (
    <div className="container">
      <h1>Candidate Search</h1>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter GitHub username"
          className="search-input"
          required
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <div className="loading">Searching...</div>}
      
      {error && <div className="error">{error}</div>}

      {currentCandidate && (
        <div className="candidate-card">
          <img 
            src={currentCandidate.avatar_url} 
            alt={`${currentCandidate.login}'s avatar`}
            className="candidate-image"
          />
          <h2>{currentCandidate.name || currentCandidate.login}</h2>
          <p className="username">({currentCandidate.login})</p>
          <p>Location: {currentCandidate.location || 'Not specified'}</p>
          <p>Email: {currentCandidate.email || 'Not specified'}</p>
          <p>Company: {currentCandidate.company || 'Not specified'}</p>
          <p>Bio: {currentCandidate.bio || 'Not specified'}</p>
          <a 
            href={currentCandidate.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="profile-link"
          >
            View GitHub Profile
          </a>
          <div className="button-container">
            <button onClick={() => setCurrentCandidate(null)} className="reject-button">−</button>
            <button onClick={handleAccept} className="accept-button">+</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;