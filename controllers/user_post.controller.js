const database = require("../config/db.sequalize");
const User_post = database.user_post;
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

//create

exports.create = (req,res) => {
    User_post.create({
    // id:id,
    user_id:req.body.user_id,
    hashtags:req.body.hashtags,
    title:req.body.title,
    price:req.body.price,
    max_price:req.body.max_price,
    min_price:req.body.min_price,
   status:1
 }).then(user=>{
  
   res.json(user);
 }).catch(err=>{
   res.status(500).json(err);
 })
 }

//findall


    exports.findAll = (req,res) => {
        User_post.findAll(
    {attributes:["id","user_id","image_upload","hashtags","title","price","max_price","min_price","updated_at","created_at","status"],
    }
      )
  .then(data => {
      res.send(data);
  })}

//delete

  exports.delete = (req,res) => {
    User_post.update({status:0},{where: {id:req.body.id}})
        .then((order) => {
          res.json("success");
        })
        .catch((err) => {
          res.status(500).json(err);
        });

}

//update

exports.update = async(req,res) => {
  const userData = {
    user_id:req.body.user_id,
    hashtags:req.body.hashtags,
    title:req.body.title,
    price:req.body.price,
    max_price:req.body.max_price,
    min_price:req.body.min_price,
    };
    User_post.update(
      userData,
      { where: { id: req.body.id } })
      .then((data) => {
        res.send(data);
      })
  .catch(err => {
  console.log( err);
  return res.status(500).json(err)
});
}

// // image upload multer
// exports.new = (req, res) => {
//     let url = [];
//     const id = req.params.id;
//     console.log(req.files.length, "req.files.filename");
//     // const data = `http://localhost:3001/profile/${req.files.filename}`
//     req.files.map((images, index) => {
//       console.log(images, "image");
//       const data = `http://localhost:3001/post_images/${images.filename}`;
//       url.push(data);
//     });
//     console.log(url, "url");
//     User_post.update(
//       {
//         image_upload: url,
//         status: 1,
//       },
//       { where: { id: id } }
//     )
//       .then((user) => {
//         console.log(user);
//         res.json({
//           success: 1,
//           profile_url: url,
//         });
//       })
//       .catch((err) => {
//         res.status(500).json(err);
//       });
//   };