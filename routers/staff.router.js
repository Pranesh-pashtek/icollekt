module.exports = app =>{
    const staffControllers = require("../controllers/staff.controller");
  
    var router = require("express").Router();
        
    router.get("/find",staffControllers.findAll);
    router.post("/new",staffControllers.new);
    router.delete("/delete/:id",staffControllers.delete);
    router.put("/edit",staffControllers.update);
    
    app.use('/api/staff',router);
  };