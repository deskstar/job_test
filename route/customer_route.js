var express = require("express");
var customer_controller = require("../controller/customer_controller");
var router = express.Router();

router.get("/customer", customer_controller.getCustomers);
router.post("/customer/new", customer_controller.insertOrEditAirCustomer);
router.get("/customer/new", customer_controller.insertOrEditAirCustomer);
router.get("/customer/:id(\\d+)", customer_controller.insertOrEditAirCustomer);
module.exports = router;
