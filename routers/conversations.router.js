

module.exports = app => {
  const { requireSignin } = require("../User-Middleware/AuthMiddleware");
  const ConversationControllers = require("../controllers/conversations.controller");
  const upload = require("../config/group.multer.js")
  var router = require("express").Router();

  router.get("/group_photos/:group_id", ConversationControllers.group_photos);
  router.post("/upload/:fromUserId/:group_id", upload.single('photos'), ConversationControllers.upload);
  router.get("/conservation_view/view/:group_id", ConversationControllers.conservation_view);
  router.get("/conservation_view/view/view/:group_id", ConversationControllers.conservation_view1);
  router.post("/delete", ConversationControllers.delete);
  router.post("/like/:id", ConversationControllers.likePost);
  router.post("/unlike/:id", ConversationControllers.unlikePost);
  router.post("/post/like", ConversationControllers.like_create);
  router.post("/post/unlike", ConversationControllers.unlike_update);
  router.get("/images/:group_id", ConversationControllers.groupImages);

  app.use('/api/conversation', router);
};