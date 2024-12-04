import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBarDash"; // Navbar component
import LandingPage from "./pages/LandingPage"; // Landing page component
import Footer from "./components/Footer"; // Footer component
import Dashboard from "./components/Dashboard/Dashboard"; // Dashboard component
import AddTransaction from "./components/AddTransaction/AddTransaction"; // AddTransaction component
import TransactionHistory from "./components/TransactionHistory/TransactionHistory"; // TransactionHistory component
import ProfileSettings from "./components/Settings/ProfileSettings"; // ProfileSettings component
import { Outlet } from "react-router-dom"; // For rendering child routes

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Dashboard Route with child routes */}
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar /> {/* Navbar will be visible only on dashboard and its children */}
              <Outlet /> {/* Child routes will be rendered here */}
            </>
          }
        >
          {/* Nested Routes under the dashboard */}
          <Route index element={<Dashboard />} /> {/* Default Dashboard route */}
          <Route path="add-transaction" element={<AddTransaction />} />
          <Route path="transactions" element={<TransactionHistory />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>
      </Routes>

      {/* Footer will be displayed after the landing page and dashboard */}
      <Footer />
    </Router>
  );
}

export default App;
