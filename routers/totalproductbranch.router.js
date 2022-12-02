module.exports = app =>{
    const totalprodbranchControllers = require("../controllers/totalproductbranch.controller");

    var router = require("express").Router();
   //router.get("/innerjoin/:status",totalprodbranchControllers.innerjoin);
    router.post("/newpro",totalprodbranchControllers.new);
    router.delete("/delete/:id",totalprodbranchControllers.delete);
    router.put("/edit",totalprodbranchControllers.update);

    app.use('/api/totalproductbranch',router);
  };