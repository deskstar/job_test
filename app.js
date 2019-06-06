global.__basedir = __dirname;

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");
var app = express();
var customerRouter = require("./route/customer_route");

// view engine setup
app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/styles", express.static(path.join(__dirname, "public/style")));

app.use("/", customerRouter);
app.use("/*", function(req, res, next) {
  res.redirect("/customer");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
