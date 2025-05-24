const Usermodel = require("../models/userModel");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/sendToken");
const jwt = require("jsonwebtoken");

//create a user
const createUser = asyncErrorHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await Usermodel.create({ name, email, password });
  sendToken(newUser, 201, res);
});

//login a user
const login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new ErrorHandler("Provide eamil and password", 400));
  }
  const user = await Usermodel.findOne({ email }).select("+password");

  if (!user) {
    next(new ErrorHandler("Wrong email or password", 401));
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next(new ErrorHandler("Wrong email or password", 401));
  }
  sendToken(user, 200, res);
});

//logout a user
const logout = asyncErrorHandler(async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax", // or 'None' if on HTTPS
    secure: false, // true if on HTTPS
  });
  res.status(200).json({
    success: true,
    message: "user Logout successfully",
  });
});

//check Auth Status
const authStatus = asyncErrorHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("user is not authorize", 404));
  }
  const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
  const user = await Usermodel.findById(decodedUser.id).select("+password");
  return res.status(200).json({
    success: true,
    user,
    message: "user is loggedIn",
  });
});

module.exports = { createUser, login, logout, authStatus };
