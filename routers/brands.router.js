module.exports = app =>{
    const brandsControllers = require("../controllers/brands.controller");
  
    var router = require("express").Router();
  
    
    
  
    router.get("/", brandsControllers.findAll);
    router.get("/:id", brandsControllers.findOne);
    router.post("/new", brandsControllers.create);
    router.post("/delete", brandsControllers.delete);
    router.put("/edit", brandsControllers.update);
   
    app.use('/api/brands',router);
  };