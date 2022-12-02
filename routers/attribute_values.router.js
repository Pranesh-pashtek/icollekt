module.exports = app =>{
    const attributevaluesControllers = require("../controllers/attribute_values.controller");
  
    var router = require("express").Router();
  
    
    
  
    router.get("/",attributevaluesControllers.findAll);
    router.post("/new",attributevaluesControllers.new);
    router.post("/delete",attributevaluesControllers.delete);
    router.put("/edit",attributevaluesControllers.update);
    app.use('/api/attributevalues',router);
  };