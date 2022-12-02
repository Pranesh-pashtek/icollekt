module.exports = app =>{
    const attributetranslationsControllers = require("../controllers/attribute_translations.controller");
  
    var router = require("express").Router();
  
    
    
  
    router.get("/",attributetranslationsControllers.findAll);
    router.post("/new",attributetranslationsControllers.new);
    router.post("/delete",attributetranslationsControllers.delete);
    router.put("/edit",attributetranslationsControllers.update);
    app.use('/api/attributetranslations',router);
  };