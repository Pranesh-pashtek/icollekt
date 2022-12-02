module.exports = app => {
  const cartsControllers = require("../controllers/carts.controller");
  const { requireSignin } = require("../User-Middleware/AuthMiddleware");
  var router = require("express").Router();

  router.post("/add-cart", cartsControllers.AddCart);
  router.post("/coupon/add_copon", cartsControllers.AddCopon);
  router.get("/cart-summary/:owner_id/:user_id/:address_id/:shipping", cartsControllers.getCartSummary);
  // router.post("/cart-summary", cartsControllers.getCartSummary_for_one_product);
  router.get("/carts-details/:user_id", cartsControllers.getCartList);
  router.post("/carts-delete/", cartsControllers.CartDestroyed);
  router.post("/bulk-carts-delete/delete", cartsControllers.BulkCartDelete);
  router.post("/all/cart/delete/:user_id", cartsControllers.AllDelete);
  router.post("/coupon-delete/delete/", cartsControllers.Coupon_delete);
  router.post("/carts-update-address/:cart_id", cartsControllers.CartAddressUpdate);
  router.post("/carts-change-quantity/:cart_id", cartsControllers.CartChangeQuantity);
  router.get("/GET_Parcel_Details/:owner_id/:user_id", cartsControllers.GET_Parcel_Details);
  router.post("/Make_An_Offer_Add_to_Cart/Make_offer", cartsControllers.Make_An_Offer_Add_to_Cart);
  router.get("/", cartsControllers.findAll);
  app.use('/api/carts', router);
};