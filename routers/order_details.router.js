const { requireSignin } = require("../User-Middleware/AuthMiddleware");
module.exports = app =>{
    const orderdetailsControllers = require("../controllers/order_details.controller");
  
    var router = require("express").Router();
  
    
    
    router.get("/id",requireSignin, orderdetailsControllers.findByid);
    router.get("/",requireSignin, orderdetailsControllers.findAll);
  
    router.post("/new",requireSignin, orderdetailsControllers.create);
    router.post("/delete",requireSignin, orderdetailsControllers.delete);
    router.put("/edit",requireSignin, orderdetailsControllers.update);
   
    app.use('/api/orderdetails',router);
  };