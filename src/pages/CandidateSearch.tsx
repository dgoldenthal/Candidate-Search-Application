import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/candidate.interface';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchNextCandidate = async () => {
    setLoading(true);
    try {
      const users = await searchGithub();
      if (users.length > 0) {
        const userData = await searchGithubUser(users[0].login);
        setCurrentCandidate(userData);
      }
    } catch (err) {
      console.error('Error fetching candidate:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNextCandidate();
  }, []);

  const handleAccept = () => {
    if (currentCandidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      localStorage.setItem(
        'savedCandidates',
        JSON.stringify([...savedCandidates, currentCandidate])
      );
      fetchNextCandidate();
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container">
      <h1>Candidate Search</h1>
      {currentCandidate && (
        <div className="candidate-card">
          <img 
            src={currentCandidate.avatar_url} 
            alt={`${currentCandidate.login}'s avatar`}
            className="candidate-image"
          />
          <h2>{currentCandidate.login}({currentCandidate.login})</h2>
          <p>Location: {currentCandidate.location || 'Not specified'}</p>
          <p>Email: <a href={`mailto:${currentCandidate.email}`}>{currentCandidate.email || 'Not specified'}</a></p>
          <p>Company: {currentCandidate.company || 'Not specified'}</p>
          <p>Bio: {currentCandidate.bio || 'Not specified'}</p>
          <div className="button-container">
            <button onClick={fetchNextCandidate} className="reject-button">−</button>
            <button onClick={handleAccept} className="accept-button">+</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;