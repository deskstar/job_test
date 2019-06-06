var database = require("../infrastructure/database");
var config = require("../config/config");
var logger = require("../infrastructure/logger");

exports.getCustomer = async function(id) {
  return new Promise(function(resolve, reject) {
    database.getConnection(function(connection) {
      if (connection) {
        var sql =
          "SELECT * FROM " +
          config.Database.Name +
          ".`customer` WHERE `customer_id` = ?";
        connection.query(sql, [id], function(err, result) {
          if (err) {
            logger.error({ customer_id: id, error: err });
            connection.release();
            reject(err);
          } else {
            connection.release();
            resolve(result);
          }
        });
      } else {
        reject("cannot get connection");
      }
    });
  });
};

exports.getCustomers = async function() {
  return new Promise(function(resolve, reject) {
    database.getConnection(function(connection) {
      if (connection) {
        var sql = "SELECT * FROM " + config.Database.Name + ".`customer`";
        connection.query(sql, [], function(err, result) {
          if (err) {
            logger.error({ error: err });
            connection.release();
            reject(err);
          } else {
            connection.release();
            resolve(result);
          }
        });
      } else {
        reject("cannot get connection");
      }
    });
  });
};

exports.insertCustomer = function(customer) {
  return new Promise(function(resolve, reject) {
    database.getConnection(function(connection) {
      if (connection) {
        var sql = "INSERT INTO " + config.Database.Name + ".`customer` ";
        sql += "(`name`, `status`, `create_time`, `phone`,`address`, `notes`) ";
        sql += "VALUES (?, ?, ?, ?, ?,?)";
        connection.query(
          sql,
          [
            customer.name,
            customer.status,
            customer.create_time,
            customer.phone,
            customer.address,
            customer.notes
          ],
          function(err, result) {
            if (err) {
              logger.error({ data: customer, error: err });
              connection.release();
              reject(err);
            } else {
              connection.release();
              resolve(result);
            }
          }
        );
      } else {
        reject("cannot get connection");
      }
    });
  });
};

exports.updateCustomer = function(customer) {
  return new Promise(function(resolve, reject) {
    database.getConnection(function(connection) {
      if (connection) {
        var sql = "UPDATE " + config.Database.Name + ".`customer` ";
        sql +=
          "SET `name` = ?, `status` = ?, `phone` = ?, `address` = ? WHERE `customer_id` = ?";
        connection.query(
          sql,
          [
            customer.name,
            customer.status,
            customer.phone,
            customer.address,
            customer.customer_id
          ],
          function(err, result) {
            if (err) {
              logger.error({ data: customer, error: err });
              connection.release();
              reject(err);
            } else {
              connection.release();
              resolve(result);
            }
          }
        );
      } else {
        reject("cannot get connection");
      }
    });
  });
};