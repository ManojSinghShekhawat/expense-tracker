const BudgetModel = require("../models/budgetModel");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");

//create new budget
const creatBudget = asyncErrorHandler(async (req, res, next) => {
  const budget = new BudgetModel({ ...req.body, user: req.user.id });
  const savedBudget = await budget.save();

  res.status(201).json({
    success: true,
    savedBudget,
  });
});

//get budgets
const getBudgets = asyncErrorHandler(async (req, res, next) => {
  const budgets = await BudgetModel.find({ user: req.user.id });
  if (!budgets) {
    next(new asyncErrorHandler("No budget yet", 404));
  }

  res.status(200).json({
    success: true,
    budgets,
  });
});

//delete budget
const deleteBudget = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const deletedBudget = await BudgetModel.findByIdAndDelete(id);
  if (!deletedBudget) {
    next(new ErrorHandler("No Budget Found", 404));
  }
  return res.status(200).json({
    success: true,
    deleteBudget,
  });
});

//update budget -> Limit Only
const updateBudget = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const { limit } = req.body;
  const updatedBudget = await BudgetModel.findByIdAndUpdate(id, {
    $set: { limit: limit },
  });
  if (!updatedBudget) {
    next(new ErrorHandler("No Budget Found", 404));
  }
  return res.status(201).json({
    success: true,
    updatedBudget,
  });
});

module.exports = { creatBudget, getBudgets, deleteBudget, updateBudget };
