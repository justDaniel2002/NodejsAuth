//config environment
require('dotenv').config()

const express = require("express");

const logger = require("morgan");

const app = express();

const Route = require("./routes/mainRoute");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const helmet = require("helmet");

const configs = require('./configs')

const passportConfig = require('./middlewares/passport')

//connect to MongoDB by mongoose

mongoose
  .connect("mongodb://localhost:27017/NodeJsApiAuth", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("connect successfull"))
  .catch((error) => console.error(`it's fucked, cuz ${error}`));

// Middleware
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(helmet());

//Routes
app.use("/", Route);

// Routes
// app.get('/', (req, res, next) => {
//     return res.status(200).json({
//         message: 'Server is ok'
//     })
// })

// Catch 404 Errors and forward them to error handlers
app.use(function (req, res, next) {
  const err = {
    Error: new Error("Not Found"),
    status: 404,
  };
  next(err);
});

// Error handler function
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;

  // response to cilent
  return res.status(status).json({
    error: {
      message: error.message,
    },
  });
});
// Start server

const port = app.get("port") || 3000;
app.listen(port, () => console.log(`server is listening on port ${port}`));
