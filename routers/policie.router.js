module.exports = app =>{
    const PolicieControllers = require("../controllers/policie.controller");
  
    var router = require("express").Router();
  
    router.get("/",PolicieControllers.findAll);
    router.get("/:id",PolicieControllers.findOne);
    
   
    app.use('/api/policie',router);
  };