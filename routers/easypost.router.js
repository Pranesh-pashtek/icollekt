module.exports = app => {
    const Easypost = require("../controllers/easypost.controller");
    var router = require("express").Router();

    router.post("/Shiping_Details", Easypost.Shiping_Details);
    router.post("/Shiping_delete/:id", Easypost.delete);
    router.get("/Shiping_findAll", Easypost.findAll); //Order_Details
    router.post("/Order_Details_list/Details", Easypost.Order_Details_list);
    router.post("/Order_Details/Details/order", Easypost.Order_Details);
    router.post("/Seller_Details_list/Details", Easypost.Seller_Details_list);
    router.post("/Seller_Details/Details/order", Easypost.Seller_Details);
    app.use('/api/easypost', router);
};