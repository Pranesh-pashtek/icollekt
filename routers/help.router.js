module.exports = app => {
    const HelpControllers = require("../controllers/help.controller");

    var router = require("express").Router();

    router.get("/", HelpControllers.findAll);
    // router.get("/:id", HelpControllers.findOne);
    // router.post("/new", HelpControllers.create);
    // router.post("/delete", HelpControllers.delete);
    // router.put("/edit", HelpControllers.update);
    router.post("/help_create", HelpControllers.help_create);
    router.post("/help", HelpControllers.send_help);


    app.use('/api/help', router);
};