import React from "react";

const AddTransaction = () => {
  return (
    <div className="container my-4">
      <h2 className="fw-bold">Add a Transaction</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Transaction Type</label>
          <select className="form-select" id="type">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input type="number" className="form-control" id="amount" />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <input type="text" className="form-control" id="category" />
        </div>
        <button type="submit" className="btn btn-primary">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
