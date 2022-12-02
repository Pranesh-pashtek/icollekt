const database = require("../config/db.sequalize");
const App_settingsdb = database.app_settings;
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

exports.new = (req,res) => {
    App_settingsdb.create({
        name:req.body.name,
        logo:req.body.logo,
        currency_id:req.body.currency_id,
        currency_format:req.body.currency_format,
        facebook:req.body.facebook,
        twitter:req.body.twitter,
        instagram:req.body.instagram,
        youtube:req.body.youtube,
        google_plus:req.body.google_plus,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at,

})

.then(user=>{
   res.json(user);
}).catch(err=>{
  res.status(500).json(err);
})
}
  
exports.findAll = async(req,res) => {
    App_settingsdb.findAll(
    {attributes:["id","name","logo","currency_id","currency_format","facebook","twitter","instagram","youtube","google_plus","created_at","updated_at"],
}
      )
  .then(data => {
      res.send(data);
  })}

exports.delete = (req,res) => {
    App_settingsdb.destroy({
        where:{id:req.params.id}
        
    })
.then(() => {
    res.send("success");
})
 } 

 exports.update = (req,res) => {
    App_settingsdb.update(
        {
            id:req.body.id,
            name:req.body.name,
            logo:req.body.logo,
            currency_id:req.body.currency_id,
            currency_format:req.body.currency_format,
            facebook:req.body.facebook,
            twitter:req.body.twitter,
            instagram:req.body.instagram,
            youtube:req.body.youtube,
            google_plus:req.body.google_plus,
           created_at:req.body.created_at,
           updated_at:req.body.updated_at
     },
        {where: {id:req.body.id}})
.then((data) => {
    res.send(data);
})
}

