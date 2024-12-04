import React from "react";

const FeatureCard = ({ imgSrc, title, description }) => {
  return (
    <div className="card border-0 shadow-sm text-center p-4">
      <img src={imgSrc} alt={title} className="card-img-top mx-auto" style={{ height: "64px", width: "64px" }} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text text-secondary">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
