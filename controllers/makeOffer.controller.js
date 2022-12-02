const e = require("connect-flash");
const database = require("../config/db.sequalize");
const { findOne } = require("./categories.controller");
const makeOffer = database.makeOffer;
const User = database.user;
const Product = database.products;
const Carts = database.carts;
const Address = database.addresses

// /**
//  * Create a make an Offer price
//  * @param {Object} updateBody
//  * @returns {Promise<User>}
//  */

// const makePriceCreate = async (req, res) => {
//     const userBody = await req.body
//     try {
//         if (userBody.make_price == 0) {
//             return res.send({
//                 code: false,
//                 message: 'please enter the price amount'
//             })
//         } else {
//             const id = await userBody.product_id
//             const buyerID = await userBody.buyer_id
//             userBody.product_id = id
//             userBody.status = 0
//             Product.findAll({
//                 where: { id: id },
//                 attributes: ["id", "name", "user_id", "thumbnail_img", "unit_price"],
//             }).then((dataValue) => {
//                 userBody.seller_id = dataValue[0].user_id;
//                 userBody.original_price = Math.round(dataValue[0].unit_price);
//                 // userBody.original_price = dataValue[0].unit_price;
//                 return dataValue
//             })
//             function created() {
//                 return makeOffer.create(userBody), res.send({
//                     code: true,
//                     message: 'The buyer bargains with the seller'
//                 })
//             }
//             function failed() {
//                 return res.send({
//                     code: false,
//                     message: 'you already applied to bargain this product'
//                 })
//             }
//             await makeOffer.findAll({ where: { product_id: id, buyer_id: buyerID } }).then((val) => {
//                 console.log(val,"lplplppplpl");
//                 val.reverse()
//                 var status = val[0].status
//                 console.log("val[0]===", val[0].id);
//                 switch (status) {
//                     case 2:
//                         return created();
//                     case 'undefined':
//                         return created();
//                     case 1:
//                         return failed();
//                     case 0:
//                         return failed();
//                     default:
//                         break;
//                 }
//             })
//         }
//     } catch (error) {
//         console.log(error);
//     }

// }

/**
 * Create a make an Offer price
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */

const makePriceCreate = async (req, res) => {
    const userBody = {
        make_price: Math.round(req.body.make_price),
        product_id: req.body.product_id, 
        buyer_id: req.body.buyer_id
    }
    try {
        const id = await userBody.product_id
        const buyerID = await userBody.buyer_id
        userBody.product_id = id
        userBody.status = 0
        Product.findAll({
            where: { id: id },
            attributes: ["id", "name", "user_id", "thumbnail_img", "unit_price"],
        }).then((dataValue) => {
            userBody.seller_id = dataValue[0].user_id;
            userBody.original_price = Math.round(dataValue[0].unit_price);
            return dataValue
        })
        await makeOffer.findAll({ where: { product_id: id, buyer_id: buyerID } }).then((val) => {
            if (!val.length) {
                if (userBody.make_price == 0) {
                    return res.status(200).send({ code: false, message: 'please enter the price amount' }), userBody
                } else {
                    return makeOffer.create(userBody), 
                     res.json({
                        code: true,
                        message: "The buyer bargains with the seller"
                    })
                }
            }
            else {
                return res.send({ code: false, message: 'you already applied to bargain this product' }), makeOffer
            }
        })
    } catch (error) {
        console.log(error);
    }
}

// Update Offer

const update_Offer = (req, res) => {
    makeOffer.update({ status: req.body.status, }, { where: { id: req.body.id } })
        .then((data) => {
            Product.update({
                approved: 0
            }, {
                where: {
                    id: req.body.product_id
                }
            }).then(() => {
                makeOffer.destroy({
                        where: { status: 0, product_id: req.body.product_id } 
                }).then(() => {})
            }),
            res.json({
                status: true,
                Message: 'success'
            });
        })
}

// Find Offers By Status:0 (Pending)

const findAll_pending_offers = (req, res) => {
    Product.hasMany(makeOffer, {
        foreignKey: 'id'
    });
    makeOffer.belongsTo(Product, {
        foreignKey: 'product_id',
    });
    User.hasMany(makeOffer, {
        foreignKey: 'id',
    });
    makeOffer.belongsTo(User, {
        foreignKey: 'seller_id',
    });
    const buyer_id = req.params.buyer_id;
    makeOffer.findAll({
        include: [{
            model: Product,
            attributes: ["end_date", "thumbnail_img", "name"],
        },
        {
            model: User,
            attributes: ["id", "name", "profile_pic"],
        }],
        where: { buyer_id: buyer_id, status: 0 }
    }).then(Pending => {
        res.send({ Pending });
    })
}

// Find Offers By Status:1 (Accept) 

const findAll_accept_offers = (req, res) => {
    Product.hasMany(makeOffer, {
        foreignKey: 'id'
    });
    makeOffer.belongsTo(Product, {
        foreignKey: 'product_id',
    });
    User.hasMany(makeOffer, {
        foreignKey: 'id',
    });
    makeOffer.belongsTo(User, {
        foreignKey: 'seller_id',
    });
    const buyer_id = req.params.buyer_id;
    makeOffer.findAll({
        include: [{
            model: Product,
            attributes: ["end_date", "thumbnail_img", "name"],
        },
        {
            model: User,
            attributes: ["id", "name", "profile_pic"],
        }],
        where: { buyer_id: buyer_id, status: 1 }
    }).then(Accept => {
        res.send({ Accept });
    })
}

// Find Offers By Status:2 (Reject) 

const findAll_reject_offers = (req, res) => {
    Product.hasMany(makeOffer, {
        foreignKey: 'id'
    });
    makeOffer.belongsTo(Product, {
        foreignKey: 'product_id',
    });
    User.hasMany(makeOffer, {
        foreignKey: 'id',
    });
    makeOffer.belongsTo(User, {
        foreignKey: 'seller_id',
    });
    const buyer_id = req.params.buyer_id;
    makeOffer.findAll({
        include: [{
            model: Product,
            attributes: ["end_date", "thumbnail_img", "name"],
        },
        {
            model: User,
            attributes: ["id", "name", "profile_pic"],
        }],
        where: { buyer_id: buyer_id, status: 2 }
    }).then(Reject => {
        res.send({ Reject });
    })
}



// MakeOffer 

const getAllOffer = (req, res) => {
    User.hasMany(makeOffer, {
        foreignKey: 'id'
    });
    makeOffer.belongsTo(User, {
        foreignKey: 'buyer_id',
    });
    Product.hasMany(makeOffer, {
        foreignKey: 'id'
    });
    makeOffer.belongsTo(Product, {
        foreignKey: 'product_id',
    });

    const seller_id = req.params.seller_id;
    makeOffer.findAll({
        include: [
            {
                model: User,
                attributes: ["id", "name", "profile_pic"],
            }, {
                model: Product,
                attributes: ["end_date", "thumbnail_img", "name"],
            },
        ],
        where: { seller_id: seller_id }
    }).then(MakeOffer => {
        res.send({ MakeOffer });
    })
}

//Find All

const findAll = (req, res) => {
    makeOffer.findAll()
        .then(data => {
            res.send(data);
        })
}

//Delete

const delete_offer = (req, res) => {
    makeOffer.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.send({
            message: "success",
            status: true
        });
    })
}

/// Make Price Summary

const find_makeprice_summary = (req, res) => {
    const id = req.body.product_id;
    const address_id = req.body.address_id;
    Product.findAll({
        attributes: ["id", "name", "user_id", "thumbnail_img", "unit_price", "end_date"],
        where: { id: id }
    }).then(data => {
        Product.findOne({
            attributes: ["unit_price"],
            where: { id: id }
        }).then(Product_price => {
            Address.findAll({
                where: { id: address_id },
                attributes: ["id", "name", "user_id", "address", "city", "country", "phone", "postal_code"],
            }).then((data1) => {
                res.send({
                    Product: data,
                    Address: data1,
                    Before_Price: Product_price.unit_price,
                    Make_price: req.body.make_price,
                    Status: 2
                });
            })
        })
    })
}


module.exports = {
    makePriceCreate,
    getAllOffer,
    update_Offer,
    findAll_pending_offers,
    findAll_accept_offers,
    findAll_reject_offers,
    findAll,
    delete_offer,
    find_makeprice_summary
}

