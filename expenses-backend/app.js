require("dotenv").config();
require("express-async-errors");
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");

const express = require("express");
const app = express();
const socketUtils = require("./utils/socketUtils.js");

const server = http.createServer(app);
const io = socketUtils.sio(server);
socketUtils.connection(io);

const socketIOMiddleware = (req, res) => {
  req.io = io;
  nextTick();
};
//cors

app.use(cors());

//importing routes
const tasksRoute = require("./routes/tasks-routes");
const expensesRoute = require("./routes/expenses-routes");
const incomesRoute = require("./routes/incomes-routes");
const authRoute = require("./routes/auth-routes");
const statisticsRoute = require("./routes/statistics-routes");

//db connection import
const connectDB = require("./db/db-connection");

//middleware import
const checkUserAuth = require("./middleware/auth-middleware");
const notFoundMiddleware = require("./middleware/not-found-middleware");
const errorHandlerMiddleware = require("./middleware/error-handler-middleware");
const { nextTick } = require("process");

//express settings
app.use(helmet());
app.use(express.json());
app.set("trust proxy", 1);
app.use(express.static("./public"));

//api routes
app.use("/api/v1/statistics", statisticsRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/expenses", checkUserAuth, expensesRoute);
app.use("/api/v1/incomes", checkUserAuth, incomesRoute);
app.use("/api/v1/tasks", checkUserAuth, tasksRoute);
//socket connection

//handler middleware
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`listening on port:${port}`);
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};

start();
