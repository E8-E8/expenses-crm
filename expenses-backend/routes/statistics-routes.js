const express = require("express");
const router = express.Router();

const {
  getIncomesStatistics,
  getExpensesStatistics,
  getProfitStatistics,
} = require("../controllers/statistics-controller");

router.get("/expenses", getExpensesStatistics);
router.get("/incomes", getIncomesStatistics);
router.get("/profit", getProfitStatistics);

module.exports = router;
