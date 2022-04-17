require("dotenv").config();
const statusCodes = require("http-status-codes");
const Income = require("../models/Income");
const jwt = require("jsonwebtoken");
const { BadRequestError, NotFoundError } = require("../errors");
const User = require("../models/User");

const getAllIncomes = async (req, res) => {
  const { sort, name, dateFrom, dateTo } = req.query;
  const filtersObject = {};

  if (name) filtersObject.name = { $regex: name, $options: "i" };
  if (dateFrom || dateTo)
    filtersObject.createdAt = { $gte: dateFrom, $lte: dateTo };

  let result = Income.find(filtersObject);

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
  const count = await Income.find(filtersObject); // getting the number of all incomes for pagination
  const incomes = await result.limit(limit).skip(skip);
  res.status(statusCodes.OK).json({
    count: count.length,
    currentEurBalance: user.eurBalance,
    currentMdlBalance: user.mdlBalance,
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
  const token = req.headers.authorization.split(" ")[1];
  const newUser = updateUserBalance(
    "create",
    token,
    income.currencyType,
    income.sum
  );
  newUser.then((response) => {
    let eurBalance = response.eurBalance;
    let mdlBalance = response.mdlBalance;
    res.status(statusCodes.CREATED).json({
      msg: `Income created successfully with id ${income._id}`,
      currentEurBalance: eurBalance,
      currentMdlBalance: mdlBalance,
    });
  });
};

const updateIncome = async (req, res) => {
  const { incomeId } = req.params;
  const oldIncome = await Income.findById({ _id: incomeId });
  if (!oldIncome) {
    throw new NotFoundError(`No Income with id ${incomeId}`);
  }

  const updatedIncome = await Income.findByIdAndUpdate(
    { _id: incomeId },
    req.body,
    { new: true, runValidators: true }
  );
  const token = req.headers.authorization.split(" ")[1];
  const newUser = updateUserBalance(
    "update",
    token,
    updatedIncome.currencyType,
    updatedIncome.sum,
    oldIncome.sum
  );
  newUser.then((response) => {
    let eurBalance = response.eurBalance;
    let mdlBalance = response.mdlBalance;
    res.status(statusCodes.OK).json({
      msg: "Income updated successfully",
      currentData: updatedIncome,
      currentEurBalance: eurBalance,
      currentMdlBalance: mdlBalance,
    });
  });
};

const deleteIncome = async (req, res) => {
  const { incomeId } = req.params;

  const income = await Income.findById({ _id: incomeId });
  if (!income) {
    throw new NotFoundError(`No income with id ${incomeId}`);
  }
  await Income.findByIdAndRemove({ _id: incomeId });
  const token = req.headers.authorization.split(" ")[1];
  const newUser = updateUserBalance(
    "delete",
    token,
    income.currencyType,
    income.sum
  ).then((response) => {
    let eurBalance = response.eurBalance;
    let mdlBalance = response.mdlBalance;
    res.status(statusCodes.OK).json({
      msg: "Income deleted successfully",
      currentEurBalance: eurBalance,
      currentMdlBalance: mdlBalance,
    });
  });
};

const updateUserBalance = async (
  action,
  token,
  incomeCurrencyType,
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
  if (incomeCurrencyType === "eur") {
    if (action === "create") {
      balance = user.eurBalance + sum;
    }
    if (action === "update") {
      balance = balance = user.eurBalance - previousSum + sum;
    }
    if (action === "delete") {
      balance = user.eurBalance - sum;
    }
    updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { eurBalance: balance },
      { new: true }
    );
  }
  if (incomeCurrencyType === "mdl") {
    if (action === "create") {
      balance = user.mdlBalance + sum;
    }

    if (action === "update") {
      balance = balance = user.mdlBalance - previousSum + sum;
    }

    if (action === "delete") {
      balance = user.mdlBalance - sum;
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
  getAllIncomes,
  getIncome,
  createIncome,
  updateIncome,
  deleteIncome,
};
