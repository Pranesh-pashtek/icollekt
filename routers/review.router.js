module.exports = app =>{
    const ReviewControllers = require("../controllers/review.controller");
  
    var router = require("express").Router();
  
    router.get("/",ReviewControllers.findAll);
    router.get("/:id", ReviewControllers.findOne);
    router.post("/new",ReviewControllers.create);
    router.post("/edit",ReviewControllers.update);
    router.post("/delete",ReviewControllers.delete);
   
    app.use('/api/review',router);
  };