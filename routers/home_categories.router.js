module.exports = app => {
    const homecategoriesControllers = require("../controllers/home_categories.controller");

    var router = require("express").Router();




    router.get("/", homecategoriesControllers.findAll);
    router.post("/new", homecategoriesControllers.create);
    router.post("/delete", homecategoriesControllers.delete);
    router.put("/edit", homecategoriesControllers.update);

    app.use('/api/home', router);
};