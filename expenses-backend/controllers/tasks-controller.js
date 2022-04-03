require("dotenv").config();
const statusCodes = require("http-status-codes");
const Task = require("../models/Task");
const { BadRequestError, NotFoundError } = require("../errors");
const jwt = require("jsonwebtoken");

const getAllTasks = async (req, res) => {
  const { seen } = req.query;
  const searchObject = {};
  const token = req.headers.authorization.split(" ")[1]; //getting the token
  const decoded = jwt.decode(token, process.env.JWT_SECRET); // decoding the token

  if (seen) searchObject.seen = seen;
  if (decoded.userId) searchObject.createdFor = decoded.userId;

  const tasks = await Task.find(searchObject).sort("-createdAt");

  res.status(statusCodes.OK).json({ tasks, count: tasks.length });
};

const getTask = async (req, res) => {};

const createTask = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1]; //getting the token
  const decoded = jwt.decode(token, process.env.JWT_SECRET); // decoding the token

  const task = await Task.create({
    ...req.body,
    createdBy: decoded.userId,
    createdByName: decoded.name,
  });

  res.status(statusCodes.CREATED).json({ task });
};

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.findByIdAndUpdate(
    { _id: taskId },
    { ...req.body },
    { new: true }
  );
  if (!task) {
    throw new NotFoundError(`No task with id ${taskId}`);
  }
  res.status(statusCodes.OK).json({ task });
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.findByIdAndDelete({ _id: taskId });
  if (!task) {
    throw new NotFoundError(`No task with id ${taskId}`);
  }
  res.status(statusCodes.OK).json({ msg: "Task deleted successfully" });
};

const markTasksAsSeen = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1]; //getting the token
  const decoded = jwt.decode(token, process.env.JWT_SECRET); // decoding the token

  const tasks = await Task.updateMany(
    { seen: false, createdFor: decoded.userId },
    { seen: true }
  );
  res.status(statusCodes.OK).json({ msg: "tasks updated successfully" });
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  markTasksAsSeen,
};
