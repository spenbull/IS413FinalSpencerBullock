import { useEffect, useState } from 'react';
import { Summary } from '../types/Summary';
import { useNavigate } from 'react-router-dom';
import { fetchEntertainerSummaries } from '../api/EntertainerAPI';

function EntertainerPage() {
  const [entertainers, setEntertainers] = useState<Summary[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSummaries = async () => {
      try {
        setLoading(true);
        const data = await fetchEntertainerSummaries();
        setEntertainers(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadSummaries();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading entertainers...</p>;
  if (error) return <p className="text-danger text-center mt-5">Error: {error}</p>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Entertainers</h1>
        <button
          className="btn btn-outline-secondary"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          Sort: {sortOrder === 'asc' ? 'A → Z' : 'Z → A'}
        </button>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
        {[...entertainers]
          .sort((a, b) =>
            sortOrder === 'asc'
              ? a.stageName.localeCompare(b.stageName)
              : b.stageName.localeCompare(a.stageName)
          )
          .map((entertainer) => (
            <div key={entertainer.entertainerId} className="col">
              <div className="card h-100 border border-secondary">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title mb-2">{entertainer.stageName}</h5>
                    <p className="mb-1"><strong>Bookings:</strong> {entertainer.bookingCount}</p>
                    <p className="mb-2"><strong>Last Booked:</strong> {entertainer.lastBookingDate ?? 'N/A'}</p>
                  </div>
                  <div className="mt-auto">
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => navigate(`/entertainer/${entertainer.entertainerId}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="text-center mt-5">
        <button
          className="btn btn-success btn-lg"
          onClick={() => navigate('/add-entertainer')}
        >
          ➕ Add Entertainer
        </button>
      </div>
      <br /><br />
    </div>
  );
}

export default EntertainerPage;
