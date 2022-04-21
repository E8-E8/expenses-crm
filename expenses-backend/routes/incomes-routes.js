const express = require("express");
const router = express.Router();

const {
  getAllIncomes,
  getIncome,
  createIncome,
  updateIncome,
  deleteIncome,
} = require("../controllers/incomes-controller");

router.get("/", getAllIncomes).post("/", createIncome);
router
  .get("/:prospectId", getIncome)
  .patch("/:prospectId", updateIncome)
  .delete("/:prospectId", deleteIncome);

module.exports = router;
