import React from "react";
import OverviewCards from "./OverviewCards";
import ChartsSection from "./ChartsSection";
import QuickActions from "./QuickActions";

const Dashboard = () => {
  return (
    <div className="container my-4">
      <h2 className="fw-bold">Hello, User!</h2>

      {/* Overview Section */}
      <OverviewCards />

      {/* Expenses and Transactions */}
      <div className="row gy-4 mt-4">
        <ChartsSection />
        <QuickActions />
      </div>
    </div>
  );
};

export default Dashboard;
