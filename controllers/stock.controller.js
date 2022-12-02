const database = require("../config/db.sequalize");
const Stock_db = database.stocks;
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

exports.new = (req,res) => {
    Stock_db.create({
        id:req.body.id,
        product_name:req.body.product_name,
        stock:req.body.stock,
        status:req.body.status    
})

.then(user=>{
   res.json(user);
}).catch(err=>{
  res.status(500).json(err);
})
}
  
exports.findAll = async(req,res) => {
    Stock_db.findAll(
    {attributes:["id","product_name","stock","status"],
    where:{status: 1}}
      )
  .then(data => {
      res.send(data);
  })}

exports.delete = (req,res) => {
    Stock_db.update(
       {status:0},
        {where: {id:req.body.id}})
        .then((data) => {
         res.send(data);
 })
 } 

 exports.update = (req,res) => {
    Stock_db.update(
        {
            id:req.body.id,
            product_name:req.body.product_name,
            stock:req.body.stock,
            status:req.body.status    
     },
        {where: {id:req.body.id}})
.then((data) => {
    res.send(data);
})
}

