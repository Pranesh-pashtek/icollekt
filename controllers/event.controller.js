const database = require("../config/db.sequalize");
const Event = database.event;
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


exports.new = (req,res) => {
 Event.create({
   
  event_name:req.body.event_name,
  start_date:req.body.start_date,
  end_date:req.body.end_date,
  offer_percentage:req.body.offer_percentage,
  status:1
}).then(user=>{
 
  res.json(user);
}).catch(err=>{
  res.status(500).json(err);
})
}
   exports.findAll = (req,res) => {
      Event.findAll(
    {attributes:["id","name","companyname","address","number","status"],
    where:{status: 1}}
      )
  .then(data => {
      res.send(data);
  })}

  exports.delete = (req,res) => {
    Event.update(
        {status:0},
        {where: {id:req.body.id}})
 .then((data) => {
     res.send(data);
 })

 } 


 exports.update = (req,res) => {

    Event.update(
        {
           event_name:req.body.event_name,
           start_date:req.body.start_date,
           end_date:req.body.end_date,
           offer_percentage:req.body.offer_percentage,
           status:1
         
         },
        {where: {id:req.body.id}})
.then((data) => {
    res.send(data);
})

}

exports.hdelete=(req,res)=>{

    Event.destroy(

{where:{id:req.body.id}})

    .then(()=>{res.send("deleted")})

}
