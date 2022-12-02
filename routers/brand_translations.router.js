module.exports = app =>{
  const brandtranslationsControllers = require("../controllers/brand_translations.controller");

  var router = require("express").Router();

  
  

  router.get("/",brandtranslationsControllers.findAll);
  router.post("/new",brandtranslationsControllers.new);
  router.post("/delete",brandtranslationsControllers.delete);
  router.put("/edit",brandtranslationsControllers.update);
  app.use('/api/brandtranslations',router);
};