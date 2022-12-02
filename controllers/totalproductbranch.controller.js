const database = require("../config/db.sequalize");
const Totalprodbranch = database.totalproductbranch;
const Banner = database.banner;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const { banner } = require("../config/db.sequalize");
//const bannerModel = require("../models/banner.model");
Totalprodbranch.hasMany(Banner);
Banner.belongsTo(Totalprodbranch);

     exports.innerjoin = (req, res) => {
       Totalprodbranch.findAll(
       {    
         include : [
           {  
            model : Banner,
            required : true,
            where : { status : 1} 
           }]
          })
       .then(user => {
        res.send(user);
      })
      .catch(err => {
        res.status(500).json(err);
        });
  };

Totalprodbranch.findAll= (req, res) => {
  Totalprodbranch.hasMany(Post, {primaryKey: 'user_id'})
Order.belongsTo(User, {primaryKey: 'user_id'})

Totalprodbranch.find({ 
 // where: { ...}, 
  include: [Order]})
     .catch(err => {
    res.status(500).json(err);
  });
}
exports.new = (req,res) => {
       Totalprodbranch.create({
        branch_id: req.body.branch_id,
        branch_name: req.body.branch_name,
        product_name: req.body.product_name,
       // join_banner: req.body.join_banner,
        status:1
      })
    
        .then((user) => {
          res.json(user);
        })
        .catch((err) => {
          res.status(500).json(err);
        })
      }
    

    exports.delete = (req,res) => {
        Totalprodbranch.update(
            {status:0},
            {where: {id:req.body.id}})
            .then((data) => {
             res.send(data);
     })
     } 
    
     exports.update = (req,res) => {
    
        Totalprodbranch.update(
            {
                branch_id: req.body.branch_id,
                branch_name: req.body.branch_name,
                product_name: req.body.product_name,
                //join_banner: req.body.join_banner,
                status: 1
             },
            { where: {id:req.body.id}})
    .then((data) => {
        res.send(data);
    })
}

