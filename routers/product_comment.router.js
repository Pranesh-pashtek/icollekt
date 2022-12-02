module.exports = app => {
    const Product_Commentcontroller = require("../controllers/product_comment.controller");
    var router = require("express").Router();

    router.post("/product/comment", Product_Commentcontroller.comment);
    router.post("/delete", Product_Commentcontroller.delete)
    router.post("/likecomment", Product_Commentcontroller.like_comment);
    router.post("/unlikecomment", Product_Commentcontroller.unlike_comment);
    router.get("/comment/view/:product_id", Product_Commentcontroller.comment_view);
    app.use('/api/product_comment', router);
}