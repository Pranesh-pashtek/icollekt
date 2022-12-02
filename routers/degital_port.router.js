module.exports = app => {
    const degital_portControllers = require("../controllers/degital_port.controller");

    var router = require("express").Router();


    router.get("/", degital_portControllers.findAll);
    router.post("/new", degital_portControllers.new);
    router.post("/update", degital_portControllers.update);
    router.post("/delete", degital_portControllers.delete);
    app.use('/api/degital_port', router);
};