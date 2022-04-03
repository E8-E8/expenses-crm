const express = require("express");
const router = express.Router();

const {
  getIncomesStatistics,
  getExpensesStatistics,
  getProfitStatistics,
  getBalance,
} = require("../controllers/statistics-controller");

router.get("/expenses", getExpensesStatistics);
router.get("/incomes", getIncomesStatistics);
router.get("/profit", getProfitStatistics);
router.get("/balance", getBalance);

module.exports = router;
