const database = require("../config/db.sequalize");
const Seller = database.seller;

const jwt = require('jsonwebtoken');
//const { where } = require("sequelize/types");

exports.new = (req, res) => {
  Seller.findAll(
    {
      attributes: ["id", "seller_id", "name", "companyname", "address", "number", "status"],
      where: { status: 1 }
    }
  )
    .then(data => {
      const count = data.length;
      const seller_id = "" + "CHS" + new Date().getDate() + (new Date().getMonth() + 1) + new Date().getFullYear() + (count + 1);

      Seller.create({
        seller_id: seller_id,
        name: req.body.name,
        companyname: req.body.companyname,
        address: req.body.address,
        number: req.body.number,

        status: 1,
      })

        .then((user) => {
          res.json(user);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })
}
//  Seller.create({
//    id:req.body.id,
//   name:req.body.name,
//   companyname:req.body.companyname,
//   address:req.body.address,
//   number:req.body.number,
//   status:1
// }).then(user=>{

//   res.json(user);
// }).catch(err=>{
//   res.status(500).json(err);
// })
// }
exports.findAll = (req, res) => {
  Seller.findAll(
    {
      attributes: ["id", "name", "companyname", "address", "number", "status"],
      where: { status: 1 }
    }
  )
    .then(data => {

      res.send(data);
    })
}

exports.delete = (req, res) => {
  Seller.update(
    { status: 0 },
    { where: { id: req.body.id } })
    .then((data) => {
      res.send(data);
    })
    .then((data) => {
      res.send(data);
    })
}
exports.update = (req, res) => {

  Seller.update(
    {
      name: req.body.name,
      companyname: req.body.companyname,
      address: req.body.address,
      number: req.body.number,
      status: 1
    },
    { where: { id: req.body.id } })
    .then((data) => {
      res.send(data);
    })

}
exports.counts = (req, res) => {
  let count = [];
  Seller.findAll(
    {
      where: { status: 1 }
    }
  )
  .then(data => {
    let Active = data.length;
    count.push(Active);
  //res.send(count);

  Seller.findAll(
      {
        where: { status: 0 }
      }
    )
    .then(data => {
        let unapprove = data.length;
        count.push(unapprove);
        //res.send(count);
    
        Seller.findAll(
          {
            where: { status: 2 }
          }
        )
        .then(data => {
          let rejected = data.length;
          count.push(rejected)
        res.send(count);
        })
        })
      })
    }