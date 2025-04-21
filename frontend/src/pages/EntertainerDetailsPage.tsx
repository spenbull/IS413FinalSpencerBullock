import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { entertainer } from '../types/Entertainers';
import { deleteEntertainer, fetchEntertainerById } from '../api/EntertainerAPI';

const EntertainerDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entertainer, setEntertainer] = useState<entertainer | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEntertainer = async () => {
      try {
        const data = await fetchEntertainerById(Number(id));
        setEntertainer(data);
      } catch (err) {
        setError('Failed to load entertainer');
      }
    };

    loadEntertainer();
  }, [id]);

  if (error) return <p className="text-danger text-center mt-4">{error}</p>;
  if (!entertainer) return <p className="text-center mt-4">Loading entertainer...</p>;

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this entertainer?");
    if (!confirmDelete) return;

    try {
      await deleteEntertainer(id);
      alert("Entertainer deleted successfully.");
      navigate('/entertainers');
    } catch (error) {
      alert("Failed to delete entertainer. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 fw-bold">Entertainer Details</h1>

      <div className="card border border-secondary">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Stage Name:</strong> {entertainer.entStageName}
          </li>
          <li className="list-group-item">
            <strong>SSN:</strong> {entertainer.entSSN}
          </li>
          <li className="list-group-item">
            <strong>Address:</strong> {entertainer.entStreetAddress}, {entertainer.entCity}, {entertainer.entState} {entertainer.entZipCode}
          </li>
          <li className="list-group-item">
            <strong>Phone:</strong> {entertainer.entPhoneNumber}
          </li>
          <li className="list-group-item">
            <strong>Web Page:</strong> {entertainer.entWebPage}
          </li>
          <li className="list-group-item">
            <strong>Email:</strong> {entertainer.entEMailAddress}
          </li>
          <li className="list-group-item">
            <strong>Date Entered:</strong> {entertainer.dateEntered}
          </li>
        </ul>
      </div>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <button
          className="btn btn-warning"
          onClick={() => navigate(`/edit-entertainer/${entertainer.entertainerId}`)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(entertainer.entertainerId)}
        >
          Delete
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate('/entertainers')}
        >
          ← Back to List
        </button>
      </div>
    </div>
  );
};

export default EntertainerDetailsPage;
