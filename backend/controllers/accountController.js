const AccountModel = require("../models/accountModel");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");

//add new account
const addAccount = asyncErrorHandler(async (req, res, next) => {
  const newAccount = new AccountModel(req.body);
  const createdAccount = await newAccount.save();

  return res.status(201).json({
    success: true,
    createdAccount,
  });
});

//get accounts
const getAccounts = asyncErrorHandler(async (req, res, next) => {
  const accounts = await AccountModel.find();
  return res.status(200).json({
    success: true,
    accounts,
  });
});

//delete account
const deleteAccount = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const deletedAccount = await AccountModel.findByIdAndDelete(id);
  if (!deletedAccount) {
    return next(new ErrorHandler("No such account found", 404));
  }
  return res.status(201).json({
    success: true,
    deletedAccount,
  });
});

//update account only balance
const updateAccount = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const { balance } = req.body;
  const updatedAccount = await AccountModel.findByIdAndUpdate(id, {
    $set: { balance: balance },
  });

  return res.status(201).json({
    success: true,
    updatedAccount,
  });
});

//get accounts
const getCreditcards = asyncErrorHandler(async (req, res, next) => {
  const cerditCards = await AccountModel.find({ type: "creditCard" });
  return res.status(200).json({
    success: true,
    cerditCards,
  });
});

module.exports = {
  addAccount,
  getAccounts,
  deleteAccount,
  updateAccount,
  getCreditcards,
};
