import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const QuickActions = () => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [modalContent, setModalContent] = useState(""); // State to control modal content

  // Function to handle button clicks and set the modal content
  const handleActionClick = (action) => {
    setModalContent(action);
    setShowModal(true);
  };

  // Function to close the modal
  const handleClose = () => setShowModal(false);

  // Function to handle form submission (mock function)
  const handleSubmit = () => {
    alert(`${modalContent} submitted!`);
    setShowModal(false); // Close the modal after submission
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

      {/* Modal for displaying forms */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Content of the modal based on the selected action */}
          {modalContent === "Add Income" && (
            <div>
              <label>Amount</label>
              <input type="number" className="form-control" placeholder="Enter amount" />
              <label>Description</label>
              <input type="text" className="form-control" placeholder="Enter description" />
            </div>
          )}

          {modalContent === "Add Expense" && (
            <div>
              <label>Amount</label>
              <input type="number" className="form-control" placeholder="Enter amount" />
              <label>Description</label>
              <input type="text" className="form-control" placeholder="Enter description" />
            </div>
          )}

          {modalContent === "View Reports" && (
            <div>
              <p>Generate financial reports here.</p>
              {/* Placeholder content, you can add dynamic reports logic here */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default QuickActions;
