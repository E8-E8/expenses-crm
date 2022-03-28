require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

//importing routes
const expensesRoute = require("./routes/expenses-routes");
const incomesRoute = require("./routes/incomes-routes");
const authRoute = require("./routes/auth-routes");
const cors = require("cors");
//db connection import
const connectDB = require("./db/db-connection");

//middleware import
const checkUserAuth = require("./middleware/auth-middleware");
const notFoundMiddleware = require("./middleware/not-found-middleware");
const errorHandlerMiddleware = require("./middleware/error-handler-middleware");

//express settings
app.use(express.json());
app.set("trust proxy", 1);
app.use(express.static("./public"));
app.use(cors());

//api routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/expenses", checkUserAuth, expensesRoute);
app.use("/api/v1/incomes", checkUserAuth, incomesRoute);

//handler middleware
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
