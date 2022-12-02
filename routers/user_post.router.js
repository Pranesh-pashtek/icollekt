module.exports = app =>{
    const user_postControllers = require("../controllers/user_post.controller");
    // const upload = require("../config/user_post_multer")
    var router = require("express").Router();
  
    
    
  
    router.get("/",user_postControllers.findAll);
    router.post("/new",user_postControllers.create);
    router.post("/edit",user_postControllers.update);
    router.post("/delete",user_postControllers.delete);
    // router.post("/user_post-update/:id", upload.array('user_post'),user_postControllers.newProduct);
    
   
    app.use('/api/user_post',router);
  };