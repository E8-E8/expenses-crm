const Customer = require("../models/Customer");
const statusCodes = require("http-status-codes");

const getCustomer = async (req, res) => {
  const { customerId } = req.params;
  const customer = await Customer.findById(customerId);

  res.status(statusCodes.OK).json({ customer });
};

const getAllCustomers = async (req, res) => {
  const { sort, name } = req.query;
  const filtersObject = {};

  if (name) filtersObject.name = { $regex: name, $options: "i" };

  let result = Customer.find(filtersObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("-createdAt");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const customers = await result.limit(limit).skip(skip);

  res.status(statusCodes.OK).json({ count: customers.length, customers });
};

const updateCustomer = async (req, res) => {
  const customerId = req.params.customerId;
  const customer = await Customer.findByIdAndUpdate(
    { _id: customerId },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(statusCodes.OK).json({ customer });
};

const createCustomer = async (req, res) => {
  const customer = await Customer.create({ ...req.body });
  res.status(statusCodes.OK).json({ customer });
};

const deleteCustomer = async (req, res) => {
  const { customerId } = req.params;
  const customer = await Customer.findByIdAndDelete({ _id: customerId });
  res.status(statusCodes.OK).json({ customer });
};

module.exports = {
  getCustomer,
  getAllCustomers,
  updateCustomer,
  createCustomer,
  deleteCustomer,
};
