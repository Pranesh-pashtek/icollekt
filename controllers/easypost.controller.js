const database = require("../config/db.sequalize");
const Easyposts = database.easypost;
const Product_db = database.products;
const Paypal = database.paypal;
const Addressesdb = database.addresses;
const User = database.user;
const { admin } = require('../config/firebase.config')
exports.Shiping_Details = (req, res) => {
    const notification_options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };
    const product_id = req.body.product_id;
    const products_id = product_id.split(",")
    Easyposts.create({
        from_addrerss_id: req.body.from_addrerss_id,
        to_address_id: req.body.to_address_id,
        parcel_id: req.body.parcel_id,
        tracking_code: req.body.tracking_code,
        user_id: req.body.user_id,
        seller_id: req.body.seller_id,
        product_id: req.body.product_id,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at,
        shipping_id: req.body.shipping_id,
        payment_id: req.body.payment_id,
        amount: req.body.amount,
    }).then(shping_details => {
        Product_db.update({
            // attributes: ["id", "name","thumbnail_img"],
            approved: 0,
        },
        {
            where: { id: products_id },
        }
        ).then((Product_name) => {
            User.findOne({
                attributes: ["id", "name"],
                where: { id: req.body.user_id },
            }).then((User_name) => {            
        User.findOne({
            attributes: ["id", "device_token"],
            where: { id: req.body.seller_id },
        }).then((token) => {

            const registrationToken = token.device_token;
            const options = notification_options;
            const message = {
                'notification': {
                    'title': `Your Products Was ordered by "${User_name.name}"`,
                },
            };

            admin.messaging().sendToDevice(registrationToken, message, options)
                .then(function (response) {
                    console.log("Successfully sent message:", response);
                })
                .catch(function (error) {
                    console.log("Error sending message:", error);
                });
        });
            })
        })
        res.json(shping_details);
    }).catch(err => {
        res.json(err);
    })
}

//Delete

exports.delete = (req, res) => {
    Easyposts.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.send("success");
        })
}

// find all

exports.findAll = async (req, res) => {
    Easyposts.findAll(
        {}).then(Paypal => {
            res.send({ Paypal });
        })
}


// Order_Details_list

exports.Order_Details_list = async (req, res) => {
    const id = req.body.id
    Easyposts.findAll(
        {
            attributes: ["id", "tracking_code", "seller_id", "created_at", "product_id", "shipping_id", "payment_id","amount"],
            where: { user_id: id }
        }).then(Order_Details_List => {
                    res.send({ Order_Details_List });
                })
}

// Order Details

exports.Order_Details = async (req, res) => {
    const id = req.body.id
    Easyposts.findOne(
        {
            attributes: ["id", "tracking_code", "to_address_id", "seller_id", "created_at", "product_id", "shipping_id", "payment_id"],
            where: { id: id }
        }).then(Datas => {
            const Data = Datas.product_id.split(",");
            Product_db.findAll(
                {
                    attributes: ["id", "name", "thumbnail_img", "unit_price"],
                    where: { id: Data }
                }).then(Order_details => {
                    const Payment = Datas.payment_id
                    Paypal.findOne(
                        {
                            attributes: ["id", "amount", "payment_methord", "seller_id", "payment_id"],
                            where: { payment_id: Payment }
                        }).then(Payment_details => {
                            const Address = Datas.to_address_id
                            Addressesdb.findOne(
                                {
                                    attributes: ["id", "name", "address", "country", "city", "state", "address_id", "postal_code", "phone"],
                                    where: { address_id: Address }
                                }).then(Address => {
                                    Datas.to_address_id = Address
                                    Datas.payment_id = Payment_details
                                    Datas.product_id = Order_details
                                    res.send(Datas);
                                })
                        })
                })
        })
}


// Seller_Details_list
exports.Seller_Details_list = async (req, res) => {
    const id = req.body.id
    Easyposts.findAll(
        {
            attributes: ["id", "tracking_code", "user_id", "created_at", "product_id", "shipping_id", "payment_id", "amount"],
            where: { seller_id: id }
        }).then(Seller_Details_List => {
            res.send({Seller_Details_List});
        })
}


// Seller Details

exports.Seller_Details = async (req, res) => {
    const id = req.body.id
    Easyposts.findOne(
        {
            attributes: ["id", "tracking_code", "from_addrerss_id", "user_id", "created_at", "product_id", "shipping_id", "payment_id"],
            where: { id: id }
        }).then(Datas => {
            const Data = Datas.product_id.split(",");
            Product_db.findAll(
                {
                    attributes: ["id", "name", "thumbnail_img", "unit_price"],
                    where: { id: Data }
                }).then(Order_details => {
                    const Payment = Datas.payment_id
                    Paypal.findOne(
                        {
                            attributes: ["id", "amount", "payment_methord", "seller_id", "payment_id"],
                            where: { payment_id: Payment }
                        }).then(Payment_details => {
                            const Address = Datas.from_addrerss_id
                            Addressesdb.findOne(
                                {
                                    attributes: ["id", "name", "address", "country", "city", "state", "address_id", "postal_code", "phone"],
                                    where: { address_id: Address }
                                }).then(Address => {
                                    Datas.from_addrerss_id = Address
                                    Datas.payment_id = Payment_details
                                    Datas.product_id = Order_details
                                    res.send(Datas);
                                })
                        })
                })
        })
}