import { useState } from "react";
import { entertainer } from "../types/Entertainers";
import { updateEntertainer } from "../api/EntertainerAPI";

interface EditEntertainerFormProps {
  entertainer: entertainer;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditEntertainerForm = ({ entertainer, onSuccess, onCancel }: EditEntertainerFormProps) => {
  const [formData, setFormData] = useState<entertainer>({ ...entertainer });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateEntertainer(formData.entertainerId, formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2 className="mb-3">Edit Entertainer</h2>

      {[
        { label: "Stage Name", name: "entStageName" },
        { label: "SSN", name: "entSSN" },
        { label: "Street Address", name: "entStreetAddress" },
        { label: "City", name: "entCity" },
        { label: "State", name: "entState" },
        { label: "Zip Code", name: "entZipCode" },
        { label: "Phone Number", name: "entPhoneNumber" },
        { label: "Web Page", name: "entWebPage" },
        { label: "Email Address", name: "entEMailAddress" },
        { label: "Date Entered", name: "dateEntered", type: "date" }
      ].map(({ label, name, type = "text" }) => (
        <div className="mb-3" key={name}>
          <label className="form-label">
            {label}:
            <input
              type={type}
              name={name}
              value={(formData as any)[name]}
              onChange={handleChange}
              className="form-control"
              required
            />
          </label>
        </div>
      ))}

      <button type="submit" className="btn btn-primary me-2">Update Entertainer</button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      <br /><br />
    </form>
  );
};

export default EditEntertainerForm;
