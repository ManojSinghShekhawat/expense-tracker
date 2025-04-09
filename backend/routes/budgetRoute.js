const express = require("express");
const {
  creatBudget,
  getBudgets,
  deleteBudget,
  updateBudget,
} = require("../controllers/budgetController");
const router = express.Router();

router.route("/").post(creatBudget).get(getBudgets);
router.route("/:id").delete(deleteBudget).put(updateBudget);

module.exports = router;
