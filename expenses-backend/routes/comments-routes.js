const express = require("express");
const router = express.Router();

const {
  getComments,
  createComment,
} = require("../controllers/comments-controller");

router.get("/:parentId", getComments).post("/", createComment);

module.exports = router;
