const express = require('express');
const router = express.Router();

const {getAllIncomes, getIncome, createIncome, updateIncome, deleteIncome} = require('../controllers/incomes-controller')

router.get('/', getAllIncomes).post('/', createIncome)
router.get('/:incomeId', getIncome).patch('/:incomeId', updateIncome).delete('/:incomeId', deleteIncome)

module.exports = router 