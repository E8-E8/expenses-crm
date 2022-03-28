const express = require('express');
const router = express.Router();

const {getAllExpenses, getExpense, createExpense, updateExpense, deleteExpense} = require('../controllers/expenses-controller')

router.get('/', getAllExpenses).post('/', createExpense)
router.get('/:expenseId', getExpense).patch('/:expenseId', updateExpense).delete('/:expenseId', deleteExpense)

module.exports = router 