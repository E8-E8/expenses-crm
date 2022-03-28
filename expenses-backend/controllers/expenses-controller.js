require("dotenv").config();
const statusCodes = require("http-status-codes");
const Expense = require("../models/Expense");
const Company = require("../models/Company");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllExpenses = async (req, res) => {
  const { sort, name } = req.query;
  const filtersObject = {};

  if (name) filtersObject.name = { $regex: name, $options: "i" };

  const expenses = await Expense.find(filtersObject).sort(sort);
  const company = await Company.findById({ _id: process.env.COMPANY_ID });
  res.status(statusCodes.OK).json({
    count: expenses.length,
    expenses,
    currentBalance: company.balance,
  });
};

const getExpense = async (req, res) => {
  const { expenseId } = req.params;
  const expense = await Expense.findById({ _id: expenseId });
  if (!expense) {
    throw new NotFoundError(`No expense with id ${expenseId}`);
  }
  res.status(statusCodes.OK).json({ expense });
};

const createExpense = async (req, res) => {
  const expense = await Expense.create({ ...req.body });

  const company = await Company.findById({ _id: process.env.COMPANY_ID });
  const balance = company.balance - expense.sum;

  const updatedCompany = await Company.findByIdAndUpdate(
    { _id: process.env.COMPANY_ID },
    { balance: balance },
    { new: true }
  );

  res.status(statusCodes.CREATED).json({
    msg: `Expense created successfully with id ${expense._id}`,
    expenseId: expense._id,
    currentBalance: updatedCompany.balance,
  });
};

const updateExpense = async (req, res) => {
  const { expenseId } = req.params;

  const oldExpense = await Expense.findByIdAndUpdate(
    { _id: expenseId },
    req.body,
    {
      runValidators: true,
    }
  );

  if (!oldExpense) {
    throw new NotFoundError(`No Income with id ${expenseId}`);
  }

  const updatedExpense = await Expense.findById({ _id: expenseId });
  const company = await Company.findById({ _id: process.env.COMPANY_ID });
  const balance = company.balance + oldExpense.sum - updatedExpense.sum;

  const updatedCompany = await Company.findByIdAndUpdate(
    { _id: process.env.COMPANY_ID },
    { currentBalance: balance },
    { new: true }
  );

  res.status(statusCodes.OK).json({
    msg: "Expense updated successfully",
    currentData: updatedExpense,
    currentBalance: updatedCompany.balance,
  });
};

const deleteExpense = async (req, res) => {
  const { expenseId } = req.params;
  const expense = await Expense.findById({ _id: expenseId });
  if (!expense) {
    throw new NotFoundError(`No expense with id ${expenseId}`);
  }

  const company = await Company.findById({ _id: process.env.COMPANY_ID });
  const balance = company.balance + expense.sum;

  const updatedCompany = await Company.findByIdAndUpdate(
    { _id: process.env.COMPANY_ID },
    { currentBalance: balance },
    { new: true }
  );

  await Expense.findByIdAndRemove({ _id: expenseId });

  res.status(statusCodes.OK).json({
    msg: "Expense deleted successfully",
    currentBalance: updatedCompany.balance,
  });
};

module.exports = {
  getAllExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
