module.exports = app =>{
    const stockControllers = require("../controllers/stock.controller");
  
    var router = require("express").Router();
        
    router.get("/find",stockControllers.findAll);
    router.post("/new",stockControllers.new);
    router.delete("/delete/:id",stockControllers.delete);
    router.put("/edit",stockControllers.update);
    
    app.use('/api/stock',router);
  };