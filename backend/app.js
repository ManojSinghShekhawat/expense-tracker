const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const transactionRoute = require("./routes/transactionRoute");
const userRoute = require("./routes/userRoute");
const accountRoute = require("./routes/accountRoute");
const budgetRoute = require("./routes/budgetRoute");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin:
      "https://expense-tracker-7fwa-fwz2tzwaf-manojsinghshekhawats-projects.vercel.app",
    credentials: true,
  })
);

app.use("/api/v1/transaction", transactionRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/account", accountRoute);
app.use("/api/v1/budget", budgetRoute);

app.use(errorMiddleware);
module.exports = app;
