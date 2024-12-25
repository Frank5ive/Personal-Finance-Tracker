import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/NavBarDash"; // Navbar component
import LandingPage from "./pages/LandingPage"; // Landing page component
import Footer from "./components/Footer"; // Footer component
import Dashboard from "./components/Dashboard/Dashboard"; // Dashboard component
import AddTransaction from "./components/AddTransaction/AddTransaction"; // AddTransaction component
import TransactionHistory from "./components/TransactionHistory/TransactionHistory"; // TransactionHistory component
import ProfileSettings from "./components/Settings/ProfileSettings"; // ProfileSettings component
import { Outlet } from "react-router-dom"; // Import Outlet

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem("authToken"); // Check if the user is logged in
  return authToken ? children : <Navigate to="/" replace />; // Redirect to landing page if not authenticated
};

// Layout for dashboard-related routes
const DashboardLayout = () => (
  <>
    <Navbar /> {/* Navbar always visible in dashboard */}
    <div className="container mt-4">
      <Outlet /> {/* Renders child routes */}
    </div>
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route: Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected Routes: Dashboard and its children */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout /> {/* Renders the Navbar and child routes */}
            </ProtectedRoute>
          }
        >
          {/* Child Routes under the dashboard */}
          <Route index element={<Dashboard />} /> {/* Default dashboard route */}
          <Route path="add-transaction" element={<AddTransaction />} />
          <Route path="transactions" element={<TransactionHistory />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>
      </Routes>

      {/* Footer Component */}
      <Footer />
    </Router>
  );
}

export default App;
