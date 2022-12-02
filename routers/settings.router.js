module.exports = app =>{
    const SettingsControllers = require("../controllers/settings.controller");
  
    var router = require("express").Router();
  
    // router.get("/",SettingsControllers.findAll);
    // router.get("/:id",SettingsControllers.findOne);
    router.post("/new",SettingsControllers.create);
    // router.post("/edit",SettingsControllers.update);
    // router.post("/delete",SettingsControllers.delete);


   
    app.use('/api/settings',router);
  };