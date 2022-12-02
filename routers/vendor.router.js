module.exports = app => {
  const vendorControllers = require("../controllers/vendor.controller");

  var router = require("express").Router();


  router.post("/new", vendorControllers.new);
  router.get("/", vendorControllers.findAll);

  app.use('/api/vendor', router);
};