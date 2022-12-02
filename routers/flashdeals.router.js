module.exports = app =>{
    const flashdealsControllers = require("../controllers/flashdeals.controller");
  
    var router = require("express").Router();
  
    
    
  
    router.get("/", flashdealsControllers.findAll);
    router.get("/:id", flashdealsControllers.findOne);
    router.post("/new", flashdealsControllers.create);
    router.post("/delete", flashdealsControllers.delete);
    router.put("/edit", flashdealsControllers.update);
   
    app.use('/api/flashdeals',router);
  };