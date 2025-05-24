const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const budgetSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String, // e.g., "Groceries", "Travel", "Shopping"
      required: true,
    },
    limit: {
      type: Number, // Budget limit for the category
      // required: true,
    },
    period: {
      type: String,
      enum: ["monthly", "weekly", "yearly", "custom"],
      default: "monthly",
    },
    startDate: {
      type: Date, // For custom budgets
    },
    endDate: {
      type: Date, // For custom budgets
    },
    // account: {
    //   type: Types.ObjectId, // Optional: budget tied to a specific account
    //   ref: "Account",
    // },
    spent: {
      type: Number,
      default: 0,
    },
    availableBalance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Budget = model("Budget", budgetSchema);
module.exports = Budget;
