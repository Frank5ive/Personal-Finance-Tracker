import React from "react";

const OverviewCards = () => {
  return (
    <div className="row gy-4 mt-4">
      <div className="col-md-4">
        <div className="card p-3">
          <h5 className="card-title">Balance</h5>
          <p className="balance-text">$5,502.45</p>
          <small className="positive-change">+12.5%</small>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card p-3">
          <h5 className="card-title">Incomes</h5>
          <p className="balance-text">$9,450.00</p>
          <small className="positive-change">+27%</small>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card p-3">
          <h5 className="card-title">Expenses</h5>
          <p className="balance-text">$3,947.55</p>
          <small className="negative-change">-8%</small>
        </div>
      </div>
    </div>
  );
};

export default OverviewCards;
