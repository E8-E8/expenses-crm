const express = require("express");
const router = express.Router();

const {
  getAllMessages,
  editMessage,
  createMessage,
  deleteMessage,
} = require("../controllers/messages-controller");

router.get("/", getAllMessages).post("/", createMessage);
router.patch("/:messageId", editMessage).delete("/:messageId", deleteMessage);

module.exports = router;
