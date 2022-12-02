module.exports = app =>{
    const deliveryControllers = require("../controllers/delivery.controller");
  
    var router = require("express").Router();
  
      
    router.get("/find",deliveryControllers.findAll);
    router.post("/new",deliveryControllers.new);
    router.delete("/delete/:id",deliveryControllers.delete);
    router.put("/edit",deliveryControllers.update);
    app.use('/api/delivery',router);
  };