const express = require("express");
const router = express.Router();
const apiKeyMiddleware = require("../middleware/api-key-middleware");
const checkUserAuth = require("../middleware/auth-middleware");

const {
  getAllCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customers-controller");

router
  .get("/", checkUserAuth, getAllCustomers)
  .post("/", apiKeyMiddleware, createCustomer);
router
  .get("/:customerId", getCustomer)
  .patch("/:customerId", updateCustomer)
  .delete("/:customerId", deleteCustomer);

module.exports = router;
