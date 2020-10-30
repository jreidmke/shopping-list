//Import express and create instantiation of express object
const express = require("express");
const app = express();

//Here is a good place to tell the app what to accept as req data
app.use(express.json()); //json data
app.use(express.urlencoded({ extended: true })); //form data

//Here is a good place to import my express error (from a seperate file, but that's boilerpalte too):
const ExpressError = require("./expressError");

//Here is a good place to get routes
const userRoutes = require('./routes/books');
app.use("/users", userRoutes);
const msgRoutes = require('./routes/msgs');
app.use("/msgs", msgRoutes);

/** 404 handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** general error handler */

app.use(function(err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});

module.exports = app;