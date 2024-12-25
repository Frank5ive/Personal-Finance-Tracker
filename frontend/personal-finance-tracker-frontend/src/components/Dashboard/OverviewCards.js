import React, { useEffect, useState } from "react";
import { getSummary } from "../../Services/transactionService";

const OverviewCards = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getSummary();
        setSummary(data || {});
      } catch (error) {
        console.error("Error fetching summary:", error.message);
        setSummary(null);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="row gy-4 mt-4">
      {summary ? (
        <>
          <div className="col-md-4">
            <div className="card p-3">
              <h5 className="card-title">Balance</h5>
              <p className="balance-text">${summary.balance || 0}</p>
              <small className={summary.incomeChange > 0 ? "positive-change" : "negative-change"}>
                {summary.incomeChange > 0
                  ? `+${summary.incomeChange}%`
                  : `-${Math.abs(summary.expensesChange)}%`}
              </small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3">
              <h5 className="card-title">Incomes</h5>
              <p className="balance-text">${summary.income || 0}</p>
              <small className="positive-change">{summary.incomeChange || 0}%</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3">
              <h5 className="card-title">Expenses</h5>
              <p className="balance-text">${summary.expenses || 0}</p>
              <small className="negative-change">{summary.expensesChange || 0}%</small>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center">No data available for Overview Cards.</p>
      )}
    </div>
  );
};

export default OverviewCards;
