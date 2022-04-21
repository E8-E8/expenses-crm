const express = require("express");
const router = express.Router();

const {
  getAllCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customers-controller");

router.get("/", getAllCustomers).post("/", createCustomer);
router
  .get("/:customerId", getCustomer)
  .patch("/:customerId", updateCustomer)
  .delete("/:customerId", deleteCustomer);

module.exports = router;
