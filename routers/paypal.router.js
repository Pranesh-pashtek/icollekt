module.exports = app => {
    const PaypalControllers = require("../controllers/paypal.controller");
    var router = require("express").Router();

    router.post("/Payment_Details", PaypalControllers.Payment_Details); 
    router.post("/Payment_delete/:id", PaypalControllers.delete); 
    router.get("/Payment_findAll", PaypalControllers.findAll); 
    app.use('/api/paypal', router);
};