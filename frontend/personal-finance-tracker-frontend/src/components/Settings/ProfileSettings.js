import React, { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../../Services/profileServices"; // Import API methods

const ProfileSettings = () => {
  const [profile, setProfile] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getUserProfile();
        setProfile({ username: userData.username, email: userData.email });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateUserProfile({
        username: profile.username,
        email: profile.email,
      }); // Removed the unused variable assignment
      setSuccessMessage("Profile updated successfully!");
      setError(null);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setSuccessMessage("");
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container my-4">
      <h2 className="fw-bold">Profile Settings</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={profile.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={profile.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;
