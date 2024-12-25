import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { signup } from "../Services/authService"; // Import the signup function

const SignUpModal = ({ show, handleClose }) => {
  // Form state
  const [username, setUsername] = useState(""); // Updated from 'name' to 'username'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value); // Updated from 'name' to 'username'
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value); // Handle confirm password change
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error message

    // Check if passwords match
    if (password !== confirmPassword) {
      setLoading(false);
      setError("Passwords do not match.");
      return; // Stop form submission if passwords don't match
    }

    try {
      const userData = { username, email, password }; // Updated from 'name' to 'username'
      await signup(userData); // Call signup service
      setLoading(false);
      handleClose(); // Close the modal after successful signup
    } catch (err) {
      setLoading(false);
      setError(err.message); // Set error if signup fails
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>} {/* Display error message */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              name="username" // Updated from 'name' to 'username'
              value={username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={handleChange}
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
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
