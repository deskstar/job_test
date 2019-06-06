var customer_repository = require("../repository/customer_repository");
var logger = require("../infrastructure/logger");
var moment = require("moment");

exports.insertOrEditAirCustomer = async function(req, res) {
  if (req.method == "GET") {
    if (req.params.id) {
      try {
        var results = await customer_repository.getCustomer(req.params.id);
        results[0].notesJson = JSON.parse(results[0].notes);
        res.render("customer/new", {
          page: { title: "Edit Customer", customer: results[0] }
        });

        return;
      } catch (error) {
        logger.error(
          JSON.stringify({
            message: "Failed",
            method: "InsertOrEditCustomer",
            error: error,
            file: __filename,
            data: req.params
          })
        );
      }
    }

    res.render("customer/new", {
      page: { title: "New Customer" }
    });
    return;
  } else {
    if (req.body.id) {
      var now = new Date();

      var customer = {
        customer_id: req.body.id,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        status: req.body.status
      };

      try {
        await customer_repository.updateCustomer(customer);
      } catch (error) {
        logger.error(
          JSON.stringify({
            message: "Update Failed",
            method: "InsertOrEditCustomer",
            error: error,
            file: __filename,
            data: { reqId: req.body.id, customer: customer }
          })
        );
      }

      res.redirect("/customer");
      return;
    } else {
      var now = new Date();
      var notes = [];
      if (req.body.notes) {
        var temp = req.body.notes.split("\r\n");
        if (temp) {
          temp.forEach(function(element) {
            if (element) {
              notes.push(element);
            }
          });
        }
      }
      console.log(notes);
      var customer = {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        notes: JSON.stringify(notes),
        create_time: now,
        status: req.body.status
      };

      try {
        await customer_repository.insertCustomer(customer);
      } catch (error) {
        logger.error(
          JSON.stringify({
            message: "Insert Failed",
            method: "InsertOrEditCustomer",
            file: __filename,
            data: customer,
            error: error
          })
        );
      }

      res.redirect("/customer");
      return;
    }
  }
};

exports.getCustomers = async function(req, res) {
  try {
    var results = await customer_repository.getCustomers();

    res.render("customer/index", {
      page: { title: "Customer List", customers: results }
    });

    return;
  } catch (error) {
    logger.error(
      JSON.stringify({
        message: "Get customer failed",
        method: "getCustomers",
        file: __filename,
        error: error
      })
    );
  }

  res.render("customer/index", {
    page: { title: "Customer List", customers: [] }
  });

  return;
};
