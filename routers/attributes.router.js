module.exports = app =>{
    const attribControllers = require("../controllers/attributes.controller");
  
    var router = require("express").Router();
        
    router.get("/find",attribControllers.findAll);
    router.post("/new",attribControllers.new);
    router.delete("/delete/:id",attribControllers.delete);
    router.put("/edit",attribControllers.update);
    
    app.use('/api/attributes',router);
  };