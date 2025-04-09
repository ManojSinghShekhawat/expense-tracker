const TransactionModel = require("../models/transactionModel");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");

// date range function to get month wise transaction
const getMonthRange = (monthOffSet = 0) => {
  const date = new Date();
  const firstDate = new Date(
    date.getFullYear(),
    date.getMonth() + monthOffSet,
    1
  );
  const lastDate = new Date(
    date.getFullYear(),
    date.getMonth() + monthOffSet + 1,
    0
  );
  return { firstDate, lastDate };
};
//adding tranaction
const addTransaction = asyncErrorHandler(async (req, res) => {
  const newTransaction = new TransactionModel(req.body);

  const savedTransaction = await newTransaction.save();

  return res.status(201).json({
    success: true,
    savedTransaction,
  });
});
// ---------------------------------------------------------------------------------------------
//delete a transcation
const deleteTransaction = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const deletedTranscation = await TransactionModel.findByIdAndDelete(id);
  if (!deletedTranscation) {
    return next(new ErrorHandler("No Such Transaction Found", 404));
  }
  return res.status(200).json({
    success: true,
    message: "transaction deleted",
  });
});

// --------------------------------------------------------------------------------------------------
// update a transaction
const updateTransaction = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const transaction = await TransactionModel.findById(id);
  if (!transaction) {
    return next(new ErrorHandler("No Such Transaction Found", 404));
  }
  const updatedTransaction = await TransactionModel.findByIdAndUpdate(
    id,
    req.body
  );
  return res.status(200).json({
    success: true,
    message: "transaction Updated",
    updateTransaction,
  });
});

// ---------------------------------------------------------------------------------------------------
// get a transaction
const getTransaction = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const tranaction = await TransactionModel.findById(id);
  if (!tranaction) {
    return next(new ErrorHandler("No Such Transaction Found", 404));
  }
  return res.status(200).json({
    success: true,
    tranaction,
  });
});

// ---------------------------------------------------------------------------------------------------
// get all transaction
const getAllTransaction = asyncErrorHandler(async (req, res, next) => {
  const tranactions = await TransactionModel.find();
  if (!tranactions) {
    return next(new ErrorHandler("No Such Transaction Found", 404));
  }
  return res.status(200).json({
    success: true,
    tranactions,
  });
});

// ---------------------------------------------------------------------------------------------------
// get filtered transactions
const getFilterTransaction = asyncErrorHandler(async (req, res, next) => {
  const { from, to, type } = req.body;
  const query = {};
  if (from) query.date = { ...query.date, $gte: from };
  if (to) query.date = { ...query.date, $lte: to };
  if (type) query.type = type;
  const transactions = await TransactionModel.find(query);

  if (!transactions) {
    return next(new ErrorHandler("No Such Transaction Found", 404));
  }
  return res.status(200).json({
    success: true,
    transactions,
  });
});

// ----------------------------------------------------------------------------------------------------
// get balance (total income and total expense)
const getTransactions = async (monthOffSet = 0) => {
  const { firstDate, lastDate } = getMonthRange(monthOffSet);
  const transactions = await TransactionModel.find({
    date: { $gte: firstDate, $lte: lastDate },
  });
  return {
    income: transactions.filter((t) => t.type === "income"),
    expense: transactions.filter((t) => t.type === "expense"),
  };
};

const getBalance = asyncErrorHandler(async (req, res, next) => {
  const currentMonthTrans = await getTransactions(0);
  const lastMonthTrans = await getTransactions(-1);

  const income = await TransactionModel.find({ type: "income" });
  const expense = await TransactionModel.find({ type: "expense" });
  const totalIncome =
    income.length != 0 ? income.reduce((sum, doc) => sum + doc.amount, 0) : 0;
  const totalExpense =
    expense.length != 0 ? expense.reduce((sum, doc) => sum + doc.amount, 0) : 0;

  const { income: currentMonthIncome, expense: currentMonthExpense } =
    currentMonthTrans;
  const { income: lastMonthIncome, expense: lastMonthExpense } = lastMonthTrans;

  const currentMonthTotalIncome =
    currentMonthIncome.length != 0
      ? currentMonthIncome.reduce((sum, doc) => sum + doc.amount, 0)
      : 0;
  const currentMontTotalExpense =
    currentMonthExpense != 0
      ? currentMonthExpense.reduce((sum, doc) => sum + doc.amount, 0)
      : 0;

  const lastMonthTotalIncome =
    lastMonthIncome.length != 0
      ? lastMonthIncome.reduce((sum, doc) => sum + doc.amount, 0)
      : 0;
  const lastMonthTotalExpense =
    lastMonthExpense != 0
      ? lastMonthExpense.reduce((sum, doc) => sum + doc.amount, 0)
      : 0;

  return res.status(200).json({
    success: true,
    currentMonthTotalIncome,
    currentMontTotalExpense,
    lastMonthTotalIncome,
    lastMonthTotalExpense,
    totalIncome,
    totalExpense,
  });
});

// ------------------------------------------------------------------------------------------------------
// get last7days transection
const get7DaysTransactions = asyncErrorHandler(async (req, res, next) => {
  const today = new Date();
  const todayMinusSix = new Date();
  todayMinusSix.setDate(todayMinusSix.getDate() - 6);
  todayMinusSix.setHours(0, 0, 0, 0);

  const tranactions = await TransactionModel.find({
    date: { $gte: todayMinusSix, $lte: today },
  });
  res.status(200).json({
    success: true,
    tranactions,
  });
});

module.exports = {
  addTransaction,
  deleteTransaction,
  updateTransaction,
  getTransaction,
  getBalance,
  get7DaysTransactions,
  getAllTransaction,
  getFilterTransaction,
};
