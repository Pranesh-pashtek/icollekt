const { attributes, products } = require("../config/db.sequalize");
const database = require("../config/db.sequalize");
const Order_details = database.order_details;
const Products = database.products;


exports.findAll = (req, res) => {
    Order_details.findAll
        (

        )
        .then(data => {
            res.send(data);
        })

}

Products.hasMany(Order_details, {foreignKey: 'product_id'});
Order_details.belongsTo(Products, {foreignKey: 'id',targetKey: 'id'});


exports.findByid= (req,res) => {
    Order_details.findAll({
        include: [{
          model: Products,
          required: true,

              image : req.body.photos,
              product_name: req.body.name,
              units : req.body.units

         }],
         where:{order_id:req.body.order_id},
            attributes:[order_id,pickup_point_id,delivery_status,quantity,price],
    
        })
    
      .then(user=>{
        res.json(user);
     }).catch(err=>{
       res.status(500).json(err);
     })
     }
     

// exports.findByid = (req, res) => {
//     Order_details.findAll
//         (
//             {where:{order_id:req.body.order_id},
//             attributes:[order_id,pickup_point_id,delivery_status,quantity,price]},
            
//         )
//         .then(data => {
//             res.send(data);
//         })

// }

exports.create = async (req, res) => {
    const userData = {
        order_id: req.body.order_id,
        seller_id: req.body.seller_id,
        product_id: req.body.product_id,
        variation: req.body. variation,
        price: req.body.price,
        tax: req.body.tax,
        shipping_cost: req.body.shipping_cost,
        quantity: req.body.quantity,
        payment_status: req.body.payment_status,
        delivery_status: req.body.delivery_status,
        shipping_type: req.body.shipping_type,
        pickup_point_id: req.body.pickup_point_id,
        product_referral_code:req.body.product_referral_code

    };

    await Order_details.create(userData)
        .then(data => {
            res.send(data);
        }).catch(err => {
            console.log(err);
            return res.status(500).json(err)
        });


}

exports.delete = (req, res) => {

    Order_details.destroy(

        { where: { id: req.body.id } })

        .then(() => { res.send("deleted") })

}



exports.update = (req, res) => {

    Order_details.update(
        {

            order_id: req.body.order_id,
            seller_id: req.body.seller_id,
            product_id: req.body.product_id,
            variation: req.body. variation,
            price: req.body.price,
            tax: req.body.tax,
            shipping_cost: req.body.shipping_cost,
            quantity: req.body.quantity,
            payment_status: req.body.payment_status,
            delivery_status: req.body.delivery_status,
            shipping_type: req.body.shipping_type,
            pickup_point_id: req.body.pickup_point_id,
            product_referral_code:req.body.product_referral_code,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at

        },
        { where: { id: req.body.id } })
        .then((data) => {
            res.send(data);
        })

}