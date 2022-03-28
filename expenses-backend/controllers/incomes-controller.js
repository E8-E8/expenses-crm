require("dotenv").config();
const statusCodes = require("http-status-codes");
const Income = require("../models/Income");
const Company = require("../models/Company");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllIncomes = async (req, res) => {
  const { sort, name } = req.query;
  const filtersObject = {};

  if (name) filtersObject.name = { $regex: name, $options: "i" };

  const incomes = await Income.find(filtersObject).sort(sort);
  const company = await Company.findById({ _id: process.env.COMPANY_ID });
  res.status(statusCodes.OK).json({
    currentBalance: company.balance,
    count: incomes.length,
    incomes,
  });
};

const getIncome = async (req, res) => {
  const { incomeId } = req.params;
  const income = await Income.findById({ _id: incomeId });
  if (!income) {
    throw new NotFoundError(`No Income with id ${incomeId}`);
  }
  res.status(statusCodes.OK).json({ income });
};

const createIncome = async (req, res) => {
  const income = await Income.create({ ...req.body });

  const company = await Company.findById({ _id: process.env.COMPANY_ID });
  const balance = company.balance + income.sum;

  const updatedCompany = await Company.findByIdAndUpdate(
    { _id: process.env.COMPANY_ID },
    { balance: balance },
    { new: true }
  );

  res.status(statusCodes.CREATED).json({
    msg: `Income created successfully with id ${income._id}`,
    currentBalance: updatedCompany.balance,
  });
};

const updateIncome = async (req, res) => {
  const { incomeId } = req.params;
  const oldIncome = await Income.findByIdAndUpdate(
    { _id: incomeId },
    req.body,
    {
      runValidators: true,
    }
  );

  if (!oldIncome) {
    throw new NotFoundError(`No Income with id ${incomeId}`);
  }

  const updatedIncome = await Income.findById({ _id: incomeId });
  const company = await Company.findById({ _id: process.env.COMPANY_ID });
  const balance = company.balance - oldIncome.sum + updatedIncome.sum;

  const updatedCompany = await Company.findByIdAndUpdate(
    { _id: process.env.COMPANY_ID },
    { balance: balance },
    { new: true }
  );

  res.status(statusCodes.OK).json({
    msg: "Income updated successfully",
    currentData: updatedIncome,
    currentBalance: updatedCompany.balance,
  });
};

const deleteIncome = async (req, res) => {
  const { incomeId } = req.params;

  const income = await Income.findById({ _id: incomeId });
  if (!income) {
    throw new NotFoundError(`No income with id ${incomeId}`);
  }

  const company = await Company.findById({ _id: process.env.COMPANY_ID });
  const balance = company.balance - income.sum;

  const updatedCompany = await Company.findByIdAndUpdate(
    { _id: process.env.COMPANY_ID },
    { balance: balance },
    { new: true }
  );

  await Income.findByIdAndRemove({ _id: incomeId });
  res.status(statusCodes.OK).json({
    msg: "Income deleted successfully",
    currentBalance: updatedCompany.balance,
  });
};

module.exports = {
  getAllIncomes,
  getIncome,
  createIncome,
  updateIncome,
  deleteIncome,
};
