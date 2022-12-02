const database = require("../config/db.sequalize");
const Customerdb = database.customers;
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

exports.new = (req,res) => {
    Customerdb.create({
    id:req.body.id,
    user_id:req.body.user_id,
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
    Customerdb.findAll(
    {attributes:["id","user_id","created_at","updated_at"],
    }
      )
  .then(data => {
      res.send(data);
  })}

  exports.delete = (req,res) => {
    Customerdb.destroy({
        where:{
            id:req.params.id
        }
    })
.then(() => {
    res.send("success");
})
 } 

    

 exports.update = (req,res) => {
    Customerdb.update(
     {
        id:req.body.id,
        user_id:req.body.user_id,
        created_at:req.body.created_at,
        updated_at:req.body.updated_at
     },
        {where: {id:req.body.id}})
.then((data) => {
    res.send(data);
})
}

