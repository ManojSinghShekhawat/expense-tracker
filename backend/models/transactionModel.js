const mongoose = require("mongoose");
const { Types } = mongoose;

const transactionSchema = new mongoose.Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: Number,
  category: String,
  type: { type: String, enum: ["income", "expense"] },
  description: String,
  date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
