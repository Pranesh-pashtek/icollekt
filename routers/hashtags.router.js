module.exports = app => {
    const hashtagsControllers = require("../controllers/hashtags.controller");

    var router = require("express").Router();




    router.get("/", hashtagsControllers.findAll);
    router.get("/:id", hashtagsControllers.findOne);
    router.post("/new", hashtagsControllers.create);
    router.post("/new1", hashtagsControllers.create);
    router.post("/delete", hashtagsControllers.delete);
    router.put("/edit", hashtagsControllers.update);
    router.post("/hashtag/exist", hashtagsControllers.hashtag_exist);
    router.post("/hashtags/:id", hashtagsControllers.hashtags);
    app.use('/api/hashtags', router);
};