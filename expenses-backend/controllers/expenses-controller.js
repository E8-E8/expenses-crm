require("dotenv").config();
const statusCodes = require("http-status-codes");
const Expense = require("../models/Expense");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const { BadRequestError, NotFoundError } = require("../errors");

const getAllExpenses = async (req, res) => {
  const { sort, name, dateFrom, dateTo } = req.query;
  const filtersObject = {};

  if (name) filtersObject.name = { $regex: name, $options: "i" };
  if (dateFrom || dateTo)
    filtersObject.createdAt = { $gte: dateFrom, $lte: dateTo };

  let result = Expense.find(filtersObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("-createdAt");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const { userId } = jwt.decode(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );

  const user = await User.findById({ _id: userId });
  const count = await Expense.find(filtersObject);
  const expenses = await result.limit(limit).skip(skip);
  res.status(statusCodes.OK).json({
    currentEurBalance: user.eurBalance,
    currentMdlBalance: user.mdlBalance,
    count: count.length,
    expenses,
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
  const token = req.headers.authorization.split(" ")[1];
  const newUser = updateUserBalance(
    "create",
    token,
    expense.currencyType,
    expense.sum
  );
  newUser.then((response) => {
    let eurBalance = response.eurBalance;
    let mdlBalance = response.mdlBalance;
    res.status(statusCodes.CREATED).json({
      msg: `Expense created successfully with id ${expense._id}`,
      currentEurBalance: eurBalance,
      currentMdlBalance: mdlBalance,
    });
  });
};

const updateExpense = async (req, res) => {
  const { expenseId } = req.params;
  const oldExpense = await Expense.findById({ _id: expenseId });
  if (!oldExpense) {
    throw new NotFoundError(`No expense with id ${expenseId}`);
  }

  const updatedExpense = await Expense.findByIdAndUpdate(
    { _id: expenseId },
    req.body,
    { new: true, runValidators: true }
  );
  const token = req.headers.authorization.split(" ")[1];
  const newUser = updateUserBalance(
    "update",
    token,
    updatedExpense.currencyType,
    updatedExpense.sum,
    oldExpense.sum
  );
  newUser.then((response) => {
    let eurBalance = response.eurBalance;
    let mdlBalance = response.mdlBalance;
    res.status(statusCodes.OK).json({
      msg: "Expense updated successfully",
      currentData: updatedExpense,
      currentEurBalance: eurBalance,
      currentMdlBalance: mdlBalance,
    });
  });
};

const deleteExpense = async (req, res) => {
  const { expenseId } = req.params;
  const expense = await Expense.findById({ _id: expenseId });
  if (!expense) {
    throw new NotFoundError(`No expense with id ${expenseId}`);
  }

  await Expense.findByIdAndRemove({ _id: expenseId });
  const token = req.headers.authorization.split(" ")[1];

  updateUserBalance("delete", token, expense.currencyType, expense.sum);

  res.status(statusCodes.OK).json({
    msg: "Expense deleted successfully",
    currentEurBalance: expense.eurBalance,
    currentMdlBalance: expense.mdlBalance,
  });
};

const updateUserBalance = async (
  action,
  token,
  currencyType,
  sum,
  previousSum
) => {
  const { userId } = await jwt.decode(token, process.env.JWT_SECRET);

  const user = await User.findById({ _id: userId });
  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`);
  }
  let balance;
  let updatedUser;
  if (currencyType === "eur") {
    if (action === "create") {
      balance = user.eurBalance - sum;
    }
    if (action === "update") {
      balance = balance = user.eurBalance + previousSum - sum;
    }
    if (action === "delete") {
      balance = user.eurBalance + sum;
    }
    updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { eurBalance: balance },
      { new: true }
    );
  }
  if (currencyType === "mdl") {
    if (action === "create") {
      balance = user.mdlBalance - sum;
    }

    if (action === "update") {
      balance = balance = user.mdlBalance + previousSum - sum;
    }

    if (action === "delete") {
      balance = user.mdlBalance + sum;
    }

    updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { mdlBalance: balance },
      { new: true }
    );
  }

  return updatedUser;
};

module.exports = {
  getAllExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
