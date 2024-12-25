const Transaction = require('../models/Transaction');

// Add Transaction
const addTransaction = async (req, res) => {
  try {
    const { type, amount, category, description, date } = req.body;
    const userId = req.user.id;

    const transaction = await Transaction.create({
      userId,
      type,
      amount,
      category,
      description,
      date,
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update Transaction
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, amount, category, description, date } = req.body;
    const userId = req.user.id;

    const transaction = await Transaction.findOne({ where: { id, userId } });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    await transaction.update({ type, amount, category, description, date });
    res.status(200).json(transaction);
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete Transaction
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const transaction = await Transaction.findOne({ where: { id, userId } });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    await transaction.destroy();
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Transactions
const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const transactions = await Transaction.findAll({
      where: { userId },
      order: [['date', 'DESC']],
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getTransactionsByUserId = async (req, res) => {
    try {
      const { userId } = req.params;  // Extract userId from route params
  
      const transactions = await Transaction.findAll({
        where: { userId },
        order: [['date', 'DESC']],  // Order by the latest transactions
      });
  
      if (!transactions || transactions.length === 0) {
        return res.status(404).json({ message: 'No transactions found for this user' });
      }
  
      res.status(200).json(transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  const getSummary = async (req, res) => {
    try {
      const userId = req.user.id;
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); // 30 days ago
  
      // Fetch all transactions from the last 30 days
      const transactions = await Transaction.findAll({
        where: {
          userId,
          date: {
            [Op.gte]: thirtyDaysAgo.toISOString().split('T')[0], // Compare with the start of the last 30 days
          },
        },
      });
  
      let totalIncome = 0;
      let totalExpenses = 0;
  
      // Calculate total income and expenses
      transactions.forEach((transaction) => {
        if (transaction.type === 'income') {
          totalIncome += parseFloat(transaction.amount);
        } else if (transaction.type === 'expense') {
          totalExpenses += parseFloat(transaction.amount);
        }
      });
  
      // Calculate balance
      const balance = totalIncome - totalExpenses;
  
      // Calculate percentage change for income and expenses
      const incomeChange = transactions.length
        ? ((totalIncome / transactions[0].amount - 1) * 100).toFixed(2)
        : 0;
  
      const expensesChange = transactions.length
        ? ((totalExpenses / transactions[0].amount - 1) * 100).toFixed(2)
        : 0;
  
      // Send the summary data
      res.status(200).json({
        balance,
        income: totalIncome,
        expenses: totalExpenses,
        incomeChange: incomeChange,
        expensesChange: expensesChange,
      });
    } catch (error) {
      console.error('Error fetching summary data:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
module.exports = {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactions,
  getTransactionsByUserId,
  getSummary,
};
