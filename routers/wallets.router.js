module.exports = app =>{
    const walletsControllers = require("../controllers/wallets.controller");
  
    var router = require("express").Router();
  
    
    
  
    router.get("/", walletsControllers.findAll);
  
    router.post("/new", walletsControllers.create);
    router.post("/delete", walletsControllers.delete);
    router.put("/edit", walletsControllers.update);
   
    app.use('/api/wallets',router);
  };