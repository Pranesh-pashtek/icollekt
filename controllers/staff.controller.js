const database = require("../config/db.sequalize");
const Staff_db = database.staffs;
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

exports.new = (req,res) => {
    Staff_db.create({
        id:req.body.id,
        name:req.body.name,
        email:req.body.email,
        mobile_no:req.body.mobile_no,
        password:req.body.password,
        role:req.body.role,
        status:req.body.status    
})

.then(user=>{
   res.json(user);
}).catch(err=>{
  res.status(500).json(err);
})
}
  
exports.findAll = async(req,res) => {
    Staff_db.findAll(
    {attributes:["id","name","email","mobile_no","password","role","status"],
    where:{status: 1}}
      )
  .then(data => {
      res.send(data);
  })}

exports.delete = (req,res) => {
    Staff_db.update(
       {status:0},
        {where: {id:req.body.id}})
        .then((data) => {
         res.send(data);
 })
 } 

 exports.update = (req,res) => {
    Staff_db.update(
        {
        id:req.body.id,
        name:req.body.name,
        email:req.body.email,
        mobile_no:req.body.mobile_no,
        password:req.body.password,
        role:req.body.role,
        status:req.body.status    
     },
        {where: {id:req.body.id}})
.then((data) => {
    res.send(data);
})
}

