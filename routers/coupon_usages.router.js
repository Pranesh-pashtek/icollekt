module.exports = app =>{
    const couponusagesControllers = require("../controllers/flash_deal_products.controller");
  
    var router = require("express").Router();
  
    
    
  
    router.get("/",couponusagesControllers.findAll);
    router.post("/new",couponusagesControllers.new);
    router.post("/delete",couponusagesControllers.delete);
    router.put("/edit",couponusagesControllers.update);
    app.use('/api/couponusages',router);
  };