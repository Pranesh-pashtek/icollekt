module.exports = app =>{
    const app_settingsControllers = require("../controllers/app_settings.controller");
  
    var router = require("express").Router();
        
    router.get("/find",app_settingsControllers.findAll);
   router.post("/new",app_settingsControllers.new);
    router.delete("/delete/:id",app_settingsControllers.delete);
    router.put("/edit",app_settingsControllers.update);
    
    app.use('/api/app_settings',router);
  };