const database = require("../config/db.sequalize");
const Colors_db = database.colors;
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

exports.new = (req,res) => {
    Colors_db.create({
        id:req.body.id,
        name:req.body.name,
        code:req.body.code,
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
    Colors_db.findAll(
    {attributes:["id","name","code","created_at","updated_at"],
   //where:{id:req.body.id}
}
      )
  .then(data => {
      res.send(data);
  })}

  exports.delete = (req,res) => {
    Colors_db.destroy({
        where:{
            id:req.params.id
        }
    })
.then(() => {
    res.send("success");
})
 } 

 exports.update = (req,res) => {
    Colors_db.update(
        {
        id:req.body.id,
        name:req.body.name,
        code:req.body.code,
        created_at:req.body.created_at,
        updated_at:req.body.updated_at    
     },
        {where: {id:req.body.id}})
.then((data) => {
    res.send(data);
})
}
// exports.edit = (req,res) => {
//     Colors_db.edit(
//         {
//             id:req.body.id,
//             name:req.body.name,
//             color_code:req.body.color_code,
//             status:req.body.status    
//      },
//         {where: {id:req.body.id}})
// .then((data) => {
//     res.send(data);
// })
// }
 
