module.exports = app =>{
    const colorsControllers = require("../controllers/colors.controller");
  
    var router = require("express").Router();
        
    router.get("/find",colorsControllers.findAll);
    router.post("/new",colorsControllers.new);
    router.delete("/delete/:id",colorsControllers.delete);
    router.put("/edit",colorsControllers.update);
    
    app.use('/api/colors',router);
  };