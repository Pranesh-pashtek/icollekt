module.exports = app => {
  const addressesControllers = require("../controllers/addresses.controller");

  var router = require("express").Router();

  router.get("/find/:user_id", addressesControllers.findAll);
  router.post("/new", addressesControllers.new);
  router.post("/delete/:id", addressesControllers.delete);
  router.post("/edit", addressesControllers.update);
  router.get("/countriesList", addressesControllers.countriesList);
  router.post("/statesList", addressesControllers.statesList);
  router.post("/citiesList", addressesControllers.citiesList);
  
  app.use('/api/addresses', router);
};