import React, { useEffect, useState } from "react";
import OverviewCards from "./OverviewCards";
import ChartsSection from "./ChartsSection";
import QuickActions from "./QuickActions";
import { getUserProfile } from "../../Services/profileServices"; // Import profile service

const Dashboard = () => {
  const [username, setUsername] = useState("User"); // Default username

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUsername(profile.username); // Assuming 'name' exists in the response
        console.log(profile);
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="container my-4">
      <h2 className="fw-bold">Hello, {username}</h2>

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
