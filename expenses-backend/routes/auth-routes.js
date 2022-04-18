const express = require("express");
const router = express.Router();

const {
  login,
  register,
  getUsers,
  getUser,
  updateUser,
} = require("../controllers/auth-controller");

router.post("/login", login);
router.post("/register", register);
router
  .patch("/users/:id", updateUser)
  .get("/users", getUsers)
  .get("/users/:id", getUser);

module.exports = router;
