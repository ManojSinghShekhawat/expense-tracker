const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const accountSchema = new Schema(
  {
    user: {
      type: Types.ObjectId, // Use Types.ObjectId
      ref: "User", // Ref should be a string: the model name
      // required: true,        // Optional but recommended
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Account = model("Account", accountSchema);

module.exports = Account;
