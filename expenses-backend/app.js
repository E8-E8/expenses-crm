require("dotenv").config();
require("express-async-errors");

const fs = require("fs");
const https = require("https");
const http = require("http");
const cors = require("cors");

const helmet = require("helmet");

const express = require("express");
const app = express();
const socketUtils = require("./utils/socketUtils.js");

let server;
let isHttps;

if (process.env.DEV === "true") {
  server = http.createServer(app);
  isHttps = false;
}
if (process.env.DEV === "false") {
  const privateKey = fs.readFileSync(process.env.CERTIFICATE_KEY_PATH);
  const certificate = fs.readFileSync(process.env.CERTIFICATE_PATH);
  const credentials = { key: privateKey, cert: certificate };
  server = https.createServer(credentials, app);
  isHttps = true;
}

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
const customersRoute = require("./routes/customers-routes");
const prospectsRoute = require("./routes/prospects-routes");
const commentsRoute = require("./routes/comments-routes");
//db connection import
const connectDB = require("./db/db-connection");

//middleware import
const checkUserAuth = require("./middleware/auth-middleware");
const notFoundMiddleware = require("./middleware/not-found-middleware");
const errorHandlerMiddleware = require("./middleware/error-handler-middleware");
const apiKeyMiddleware = require("./middleware/api-key-middleware");
const { nextTick } = require("process");

//express settings
app.use(express.json());
app.set("trust proxy", 1);
app.use(express.static("./public"));

//api routes
app.use("/api/v1/statistics", statisticsRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/expenses", checkUserAuth, expensesRoute);
app.use("/api/v1/incomes", checkUserAuth, incomesRoute);
app.use("/api/v1/tasks", checkUserAuth, tasksRoute);
app.use("/api/v1/customers", apiKeyMiddleware, customersRoute);
app.use("/api/v1/prospects", checkUserAuth, prospectsRoute);
app.use("/api/v1/comments", checkUserAuth, commentsRoute);
//socket connection

//handler middleware
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`listening carefully on port:${port}, Is https: ${isHttps}`);
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};

start();
