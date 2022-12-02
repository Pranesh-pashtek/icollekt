module.exports = app =>{
    const eventControllers = require("../controllers/event.controller");

  
    var router = require("express").Router();
  
    
    
  
    router.get("/",eventControllers.findAll);
    router.post("/new",eventControllers.new);
     router.post("/delete",eventControllers.delete);
     router.put("/edit",eventControllers.update);
     router.delete("/hard_delete",eventControllers.hdelete);

    app.use('/api/event',router);
  };