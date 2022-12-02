module.exports = app => {
  const PaymentControllers = require("../controllers/payment.controller");

  var router = require("express").Router();

  router.get("/", PaymentControllers.findAll);
  router.get("/:id", PaymentControllers.findOne);
  router.post("/new", PaymentControllers.create);
  router.post("/delete", PaymentControllers.delete);
  app.use('/api/payment', router);
};