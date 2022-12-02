module.exports = app =>{
    const flashdealproductsControllers = require("../controllers/flash_deal_products.controller");
  
    var router = require("express").Router();
  
    
    
  
    router.get("/",flashdealproductsControllers.findAll);
    router.post("/new",flashdealproductsControllers.new);
    router.post("/delete",flashdealproductsControllers.delete);
    router.put("/edit",flashdealproductsControllers.update);
    app.use('/api/flashdealproducts',router);
  };