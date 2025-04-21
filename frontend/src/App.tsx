import { Route, Routes, Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import EntertainerPage from './pages/EntertainerPage';
import NewEntertainerForm from './components/NewEntertainer';
import EntertainerDetailsPage from './pages/EntertainerDetailsPage';
import EditEntertainerForm from './components/EditEntertainer';
import { entertainer } from './types/Entertainers';
import { fetchEntertainerById } from './api/EntertainerAPI';

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/">Entertainment Agency</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/entertainers">Entertainers</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/entertainers" element={<EntertainerPage />} />
          <Route path="/entertainer/:id" element={<EntertainerDetailsPage />} />
          <Route path="/add-entertainer" element={<NewEntertainerFormWrapper />} />
          <Route path="/edit-entertainer/:id" element={<EditEntertainerWrapper />} />
        </Routes>
      </div>
    </>
  );
}

// ✅ INLINE NewEntertainerForm wrapper
function NewEntertainerFormWrapper() {
  const navigate = useNavigate();
  return (
    <NewEntertainerForm
      onSuccess={() => navigate('/entertainers')}
      onCancel={() => navigate('/entertainers')}
    />
  );
}

// ✅ INLINE EditEntertainer wrapper
function EditEntertainerWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entertainer, setEntertainer] = useState<entertainer | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEntertainer = async () => {
      try {
        const data = await fetchEntertainerById(Number(id));
        setEntertainer(data);
      } catch {
        setError("Failed to load entertainer.");
      }
    };

    loadEntertainer();
  }, [id]);

  if (error) return <p className="text-danger">{error}</p>;
  if (!entertainer) return <p>Loading entertainer...</p>;

  return (
    <EditEntertainerForm
      entertainer={entertainer}
      onSuccess={() => navigate(`/entertainer/${entertainer.entertainerId}`)}
      onCancel={() => navigate(`/entertainer/${entertainer.entertainerId}`)}
    />
  );
}

export default App;
