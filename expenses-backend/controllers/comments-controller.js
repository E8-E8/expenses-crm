const Comment = require("../models/Comment");
const statusCodes = require("http-status-codes");
const jwt = require("jsonwebtoken");

const createComment = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1]; //getting the token
  const decoded = jwt.decode(token, process.env.JWT_SECRET); // decoding the token

  const comment = await Comment.create({
    ...req.body,
    createdBy: decoded.userId,
    createdByName: decoded.name,
  });

  res.status(statusCodes.OK).json({ comment });
};

const getComments = async (req, res) => {
  const parentId = req.params.parentId;
  const comments = await Comment.find({ parentId: parentId });

  res.status(statusCodes.OK).json({ comments });
};

module.exports = {
  createComment,
  getComments,
};
