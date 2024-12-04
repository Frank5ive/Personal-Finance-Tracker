import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-3">
      <Link className="navbar-brand" to="/dashboard">
        <img src="logo-placeholder.png" alt="App Logo" className="me-2" />
        Finance Tracker
      </Link>
      <ul className="nav ms-auto">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link text-dark">
            Overview
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/transactions" className="nav-link text-dark">
            Transactions
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/add-transaction" className="nav-link text-dark">
            Add Transaction
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/settings" className="nav-link text-dark">
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
