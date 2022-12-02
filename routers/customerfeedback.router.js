module.exports = app =>{
    const customerfeedbackControllers = require("../controllers/customerfeedback.controller");
  
    var router = require("express").Router();
  
    
    
  
    router.get("/", customerfeedbackControllers.findAll);
    router.get("/:id", customerfeedbackControllers.findOne);
    router.post("/new", customerfeedbackControllers.create);
    router.post("/delete", customerfeedbackControllers.delete);
    router.put("/edit", customerfeedbackControllers.update);
   
    app.use('/api/customerfeedback',router);
  };