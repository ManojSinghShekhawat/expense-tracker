const jwt = require("jsonwebtoken");
const UserModel = require("./userModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");

exports.isAutheticated = asyncErrorHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login first", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  const user = await UserModel.findById(decodedData.id);
  next();
});
