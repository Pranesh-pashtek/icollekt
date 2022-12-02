module.exports = app =>{
    const couponsControllers = require("../controllers/coupons.controller");
  
    var router = require("express").Router();
  
    
    
  
    router.get("/", couponsControllers.findAll);
    router.get("/:id", couponsControllers.findOne);
    router.post("/new", couponsControllers.create);
    router.post("/delete", couponsControllers.delete);
    router.put("/edit", couponsControllers.update);
   
    app.use('/api/coupons',router);
  };