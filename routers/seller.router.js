module.exports = app =>{
    const sellerControllers = require("../controllers/seller.controller");
  
    var router = require("express").Router();
  
    
    
  
    router.get("/",sellerControllers.findAll);
    router.post("/new",sellerControllers.new);
     router.post("/delete",sellerControllers.delete);
     router.get("/counts",sellerControllers.counts);
   
    app.use('/api/seller',router);
  };