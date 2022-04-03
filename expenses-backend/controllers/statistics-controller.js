require("dotenv").config();
const statusCodes = require("http-status-codes");
const Income = require("../models/Income");
const Expense = require("../models/Expense");
const Company = require("../models/Company");

const getIncomesStatistics = async (req, res) => {
  const { dateFrom, dateTo } = req.query;
  const dateObject = {};

  if (dateFrom || dateTo)
    dateObject.createdAt = { $gte: dateFrom, $lte: dateTo };

  const incomes = await Income.find(dateObject);
  let incomesStatistics = [];
  let found = false;

  incomes.forEach((income) => {
    incomesStatistics.forEach((incomeStatistic) => {
      if (incomeStatistic.date == income.createdAt.toDateString()) {
        incomeStatistic.sum += income.sum;
        found = true;
      }
    });
    if (!found) {
      incomesStatistics.push({
        date: income.createdAt.toDateString(),
        sum: income.sum,
      });
    }
    found = false;
  });

  res.status(statusCodes.OK).json({ incomesStatistics });
};

const getExpensesStatistics = async (req, res) => {
  const { dateFrom, dateTo } = req.query;
  const dateObject = {};

  if (dateFrom || dateTo)
    dateObject.createdAt = { $gte: dateFrom, $lte: dateTo };

  const expenses = await Expense.find(dateObject);
  let expensesStatistics = [];
  let found = false;

  expenses.forEach((expense) => {
    expensesStatistics.forEach((expenseStatistic) => {
      if (expenseStatistic.date == expense.createdAt.toDateString()) {
        expenseStatistic.sum += expense.sum;
        found = true;
      }
    });
    if (!found) {
      expensesStatistics.push({
        date: expense.createdAt.toDateString(),
        sum: expense.sum,
      });
    }
    found = false;
  });

  res.status(statusCodes.OK).json({ expensesStatistics });
};

const getProfitStatistics = async (req, res) => {
  const { dateFrom, dateTo } = req.query;
  const dateObject = {};

  if (dateFrom || dateTo)
    dateObject.createdAt = { $gte: dateFrom, $lte: dateTo };

  const expenses = await Expense.find(dateObject);
  const incomes = await Income.find(dateObject);
  let incomesStatistics = [];
  let expensesStatistics = [];
  let profitStatistics = [];
  let found = false;

  expenses.forEach((expense) => {
    expensesStatistics.forEach((expenseStatistic) => {
      if (expenseStatistic.date == expense.createdAt.toDateString()) {
        expenseStatistic.sum += expense.sum;
        found = true;
      }
    });
    if (!found) {
      expensesStatistics.push({
        date: expense.createdAt.toDateString(),
        sum: expense.sum,
      });
    }
    found = false;
  });

  incomes.forEach((income) => {
    incomesStatistics.forEach((incomeStatistic) => {
      if (incomeStatistic.date == income.createdAt.toDateString()) {
        incomeStatistic.sum += income.sum;
        found = true;
      }
    });
    if (!found) {
      incomesStatistics.push({
        date: income.createdAt.toDateString(),
        sum: income.sum,
      });
    }
    found = false;
  });

  expensesStatistics.forEach((expensesStatistic) => {
    incomesStatistics.forEach((incomeStatistic) => {
      if (expensesStatistic.date == incomeStatistic.date) {
        let profit = incomeStatistic.sum - expensesStatistic.sum;
        profitStatistics.push({
          date: incomeStatistic.date,
          profit: profit,
        });
      }
      found = true;
    });

    if (!found) {
      profitStatistics.push({
        date: expensesStatistic.date,
        profit: Number(expensesStatistic.sum) * -1,
      });
    }
  });

  res.status(statusCodes.OK).json({ profitStatistics });
};

const getBalance = async (req, res) => {
  const company = await Company.findById(process.env.COMPANY_ID);
  res.status(statusCodes.OK).json({ balance: company.balance });
};

module.exports = {
  getExpensesStatistics,
  getIncomesStatistics,
  getProfitStatistics,
  getBalance,
};
