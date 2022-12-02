const database = require("../config/db.sequalize");
const Order = database.order;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../config/db.sequalize");
const req = require("express/lib/request");

  
  exports.new = (req, res) => {
  Order.create({
        combined_order_id:req.body.combined_order_id,
        user_id: req.body.user_id,
        guest_id: req.body.guest_id,
        seller_id: req.body.seller_id,
        shipping_address: req.body.shipping_address,
        delivery_status: req.body.delivery_status,
        payment_type: req.body.payment_type,
        payment_status: req.body.payment_status,
        payment_details: req.body.payment_details,
        grand_total: req.body.grand_total,
        coupon_discount: req.body.coupon_discount,
        code: req.body.code,
        date: req.body.date,
        viewed: req.body.viewed,
        delivery_viewed: req.body.delivery_viewed,
        payment_status_viewed: req.body.payment_status_viewed,
        commission_calculated: req.body.commission_calculated,

      })

        .then((user) => {
          res.json(user);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    
}

exports.findAll = (req, res) => {
  Order.findAll(
   
  )
    .then(data => {
      res.send(data);
    })
}

exports.findByid = (req, res) => {
  Order.findOne(
    {where:{id:req.params.id}},
   { attributes:['id','combined_order_id','user_id','guest_id','seller_id','shipping_address','delivery_status','payment_type','payment_status','payment_details','grand_total','coupon_discount','code','date','viewed','delivery_viewed','payment_status_viewed','commission_calculated','created_at','updated_at']}
  )
    .then(data => {
      res.send(data);
    })
}

exports.deliveryStatus = (req,res) => {
  Order.findAll(
    {where:{delivery_status:req.body.delivery_status},
    attributes:['id','shipping_address','delivery_status']}
  )
  .then(data =>{
    res.send(data)
  })
}


exports.delete = (req, res) => {
  Order.destroy(
 
    { where: { id: req.body.id } })
  
      .then(() => { res.send("deleted") })
  
  }
  

exports.update = (req, res) => {

  Order.update(
    {
        combined_order_id:req.body.combined_order_id,
        user_id: req.body.user_id,
        guest_id: req.body.guest_id,
        seller_id: req.body.seller_id,
        shipping_address: req.body.shipping_address,
        delivery_status: req.body.delivery_status,
        payment_type: req.body.payment_type,
        payment_status: req.body.payment_status,
        payment_details: req.body.payment_details,
        grand_total: req.body.grand_total,
        coupon_discount: req.body.coupon_discount,
        code: req.body.code,
        date: req.body.date,
        viewed: req.body.viewed,
        delivery_viewed: req.body.delivery_viewed,
        payment_status_viewed: req.body.payment_status_viewed,
        commission_calculated: req.body.commission_calculated,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at
    },
    { where: { id: req.body.id } })
    .then((data) => {
      res.send(data);
    })

}



