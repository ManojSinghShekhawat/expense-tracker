const app = require("./app");
require("dotenv").config({ path: "./config/config.env" });
const connectDB = require("./config/dbConnection");
const port = process.env.PORT;
console.log(port);

connectDB();
const server = app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
