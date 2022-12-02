const database = require("../config/db.sequalize");
const Deliverydb = database.deliveries;
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');



exports.new = (req,res) => {
   Deliverydb.create({
    id:req.body.id,
    item_name:req.body.item_name,
    item_no:req.body.item_no,
    delivery_status:req.body.delivery_status
})

.then(user=>{
   res.json(user);
}).catch(err=>{
  res.status(500).json(err);
})
}
  
exports.findAll = async(req,res) => {
    Deliverydb.findAll(
    {attributes:["id","item_name","item_no","delivery_status"],
    where:{delivery_status: 1}}
      )
  .then(data => {
      res.send(data);
  })}

exports.delete = (req,res) => {
    Deliverydb.destroy(
            {where: {id:req.body.id}}
            )
        .then((data) => {
         res.send(data);
 })
 } 

 exports.update = (req,res) => {
    Deliverydb.update(
        {
           item_name:req.body.item_name,
           item_no:req.body.item_no,
           delivery_status:req.body.delivery_status
     },
        {where: {id:req.body.id}})
.then((data) => {
    res.send(data);
})
}

