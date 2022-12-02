module.exports = app => {
    const coinsControllers = require("../controllers/coins.controller");

    var router = require("express").Router();

    router.get("/", coinsControllers.findAll);

    app.use('/api/coins', router);
};