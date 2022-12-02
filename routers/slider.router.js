module.exports = app =>{
    const SliderControllers = require("../controllers/slider.controller");
  
    var router = require("express").Router();
  
    router.get("/",SliderControllers.findAll);
    router.get("/:id",SliderControllers.findOne);
    router.post("/new",SliderControllers.create);
    router.post("/edit",SliderControllers.update);
    router.post("/delete",SliderControllers.delete);


   
    app.use('/api/slider',router);
  };