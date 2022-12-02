const database = require("../config/db.sequalize");
const Payment = database.payment;
const Carts = database.carts;
const Order = database.order;


exports.findAll = (req, res) => {
  Payment.findAll(

  )
    .then(data => {
      res.send(data);
    })
}

//Findone

exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log(id, 'data')
  Payment.findOne({ where: { id: id } }).then(data => {
    res.send(data);
  })
};
exports.delete = (req, res) => {
  Payment.update(
    { status: 0 },
    { where: { id: req.body.id } })
    .then((data) => {
      res.send(data);
    })

}


// New payment methord

exports.create = (req, res) => {
  let PaymentData = {
    seller_id: req.body.seller_id,
    user_id: req.body.user_id,
    amount: req.body.amount,
    payment_details: req.body.payment_details,
    payment_method: req.body.payment_method,
    txn_code: req.body.txn_code,
    status: 1
  }
  let CartData = {
    cart_status: 0,
  }
  let OrderData = {
    combined_order_id: req.body.combined_order_id,
    user_id: req.body.user_id,
    seller_id: req.body.seller_id,
    shipping_address: req.body.shipping_address,
    delivery_status: 0,
    payment_type: req.body.payment_method,
    payment_status: 1,
    payment_details: req.body.payment_details,
    coupon_discount: req.body.coupon_discount,
    code: req.body.code
  }
  Payment.create(PaymentData),
    Carts.update(CartData,
      { where: { user_id: req.body.user_id } }),
    Order.create(OrderData)
      .then(data =>
        res.send(data)
      )

}