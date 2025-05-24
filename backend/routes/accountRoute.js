const express = require("express");
const {
  addAccount,
  getAccounts,
  deleteAccount,
  updateAccount,
  getCreditcards,
} = require("../controllers/accountController");
const router = express.Router();
const { isAuthenticated } = require("../utils/isAuthenticated");

router.route("/add").post(isAuthenticated, addAccount);
router.route("/creditcards").get(isAuthenticated, getCreditcards);
router.route("/").get(isAuthenticated, getAccounts);

router
  .route("/:id")
  .delete(isAuthenticated, deleteAccount)
  .put(isAuthenticated, updateAccount);

module.exports = router;
