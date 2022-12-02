module.exports = app => {
  const productControllers = require("../controllers/product.controller");
  const upload = require("../config/user_post_multer.js")
  var router = require("express").Router();

  router.get("/brand/:brand_id", productControllers.findBrand);
  router.get("/deal/:todays_deal", productControllers.findDeal);
  router.get("/featured/:seller_featured", productControllers.sellerFeatured);
  router.get("/category/:category_id", productControllers.findCategory);
  router.get("/:id", productControllers.findOne);
  router.get("/", productControllers.findAll);
  router.get("/home", productControllers.findHome);
  router.post("/new", productControllers.new);
  router.post("/delete/:id", productControllers.delete);
  router.post("/products", productControllers.filterbyTags);
  router.put("/edit", productControllers.update);
  router.get("/topweek/products", productControllers.TopWeekproducts);
  router.get("/find/Top10", productControllers.findtoptenProducts);
  router.get("/find/Bymonths", productControllers.findBymonths);
  router.get("/find/Byyear", productControllers.findByyear);
  router.post("/newproduct", upload.single('org_img'), productControllers.productCreate);
  router.put("/updateproduct/:id", upload.single('org_img'), productControllers.productUpdate);
  router.post("/upload/:user_id", upload.array('photos'), productControllers.upload);
  router.post("/likeproduct", productControllers.likeProduct);
  router.post("/unlikeproduct", productControllers.unlikeProduct);
  router.get("/productbyid/:id", productControllers.findProductsbyID);
  router.get("/user/users/:id", productControllers.findProdByUserId);
  router.post("/update/productType", productControllers.updateProducttype);
  router.get("/mainprofile/profile", productControllers.MainProfile);
  router.get("/all", productControllers.findProduct);
  router.get("/Photos/list/:id", productControllers.Photos);
  router.get("/all/time", productControllers.allTimeProducts);
  router.get("/seller/details", productControllers.sellerDetails);
  router.post("/product/upload/product", upload.fields([{ name: 'thumbnail_img' }, { name: 'photos', maxCount: 5, minCount: 1 }]), productControllers.newProduct);
  router.post("/hashtags/tags/tag", productControllers.update_hashtags);
  // router.post("/product/upload", upload.fields([{name: 'thumbnail_img', maxCount: 1},{name: 'photos',minCount:2, maxCount: 5}]),productControllers.newProduct);
  app.use('/api/product', router);
};