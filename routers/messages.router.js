module.exports = (app) => {
  const MessageControllers = require("../controllers/messages.controller");

  var router = require("express").Router();

  router.post("/chat", MessageControllers.Chat);
  router.post("/connect/users", MessageControllers.connection);
  // router.get("/Chat_view/:connectionId/:clearid", MessageControllers.Chat_view);
  router.get("/view_toprofile/:id", MessageControllers.view_toprofile);
  router.get("/message_view/view/:fromUserId", MessageControllers.message_view);
  router.post("/delete/:connectionId", MessageControllers.delete);
  router.post("/Chat_view/:connectionId", MessageControllers.View);
  //router.post("/view/:UserId", MessageControllers.mymessage_view);
  router.get("/message_view/list_inbox/list/:fromUserId", MessageControllers.list_inbox);
  router.get("/message_view/Inboxing/:fromUserId", MessageControllers.Inboxing);
  router.get("/", MessageControllers.findAll);
  app.use("/api/messages", router);
};
