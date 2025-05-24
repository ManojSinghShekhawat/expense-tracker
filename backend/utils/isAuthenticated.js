const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const ErrorHandler = require("./errorHandler");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");

exports.isAuthenticated = asyncErrorHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login first", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decodedData;
  // const user = await UserModel.findById(decodedData.id);
  next();
});
