const Message = require("../models/Message");
const statusCodes = require("http-status-codes");

const getAllMessages = async (req, res) => {
  const messages = await Message.find({});
  res.status(statusCodes.OK).json(messages);
};

const createMessage = async (req, res) => {
  const message = await Message.create(req.body);
  res.status(statusCodes.OK).json(message);
};

const deleteMessage = async (req, res) => {
  const message = await Message.findByIdAndDelete(req.params.messageId);
  if (!message) {
    return res.status(statusCodes.NOT_FOUND).json({
      message: "Message not found",
    });
  }

  res.status(statusCodes.OK).json(message);
};

const editMessage = async (req, res) => {
  const message = await Message.findByIdAndUpdate(
    { _id: req.params.messageId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!message) {
    return res.status(statusCodes.NOT_FOUND).json({
      message: "Message not found",
    });
  }

  res.status(statusCodes.OK).json(message);
};

module.exports = {
  getAllMessages,
  createMessage,
  deleteMessage,
  editMessage,
};
