var winston = require("winston");
require("winston-daily-rotate-file");
var path = require("path");

const myFormat = winston.format.printf(info => {
  return `${info.timestamp} [${info.level}] : ${info.message}`;
});

var transport = new winston.transports.DailyRotateFile({
  filename: path.join(__basedir, "/log/application-%DATE%.log"),
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: false,
  maxSize: "20m",
  maxFiles: "14d"
});

var transportErr = new winston.transports.DailyRotateFile({
  filename: path.join(__basedir, "log/application-error-%DATE%.log"),
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: false,
  maxSize: "20m",
  maxFiles: "2d",
  level: "error"
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(winston.format.timestamp(), myFormat),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    transportErr,
    transport
  ]
});

module.exports = logger;
