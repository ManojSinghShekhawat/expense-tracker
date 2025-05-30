const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(process.env.DB_URL).then(() => {
    console.log("DB Connected Successfully");
  });
};

module.exports = connectDB;
