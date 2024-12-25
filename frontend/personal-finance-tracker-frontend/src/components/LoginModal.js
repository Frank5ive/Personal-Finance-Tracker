import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { login } from "../Services/authService"; // Import login function

const LoginModal = ({ show, handleClose }) => {
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error message

    try {
      const credentials = { email, password };
      await login(credentials); // Call login service, no need to store response

      setLoading(false);

      // If login is successful, navigate to the dashboard
      handleClose(); // Close modal after successful login
      navigate("/dashboard"); // Redirect to Dashboard
    } catch (err) {
      setLoading(false);
      console.log("Error during login:", err); // Log error to the console
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>} {/* Display error message */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Logging In..." : "Log In"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
