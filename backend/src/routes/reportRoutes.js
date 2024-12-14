const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Route for Income Statement
router.get('/income-statement', reportController.generateIncomeStatement);

// Route for Cash Flow Statement
router.get('/cash-flow', reportController.generateCashFlowStatement);

// Route for Balance Sheet
router.get('/balance-sheet', reportController.generateBalanceSheet);

module.exports = router;
