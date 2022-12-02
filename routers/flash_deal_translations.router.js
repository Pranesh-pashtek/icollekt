module.exports = app =>{
    const flashdealtranslationsControllers = require("../controllers/flash_deal_products.controller");
  
    var router = require("express").Router();
  
    
    
  
    router.get("/",flashdealtranslationsControllers.findAll);
    router.post("/new",flashdealtranslationsControllers.new);
    router.post("/delete",flashdealtranslationsControllers.delete);
    router.put("/edit",flashdealtranslationsControllers.update);
    app.use('/api/flashdealtranslations',router);
  };