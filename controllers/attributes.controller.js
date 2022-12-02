const database = require("../config/db.sequalize");
const Attribdb = database.attributes;
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

exports.new = (req,res) => {
    Attribdb.create({
        id:req.body.id,
        name:req.body.name,
        created_at:req.body.created_at,
        updated_at:req.body.updated_at  
})

.then(user=>{
   res.json(user);
}).catch(err=>{
  res.status(500).json(err);
})
}
  
exports.findAll = async(req,res) => {
    Attribdb.findAll(
    {attributes:["id","name","created_at","updated_at"],
   where:{id:req.body.id}}
      )
  .then(data => {
      res.send(data);
  })}

exports.delete = (req,res) => {
    Attribdb.destroy({
        where:{
            id:req.params.id
        }
    })
.then(() => {
    res.send("success");
})
 } 

 exports.update = (req,res) => {
    Attribdb.update(
        {
            id:req.body.id,
        name:req.body.name,
        created_at:req.body.created_at,
        updated_at:req.body.updated_at
     },
        {where: {id:req.body.id}})
.then((data) => {
    res.send(data);
})
}

