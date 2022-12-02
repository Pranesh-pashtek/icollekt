module.exports = app =>{
    const categorytranslationsControllers = require("../controllers/category_translations.controller");
  
    var router = require("express").Router();
  
    
    
  
    router.get("/",categorytranslationsControllers.findAll);
    router.post("/new",categorytranslationsControllers.new);
    router.post("/delete",categorytranslationsControllers.delete);
    router.put("/edit",categorytranslationsControllers.update);
    app.use('/api/categorytranslations',router);
  };