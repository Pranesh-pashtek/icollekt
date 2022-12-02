module.exports = app => {
    const Commentcontroller = require("../controllers/comment.controller");
    var router = require("express").Router();

    router.post("/post/comment", Commentcontroller.comment);

    router.post("/delete", Commentcontroller.delete)
    router.post("/likecomment", Commentcontroller.like_comment);
    router.post("/unlikecomment", Commentcontroller.unlike_comment);
    router.get("/comment/view/:post_id", Commentcontroller.comment_view);
    app.use('/api/comment', router);
}