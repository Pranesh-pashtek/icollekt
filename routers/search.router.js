module.exports = app => {
  const searchControllers = require("../controllers/search.controller");
  var router = require("express").Router();
  router.get("/find/product_list/:user_id", searchControllers.findAll_Product);
  router.get("/find/account_list/profile/:user_id", searchControllers.findAll_Account);
  router.post("/new", searchControllers.new);
  router.post("/delete/product", searchControllers.delete_search_product);
  router.post("/delete/account", searchControllers.delete_search_account);
  router.post("/delete/product/all/:user_id", searchControllers.delete_all_search_product);
  router.post("/delete/account/all/:user_id", searchControllers.delete_all_search_account);
  app.use('/api/search', router);
};