const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactions,
  getTransactionsByUserId,
  getSummary,
} = require('../controllers/transactionController');

const router = express.Router();

router.post('/add', protect, addTransaction);
router.put('/update/:id', protect, updateTransaction);
router.delete('/delete/:id', protect, deleteTransaction);
router.get("/list", protect, getTransactions);
router.get("/summary", protect, getSummary);

// New Route: Get All Transactions by User ID
router.get("/user/:userId", protect, getTransactionsByUserId);

module.exports = router;
