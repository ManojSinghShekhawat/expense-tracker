const express = require("express");
const {
  creatBudget,
  getBudgets,
  deleteBudget,
  updateBudget,
} = require("../controllers/budgetController");
const router = express.Router();
const { isAuthenticated } = require("../utils/isAuthenticated");

router
  .route("/")
  .post(isAuthenticated, creatBudget)
  .get(isAuthenticated, getBudgets);
router
  .route("/:id")
  .delete(isAuthenticated, deleteBudget)
  .put(isAuthenticated, updateBudget);

module.exports = router;
