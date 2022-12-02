const { requireSignin } = require("../User-Middleware/AuthMiddleware");
module.exports = app => {
  const orderControllers = require("../controllers/order.controller");


  var router = require("express").Router();


  router.get("/:id", orderControllers.findByid);
 // router.get("/status",orderControllers.findDeliveryStatus);
router.get("/delivered/status",orderControllers.deliveryStatus);
  router.get("/", orderControllers.findAll);
  router.post("/new", orderControllers.new);
  router.post("/delete", orderControllers.delete);
  router.put("/edit", orderControllers.update);
  //router.get("/count", orderControllers.status);
 
  app.use('/api/order', router);
};