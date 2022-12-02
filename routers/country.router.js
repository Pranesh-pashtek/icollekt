module.exports = app =>{
    const CountryControllers = require("../controllers/country.controller");
  
    var router = require("express").Router();
  
    router.get("/",CountryControllers.findAll);
    router.get("/:code",CountryControllers.findOne);
    // router.post("/new",CountryControllers.create);
   
    app.use('/api/country',router);
  };