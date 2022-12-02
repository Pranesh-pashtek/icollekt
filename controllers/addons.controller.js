const database = require("../config/db.sequalize");
const Addonsdb = database.addons;
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

exports.new = (req,res) => {
    Addonsdb.create({
       // id:req.body.id,
        name:req.body.name,
        unique_identifier:req.body.unique_identifier,
        version:req.body.version,
        activated:req.body.activated,
        image:req.body.image,
        purchase_code:req.body.purchase_code
        // created_at:req.body.created_at,
        // updated_at:req.body.updated_at  
})

.then(user=>{
   res.json(user);
}).catch(err=>{
  res.status(500).json(err);
})
}
  
exports.findAll = async(req,res) => {
    Addonsdb.findAll(
    
      )
  .then(data => {
      res.send(data);
  })}

exports.delete = (req,res) => {
    Addonsdb.destroy({
        where:{
            id:req.params.id
        }
    })
.then(() => {
    res.send("success");
})
 } 

 exports.update = (req,res) => {
    Addonsdb.update(
        {
        id:req.body.id,
        name:req.body.name,
        unique_identifier:req.body.unique_identifier,
        version:req.body.version,
        activated:req.body.activated,
        image:req.body.image,
        purchase_code:req.body.purchase_code,
        created_at:req.body.created_at,
        updated_at:req.body.updated_at
     },
        {where: {id:req.body.id}})
.then((data) => {
    res.send(data);
})
}

