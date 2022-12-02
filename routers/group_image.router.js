module.exports = app => {
  const Group_imageControllers = require("../controllers/group_image.controller");
  const upload = require("../config/group_image_multer")
  const uploads = require("../config/group_banner_multer")
  // const upload = require("../config/groupimage_banner_multer")
  var router = require("express").Router();


  router.get("/:id", Group_imageControllers.findOne);
  router.get("/user_id/:user_id", Group_imageControllers.findOne_userID);
  router.post("/data/datas", Group_imageControllers.findAll);
  router.post("/group_image-create", upload.fields([{name: 'group_image', maxCount: 1},{name: 'group_banner', maxCount: 3}]), Group_imageControllers.new);
  router.post("/group_image-update/:id", upload.single('group_image'), Group_imageControllers.edit);
  router.get("/view_group_img/:id", Group_imageControllers.view_group_img);
  router.post("/group_img/delete", Group_imageControllers.delete_group_img);
  router.post("/group_banner-update/:id", uploads.single('group_banner'), Group_imageControllers.edit_banner);
  router.get("/view_group_banner_img/:id", Group_imageControllers.view_group_banner_img);
  router.post("/group_img_banner/delete", Group_imageControllers.delete_group_banner_img);
  router.post("/find_contact/find", Group_imageControllers.find_contact);
  router.get("/group/contact_list/:id", Group_imageControllers.find_contact_list);
  router.post("/group/group_exit/group/user_list/:id", Group_imageControllers.group_exit);
  //router.post("/group/group_link/update", Group_imageControllers.group_link);
  router.post("/joinrequest", Group_imageControllers.joinRequest);
  router.post("/group_invite/send", Group_imageControllers.group_invite);
  router.post("/group_link/update/:id/:group_id", Group_imageControllers.grouprequestlink);
  router.post("/group/group_link/update/:id/:gId", Group_imageControllers.group_link);
  router.post("/group/Invite_Request_Accept_By_User/update/:id/:gId", Group_imageControllers.Invite_Request_Accept_By_User);
  router.post("/group/Group_Request_For_Mobile/:id/:group_id", Group_imageControllers.Group_Request_For_Mobile);
  router.get("/invite_contact/:id", Group_imageControllers.invite_contact);
  router.post("/Add_Admin/Admin", Group_imageControllers.Add_Admin); //findAlllllll
  router.get("/", Group_imageControllers.findAlllllll);
  router.get("/Admin_Request_List/For_Mobile/Request_to_Admin/:admin_id", Group_imageControllers.Admin_Request_List);
  router.get("/User_request_List/For_Mobile/Request_to_Users_list/:user_id", Group_imageControllers.User_request_List);
  router.post("/Cancel_In_Request_List/:id", Group_imageControllers.Cancel_In_Request_List);
  router.post("/Cancel_In_Invite_List/:id", Group_imageControllers.Cancel_In_Invite_List);
  router.post("/Admin_remove/:id", Group_imageControllers.Remove_Admin);
  app.use('/api/group_image', router);
};