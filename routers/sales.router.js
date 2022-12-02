module.exports = app =>{
    const salesControllers = require("../controllers/sales.controller");
  
    var router = require("express").Router();
        
    router.get("/",salesControllers.findAll);
    router.get("/:id",salesControllers.findOne);
     router.post("/new",salesControllers.new);
    router.delete("/delete",salesControllers.delete);
     router.put("/edit",salesControllers.update);
    app.use('/api/sales',router);
  };