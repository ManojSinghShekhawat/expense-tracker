const express = require("express");
const {
  addAccount,
  getAccounts,
  deleteAccount,
  updateAccount,
  getCreditcards,
} = require("../controllers/accountController");
const router = express.Router();

router.route("/add").post(addAccount);
router.route("/creditcards").get(getCreditcards);
router.route("/").get(getAccounts);
router.route("/:id").delete(deleteAccount).put(updateAccount);

module.exports = router;
