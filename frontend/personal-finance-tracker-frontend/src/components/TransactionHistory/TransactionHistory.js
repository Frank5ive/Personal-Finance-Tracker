import React from "react";

const TransactionHistory = () => {
  return (
    <div className="container my-4">
      <h2 className="fw-bold">Transaction History</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024-01-01</td>
            <td>Income</td>
            <td>Salary</td>
            <td>$5,000</td>
          </tr>
          {/* Add more rows dynamically */}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
