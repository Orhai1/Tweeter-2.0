import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

export default function Profile() {
  const [name, setName] = useState(
    () => localStorage.getItem("username")
  );
  const navigate = useNavigate();

  function handleSave() {
    localStorage.setItem("username", name);
    navigate("/");
  }

  return (
    <div className="container">
      <h1 className="profile-title">Profile</h1>

      <form className="profile-form" onSubmit={handleSave}>
        <label className="profile-label">User Name</label>
        <input
          className="profile-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="profile-save" type="submit">Save</button>
      </form>

      <p className="profile-hint">
      </p>
    </div>
  );
}
