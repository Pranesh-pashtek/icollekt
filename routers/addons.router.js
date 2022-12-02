module.exports = app =>{
    const addonsControllers = require("../controllers/addons.controller");
  
    var router = require("express").Router();
        
    router.get("/find",addonsControllers.findAll);
    router.post("/new",addonsControllers.new);
    router.delete("/delete/:id",addonsControllers.delete);
    router.put("/edit",addonsControllers.update);
    
    app.use('/api/addons',router);
  };