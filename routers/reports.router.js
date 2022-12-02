module.exports = app => {
    const reportsControllers = require("../controllers/reports.controller");

    var router = require("express").Router();

    router.get("/", reportsControllers.findAll);
    router.get("/:id", reportsControllers.findOne);
    router.post("/new", reportsControllers.create);
    router.post("/delete", reportsControllers.delete);
    router.put("/edit", reportsControllers.update);
    router.post("/report_send", reportsControllers.report_send);
    router.post("/report_internal", reportsControllers.send_report);


    app.use('/api/reports', router);
};