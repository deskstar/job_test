var mysql = require("mysql");
var config = require("../config/config");
var logger = require("./logger");

var pool = mysql.createPool({
  host: config.Database.Host,
  user: config.Database.User,
  password: config.Database.Password,
  database: config.Database.Name
});

exports.getConnection = function(callback) {
  pool.getConnection(function(err, connection) {
    if (err) {
      logger.error(
        JSON.stringify({
          message: "Get db connection failed",
          method: "getConnection",
          file: __filename,
          error: err
        })
      );
      if (connection) {
        connection.release();
      }
      callback(null);
    } else {
      callback(connection);
    }
  });
};
