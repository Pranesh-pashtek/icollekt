module.exports = app => {
    const slotsControllers = require("../controllers/slots.controller");

    var router = require("express").Router();




    router.get("/", slotsControllers.findAll);
    router.post("/new", slotsControllers.create);
    router.post("/delete", slotsControllers.delete);
    router.put("/edit", slotsControllers.update);

    app.use('/api/slots', router);
};