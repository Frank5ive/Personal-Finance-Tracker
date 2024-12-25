import React, { useState } from "react";
import { addTransaction } from "../../Services/transactionService";

const AddTransaction = () => {
  // State for form inputs
  const [transactionType, setTransactionType] = useState("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null); // Clear previous messages

    // Create the transaction object
    const transactionData = {
      type: transactionType,
      amount: parseFloat(amount), // Ensure the amount is a number
      category,
    };

    try {
      // Call the backend API
      const response = await addTransaction(transactionData);
      setMessage({ type: "success", text: response.message || "Transaction added successfully!" });

      // Reset form inputs
      setTransactionType("income");
      setAmount("");
      setCategory("");
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  return (
    <div className="container my-4">
      <h2 className="fw-bold">Add a Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Transaction Type</label>
          <select
            className="form-select"
            id="type"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Transaction</button>
      </form>

      {/* Display success or error messages */}
      {message && (
        <div
          className={`alert mt-3 ${message.type === "success" ? "alert-success" : "alert-danger"}`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default AddTransaction;