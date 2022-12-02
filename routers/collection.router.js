module.exports = app => {
  const collectionControllers = require("../controllers/collection.controller");
  const upload = require("../config/collection_multer")
  var router = require("express").Router();

  router.get("/", collectionControllers.findAll);
  router.get("/topweekcollection", collectionControllers.findbyweek);
  router.delete("/delete/:id", collectionControllers.delete);
  // router.get("/selectdate", collectionControllers.findbyDate);
  // router.get("/topten", collectionControllers.topTen);
  router.put("/edit", collectionControllers.update);
  router.post("/collection-update/:id", upload.array('collection'),collectionControllers.new);
  app.use('/api/collection', router);
};