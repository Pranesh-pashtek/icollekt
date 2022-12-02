module.exports = app =>{
    const shopControllers = require("../controllers/shops.controller");
  
    var router = require("express").Router();
        
    router.get("/find",shopControllers.findAll);
    router.post("/new",shopControllers.new);
    router.delete("/delete/:id",shopControllers.delete);
    router.put("/edit",shopControllers.update);
    app.use('/api/shops',router);
  };