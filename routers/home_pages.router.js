
module.exports = app => {
    const home_pagesControllers = require("../controllers/home_pages.controller");
    const upload = require("../config/home_page_multer")
    var router = require("express").Router();

    router.post("/month", home_pagesControllers.findBymonths);
    router.get("/year", home_pagesControllers.findByyear);
    router.get("/alltime", home_pagesControllers.findAlltime);
    router.get("/", home_pagesControllers.findAll);
    router.get("/:id", home_pagesControllers.findOne);
    router.post("/new", home_pagesControllers.create);
    router.post("/delete", home_pagesControllers.delete);
    router.put("/edit", home_pagesControllers.update);
    router.put("/share/:id", home_pagesControllers.shareCount);
    router.get("/image/image/:id", home_pagesControllers.findAllimage);
    router.post("/home_page-update/:id", upload.array('home_page'), home_pagesControllers.new);
    app.use('/api/home_pages', router);
};