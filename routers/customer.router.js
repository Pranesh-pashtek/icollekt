module.exports = app =>{
    const customerControllers = require("../controllers/customer.controller");
  
    var router = require("express").Router();
        
    router.get("/find",customerControllers.findAll);
    router.post("/new",customerControllers.new);
    router.delete("/delete/:id",customerControllers.delete);
    router.put("/edit",customerControllers.update);
    app.use('/api/customer',router);
  };