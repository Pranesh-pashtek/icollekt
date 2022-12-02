module.exports = app =>{
    const purchaseControllers = require("../controllers/purchase.controller");
  
    var router = require("express").Router();
  
    
    
  
    router.get("/", purchaseControllers.findAll);
    router.get("/:id", purchaseControllers.findOne);
    router.post("/new", purchaseControllers.create);
    router.post("/delete", purchaseControllers.delete);
    router.put("/edit", purchaseControllers.update);
   
    app.use('/api/purchase',router);
  };