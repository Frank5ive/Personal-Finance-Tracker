import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { getIncomeStatement, getCashFlowStatement, getBalanceSheet } from "../../Services/reportService"; // Adjust the import path if needed

const ChartsSection = () => {
  const [incomeStatement, setIncomeStatement] = useState(null);
  const [cashFlowStatement, setCashFlowStatement] = useState(null);
  const [balanceSheet, setBalanceSheet] = useState(null);

  const getLastMonthDates = () => {
    const now = new Date();
    const firstDayOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    return {
      startDate: firstDayOfLastMonth.toISOString().split("T")[0],
      endDate: lastDayOfLastMonth.toISOString().split("T")[0],
    };
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { startDate, endDate } = getLastMonthDates();
        const format = "json";
        
        const incomeData = await getIncomeStatement(startDate, endDate, format);
        const cashFlowData = await getCashFlowStatement(startDate, endDate, format);
        const balanceData = await getBalanceSheet(endDate, format);

        setIncomeStatement(incomeData || {});
        setCashFlowStatement(cashFlowData || {});
        setBalanceSheet(balanceData || {});
      } catch (error) {
        console.error("Error fetching reports:", error.message);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="col-md-12">
      <div className="card p-3">
        <h5 className="card-title">Financial Reports for Last Month</h5>
        <Carousel>
          <Carousel.Item>
            <h5>Income Statement</h5>
            <div className="chart-placeholder">
              {incomeStatement && Object.keys(incomeStatement).length > 0 ? (
                <>
                  <p>Income: ${incomeStatement.income}</p>
                  <p>Expenses: ${incomeStatement.expenses}</p>
                  <p>Net Income: ${incomeStatement.netIncome}</p>
                </>
              ) : (
                <p>No Income Statement data available.</p>
              )}
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <h5>Cash Flow Statement</h5>
            <div className="chart-placeholder">
              {cashFlowStatement && Object.keys(cashFlowStatement).length > 0 ? (
                <>
                  <p>Cash Inflows: ${cashFlowStatement.cashInflows}</p>
                  <p>Cash Outflows: ${cashFlowStatement.cashOutflows}</p>
                  <p>Net Cash Flow: ${cashFlowStatement.netCashFlow}</p>
                </>
              ) : (
                <p>No Cash Flow Statement data available.</p>
              )}
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <h5>Balance Sheet</h5>
            <div className="chart-placeholder">
              {balanceSheet && Object.keys(balanceSheet).length > 0 ? (
                <>
                  <p>Assets: ${balanceSheet.assets}</p>
                  <p>Liabilities: ${balanceSheet.liabilities}</p>
                  <p>Equity: ${balanceSheet.equity}</p>
                </>
              ) : (
                <p>No Balance Sheet data available.</p>
              )}
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default ChartsSection;
