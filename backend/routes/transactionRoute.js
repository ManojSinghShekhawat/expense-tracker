const express = require("express");
const {
  addTransaction,
  deleteTransaction,
  updateTransaction,
  getTransaction,
  getBalance,
  get7DaysTransactions,
  getAllTransaction,
  getFilterTransaction,
  getYearBalance,
} = require("../controllers/transactionController");
const { isAuthenticated } = require("../utils/isAuthenticated");

// const deleteTransaction = require("../controllers/transactionController");
const router = express.Router();

router.route("/").get(isAuthenticated, getAllTransaction);
router
  .route("/filteredtransactions")
  .post(isAuthenticated, getFilterTransaction);
router.route("/new").post(isAuthenticated, addTransaction);
router.route("/balance").get(isAuthenticated, getBalance);
router.route("/last7days").get(isAuthenticated, get7DaysTransactions);
router.route("/year").get(isAuthenticated, getYearBalance);
router
  .route("/:id")
  .get(getTransaction)
  .put(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;
