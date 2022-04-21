const Comment = require("../models/comment");
const statusCodes = require("http-status-codes");

const createComment = async (req, res, next) => {
  const comment = await Comment.create(req.body);

  res.status(statusCodes.OK).json({ comment });
};

const getComments = async (req, res, next) => {
  const parentId = req.params.parentId;
  const comments = await Comment.find({ parentId: parentId });

  res.status(statusCodes.OK).json({ comments });
};

module.exports = {
  createComment,
  getComments,
};
