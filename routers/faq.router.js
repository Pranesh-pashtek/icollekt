module.exports = app =>{
  const FaqControllers = require("../controllers/faq.controller");

  var router = require("express").Router();

  router.get("/",FaqControllers.findAll);
  router.post("/new",FaqControllers.create);
 
  app.use('/api/faq',router);
};