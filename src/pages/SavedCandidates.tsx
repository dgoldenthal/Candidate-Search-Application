import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  return (
    <div className="container">
      <h1>Potential Candidates</h1>
      <table className="candidates-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>
                <img 
                  src={candidate.avatar_url} 
                  alt={`${candidate.login}'s avatar`}
                  className="table-avatar"
                />
              </td>
              <td>
                {candidate.login}
                <br />
                <span className="username">({candidate.login})</span>
              </td>
              <td>{candidate.location || 'Not specified'}</td>
              <td>
                <a href={`mailto:${candidate.email}`}>{candidate.email || 'Not specified'}</a>
              </td>
              <td>{candidate.company || 'Not specified'}</td>
              <td>{candidate.bio || 'Not specified'}</td>
              <td>
                <button className="reject-button">−</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCandidates;