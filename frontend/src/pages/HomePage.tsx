import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f8f9fa',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <h1 className="mb-3 fw-bold text-dark">🎭 Welcome to the Entertainment Agency</h1>
      <p className="lead text-secondary mb-4">
        Browse and manage potential entertainers for your next big event.
      </p>
      <Link to="/entertainers" className="btn btn-primary btn-lg">
        View Entertainers
      </Link>
    </div>
  );
};

export default HomePage;
