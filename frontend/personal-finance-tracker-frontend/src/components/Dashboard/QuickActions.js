import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { addTransaction, getSummary } from "../../Services/transactionService";

const QuickActions = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [reports, setReports] = useState(null);
  const [message, setMessage] = useState(null);

  const handleActionClick = (action) => {
    setModalContent(action);
    setShowModal(true);
    setMessage(null);
    if (action === "View Reports") {
      fetchReports();
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setAmount("");
    setDescription("");
    setReports(null);
  };

  const fetchReports = async () => {
    try {
      const summary = await getSummary();
      setReports(summary || {});
    } catch (error) {
      setReports(null);
      setMessage({ type: "error", text: "Error fetching reports." });
    }
  };

  const handleSubmit = async () => {
    setMessage(null);
    if (modalContent === "Add Income" || modalContent === "Add Expense") {
      const transactionData = {
        type: modalContent === "Add Income" ? "income" : "expense",
        amount: parseFloat(amount),
        category: description,
      };

      try {
        await addTransaction(transactionData);
        setMessage({ type: "success", text: "Transaction added successfully!" });
        handleClose();
      } catch (error) {
        setMessage({ type: "error", text: error.message });
      }
    }
  };

  return (
    <div className="col-md-6">
      <div className="card p-3">
        <h5 className="card-title">Quick Actions</h5>
        <div className="d-grid gap-3">
          <button
            className="btn btn-success"
            onClick={() => handleActionClick("Add Income")}
          >
            Add Income
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleActionClick("Add Expense")}
          >
            Add Expense
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleActionClick("View Reports")}
          >
            View Reports
          </button>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent === "Add Income" || modalContent === "Add Expense" ? (
            <div>
              <label>Amount</label>
              <input
                type="number"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          ) : modalContent === "View Reports" ? (
            reports ? (
              Object.keys(reports).length > 0 ? (
                <>
                  <p>Total Income: ${reports.totalIncome}</p>
                  <p>Total Expense: ${reports.totalExpense}</p>
                  <p>Net Balance: ${reports.netBalance}</p>
                </>
              ) : (
                <p>No report data available.</p>
              )
            ) : (
              <p>Loading reports...</p>
            )
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {(modalContent === "Add Income" || modalContent === "Add Expense") && (
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {message && (
        <div className={`alert mt-3 ${message.type === "success" ? "alert-success" : "alert-danger"}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default QuickActions;
