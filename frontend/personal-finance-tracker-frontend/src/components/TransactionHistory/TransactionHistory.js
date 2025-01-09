import React, { useState, useEffect } from "react";
import { getTransactionsByUserId } from "../../Services/transactionService";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await getTransactionsByUserId(user.id);
        // Log the response to confirm the data structure
        console.log("Transactions fetched:", response);
        setTransactions(response); // Assuming `response` is the array of transactions
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container my-4">
      <h2 className="fw-bold">Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
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
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td>{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
                <td>{transaction.category}</td>
                <td>${transaction.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionHistory;
