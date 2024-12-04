import React from "react";
import HeroSection from "../components/HeroSection";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  return (
    <>
      <Navbar/>
      <HeroSection />
      <div className="container my-5">
        <div className="row gy-4">
          <div className="col-md-4">
            <FeatureCard
              imgSrc="feature-icon-1.png"
              title="Track Your Spending"
              description="Easily categorize and analyze your expenses to see where your money goes."
            />
          </div>
          <div className="col-md-4">
            <FeatureCard
              imgSrc="feature-icon-2.png"
              title="Monitor Your Income"
              description="Stay on top of your earnings and always know where you stand financially."
            />
          </div>
          <div className="col-md-4">
            <FeatureCard
              imgSrc="feature-icon-3.png"
              title="Achieve Your Goals"
              description="Set and track financial goals to make your dreams a reality."
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
