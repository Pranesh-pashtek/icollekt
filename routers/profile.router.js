module.exports = app => {
  const profileControllers = require("../controllers/profile.controller");
  const upload = require("../config/multer")
  const uploads = require("../config/banner_multer")
  var router = require("express").Router();




  router.get("/", profileControllers.findAll);
  router.get("/:id", profileControllers.findOne);
  router.get("/report/:id", profileControllers.about_findOne);
  router.post("/update", profileControllers.create);
  router.post("/updatedevicetoken", profileControllers.tokenupdate);
  router.post("/delete", profileControllers.delete)
  router.post("/profile-update/:id", upload.single('profile'), profileControllers.new);
  router.post("/banner-update/:id", uploads.single('banner'), profileControllers.upload);
  router.put("/username/:id", profileControllers.editUsername);
  router.post("/user/usertype_update", profileControllers.usertype_update);
  
  router.post("/delete_profile_img", profileControllers.delete_profile_img);
  router.post("/delete_banner_img", profileControllers.delete_banner);
  app.use('/api/profile', router);
};