module.exports = app =>{
  const bannerControllers = require("../controllers/banner.controller");
  var router = require("express").Router();
  router.get("/", bannerControllers.findAll); 
  router.post("/edit", bannerControllers.update);
  app.use('/api/banner',router);
};