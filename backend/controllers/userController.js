const Usermodel = require("../models/userModel");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
// const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/sendToken");

//create a user
const createUser = asyncErrorHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await Usermodel.create({ name, email, password });
  sendToken(newUser, 201, res);
});

module.exports = { createUser };
