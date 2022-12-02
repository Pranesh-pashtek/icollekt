module.exports = app =>{
  const categoriesControllers = require("../controllers/categories.controller");

  var router = require("express").Router();

  router.get("/",categoriesControllers.findAll);
  router.get("/:id", categoriesControllers.findOne);
  router.post("/new",categoriesControllers.create);
  router.delete("/delete/:id",categoriesControllers.delete);
  router.put("/edit",categoriesControllers.update);
  app.use('/api/categories',router);
};