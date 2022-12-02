module.exports = app =>{
    const CityControllers = require("../controllers/city.controller");
  
    var router = require("express").Router();
  
    router.get("/",CityControllers.findAll);
    router.get("/:id",CityControllers.findOne);
    
   
    app.use('/api/city',router);
  };