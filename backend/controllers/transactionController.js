const TransactionModel = require("../models/transactionModel");
const AccountModel = require("../models/accountModel");
const BudgetModel = require("../models/budgetModel");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");
const { updateAccount } = require("./accountController");
const mongoose = require("mongoose");

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
//adding tranaction with referance to account and budget
const addTransaction = asyncErrorHandler(async (req, res) => {
  const { from, to, type, amount, category } = req.body;

  const isCategoryAvailable = await BudgetModel.findOne({
    category: req.body.category,
    user: req.user.id,
  });

  if (!isCategoryAvailable) {
    const newTransaction = new TransactionModel({
      ...req.body,
      user: req.user.id,
    });

    if (type === "income") {
      const updatedAccount = await AccountModel.findOneAndUpdate(
        {
          name: from ? from : to,
          user: req.user.id,
        },
        { $inc: { balance: amount } },
        { new: true, runValidators: true }
      );
    } else {
      const updatedAccount = await AccountModel.findOneAndUpdate(
        {
          name: from ? from : to,
          user: req.user.id,
        },
        { $inc: { balance: -amount } },
        { new: true, runValidators: true }
      );
    }
    const savedTransaction = await newTransaction.save();
    return res.status(201).json({
      success: true,
      savedTransaction,
    });
  } else {
    if (
      isCategoryAvailable.limit <
      isCategoryAvailable.spent + Number(amount)
    ) {
      return res.status(500).json({
        success: false,
        message: "Limit exhoust for this category",
      });
    } else {
      const newTransaction = new TransactionModel({
        ...req.body,
        user: req.user.id,
      });
      const updatedBudget = await BudgetModel.findOneAndUpdate(
        {
          category: req.body.category,
          user: req.user.id,
        },
        { $inc: { spent: req.body.amount } },
        { new: true, runValidators: true }
      );

      if (type === "income") {
        const updatedAccount = await AccountModel.findOneAndUpdate(
          {
            name: from ? from : to,
            user: req.user.id,
          },
          { $inc: { balance: amount } },
          { new: true, runValidators: true }
        );
      } else {
        const updatedAccount = await AccountModel.findOneAndUpdate(
          {
            name: from ? from : to,
            user: req.user.id,
          },
          { $inc: { balance: -amount } },
          { new: true, runValidators: true }
        );
      }
      const savedTransaction = await newTransaction.save();
      return res.status(201).json({
        success: true,
        savedTransaction,
      });
    }
  }
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
const getTransactions = async (monthOffSet = 0, user) => {
  const { firstDate, lastDate } = getMonthRange(monthOffSet);

  const transactions = await TransactionModel.find({
    user,
    date: { $gte: firstDate, $lte: lastDate },
  });

  return {
    income: transactions.filter((t) => t.type === "income"),
    expense: transactions.filter((t) => t.type === "expense"),
  };
};

const getBalance = asyncErrorHandler(async (req, res, next) => {
  const currentMonthTrans = await getTransactions(0, req.user.id);
  const lastMonthTrans = await getTransactions(-1, req.user.id);

  const income = await TransactionModel.find({
    type: "income",
    user: req.user.id,
  });
  const expense = await TransactionModel.find({
    user: req.user.id,
    type: "expense",
  });
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
    user: req.user.id,
  });
  res.status(200).json({
    success: true,
    tranactions,
  });
});

// ------------------------------------------------------------------------------------------------------
// get last12 month balance
const getYearBalance = asyncErrorHandler(async (req, res, next) => {
  const today = new Date();
  const lastYear = new Date();
  lastYear.setFullYear(today.getFullYear() - 1);

  const yearlyBalance = await TransactionModel.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(req.user.id),
        date: { $gte: lastYear, $lte: today },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$date" },
          year: { $year: "$date" },
        },
        totalIncome: {
          $sum: {
            $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
          },
        },
        totalExpense: {
          $sum: {
            $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
          },
        },
        balance: {
          $sum: {
            $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        month: "$_id.month",
        totalIncome: 1,
        totalExpense: 1,
        netBalance: { $subtract: ["$totalIncome", "$totalExpense"] },
      },
    },
    {
      $sort: {
        year: 1,
        month: 1,
      },
    },
  ]);

  res.status(200).json({
    success: true,
    yearlyBalance,
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
  getYearBalance,
};
