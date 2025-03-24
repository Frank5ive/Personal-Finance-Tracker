const Transaction = require('../models/Transaction');
const exportHelper = require('../utils/exportHelper');
const { plotGraph } = require('../utils/plotHelper'); // Graph plotting utility

// Income Statement - Calculates Revenues, Expenses, and Net Income for a given period
exports.generateIncomeStatement = async (req, res) => {
  try {
    const { startDate, endDate, format } = req.query;

    // Fetch transactions within the date range for the user
    const transactions = await Transaction.find({
      userId: req.user.id,
      date: { $gte: startDate, $lte: endDate },
    });

    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const netIncome = income - expenses;

    // Prepare report data
    const report = {
      title: `Income Statement from ${startDate} to ${endDate}`,
      income,
      expenses,
      netIncome
    };

    // Prepare graph data
    const graphData = {
      dates: transactions.map(t => t.date),
      amounts: transactions.map(t => t.amount),
      type: 'Income/Expense'
    };

    // Plot the graph
    const graphPath = await plotGraph(graphData, 'income-expense-trend');

    if (format && ['csv', 'pdf', 'json'].includes(format.toLowerCase())) {
      return exportHelper.exportReport(format, report, res, graphPath);
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate Income Statement' });
  }
};

// Cash Flow Statement - Calculates cash inflows and outflows for a given period
exports.generateCashFlowStatement = async (req, res) => {
  try {
    const { startDate, endDate, format } = req.query;

    // Fetch transactions within the date range for the user
    const transactions = await Transaction.find({
      userId: req.user.id,
      date: { $gte: startDate, $lte: endDate },
    });

    const cashInflows = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const cashOutflows = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const netCashFlow = cashInflows - cashOutflows;

    // Prepare report data
    const report = {
      title: `Cash Flow Statement from ${startDate} to ${endDate}`,
      cashInflows,
      cashOutflows,
      netCashFlow
    };

    // Prepare graph data
    const graphData = {
      dates: transactions.map(t => t.date),
      inflows: transactions.filter(t => t.type === 'income').map(t => t.amount),
      outflows: transactions.filter(t => t.type === 'expense').map(t => t.amount),
      type: 'Cash Flow'
    };

    // Plot the graph
    const graphPath = await plotGraph(graphData, 'cash-flow-trend');

    if (format && ['csv', 'pdf', 'json'].includes(format.toLowerCase())) {
      return exportHelper.exportReport(format, report, res, graphPath);
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate Cash Flow Statement' });
  }
};

// Balance Sheet - Calculates Assets, Liabilities, and Equity
exports.generateBalanceSheet = async (req, res) => {
  try {
    const { date, format } = req.query;

    // Fetch transactions up to the given date for the user
    const transactions = await Transaction.find({
      userId: req.user.id,
      date: { $lte: date },
    });

    const assets = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const liabilities = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const equity = assets - liabilities;

    // Prepare report data
    const report = {
      title: `Balance Sheet as of ${date}`,
      assets,
      liabilities,
      equity
    };

    // Prepare graph data
    const graphData = {
      dates: transactions.map(t => t.date),
      assets: transactions.filter(t => t.type === 'income').map(t => t.amount),
      liabilities: transactions.filter(t => t.type === 'expense').map(t => t.amount),
      type: 'Balance Sheet'
    };

    // Plot the graph
    const graphPath = await plotGraph(graphData, 'balance-sheet-trend');

    if (format && ['csv', 'pdf', 'json'].includes(format.toLowerCase())) {
      return exportHelper.exportReport(format, report, res, graphPath);
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate Balance Sheet' });
  }
};
