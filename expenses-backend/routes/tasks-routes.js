const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  markTasksAsSeen,
} = require("../controllers/tasks-controller");

router.get("/", getAllTasks).post("/", createTask);
router
  .get("/:taskId", getTask)
  .patch("/:taskId", updateTask)
  .delete("/:taskId", deleteTask);

router.put("/seen", markTasksAsSeen);

module.exports = router;
