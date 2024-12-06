import React, { useState } from "react";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleSignUpClose = () => setShowSignUp(false);
  const handleSignUpShow = () => setShowSignUp(true);

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-3">
        <a className="navbar-brand">
          <img src="logo-placeholder.png" alt="App Logo" className="me-2" />
          <span>Finance Tracker</span>
        </a>
        <div className="ms-auto">
          <button className="btn btn-outline-primary me-2" onClick={handleLoginShow}>
            Log In
          </button>
          <button className="btn btn-primary" onClick={handleSignUpShow}>
            Sign Up
          </button>
        </div>
      </nav>

      {/* Modals */}
      <SignUpModal show={showSignUp} handleClose={handleSignUpClose} />
      <LoginModal show={showLogin} handleClose={handleLoginClose} />
    </>
  );
};

export default Navbar;
