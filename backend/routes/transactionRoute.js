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
} = require("../controllers/transactionController");

// const deleteTransaction = require("../controllers/transactionController");
const router = express.Router();

router.route("/").get(getAllTransaction);
router.route("/filteredtransactions").post(getFilterTransaction);
router.route("/new").post(addTransaction);
router.route("/balance").get(getBalance);
router.route("/last7days").get(get7DaysTransactions);
router
  .route("/:id")
  .get(getTransaction)
  .put(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;
