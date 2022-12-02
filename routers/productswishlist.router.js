module.exports = app =>{
    const productswishlistControllers = require("../controllers/productswishlist.controller");
  
    var router = require("express").Router();
  
    
    
  
    router.get("/",productswishlistControllers.findAll);
   
   
    app.use('/api/productswishlist',router);
  };