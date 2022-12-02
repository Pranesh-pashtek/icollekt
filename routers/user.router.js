const { reqValidator, AuthSignupValidator, AuthSigninValidator } = require("../Server-Validation/AuthValidator");
const { requireSignin } = require("../User-Middleware/AuthMiddleware");
module.exports = app => {
  const userControllers = require("../controllers/user.controller");

  var router = require("express").Router();



  router.post("/user_collection", userControllers.collectionUpdate);
  router.get("/",userControllers.findAll);
  router.get("/:id", userControllers.findOne);
  router.post("/signup",AuthSignupValidator,reqValidator, userControllers.signUp);
  router.post("/signIn",AuthSigninValidator,reqValidator,userControllers.signIn);
  router.post("/verification-code/:id",userControllers.VerificationCode);
  router.post("/verification-signup",userControllers.signUp_exist);
  router.post("/forgot-password",userControllers.ForgotPassword);
  router.post("/social-login",userControllers.SocialLogin);
  router.post("/logout/:id",userControllers.Logout);
  router.post("/resend-code/:id",userControllers.ForgotPassword);
  router.post("/confirm-password/:id",userControllers.ConfirmPassword);
  router.post("/new", userControllers.new);
  router.delete("/delete", userControllers.delete);
  router.put("/edit", userControllers.update);
  router.post("/info/update", userControllers.infoupdate);
  router.put("/dob", userControllers.dobUpdate);
  router.post("/verification-social-signup",userControllers.signUp_exist_social_login);
  router.put("/followers/detail/:id", userControllers.followersUpdate);
  router.put("/following/detail/:id", userControllers.followingUpdate);
  router.get("/follow/count/:id", userControllers.followCount);
  router.get("/viewfollowing/:id", userControllers.viewFollowing);
  router.post("/device_token/tocken",userControllers.device_token_update);
  router.post("/notificationstatus",userControllers.notificationUpdate);
  router.post("/notificationview",userControllers.notificationView);
  // router.post("/user/usertype_update", userControllers.usertype_update);
  // router.post("/shipping/update", userControllers.shipping);
  // router.post("/shipping/create", userControllers.shipping);


  app.use('/api/user', router);
};