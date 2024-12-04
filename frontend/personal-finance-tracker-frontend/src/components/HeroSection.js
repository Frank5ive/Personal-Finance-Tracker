import React from "react";

const HeroSection = () => {
  return (
    <section className="hero-section bg-light text-center py-5">
      <div className="container">
        <h1 className="display-4 fw-bold">Take Control of Your Finances</h1>
        <p className="lead text-secondary">
          Track your spending, monitor your income, and achieve your financial goals with ease.
        </p>
        <div className="mt-4">
          <a href="#" className="btn btn-primary btn-lg me-2">
            Get Started
          </a>
          <a href="#" className="btn btn-outline-secondary btn-lg">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
