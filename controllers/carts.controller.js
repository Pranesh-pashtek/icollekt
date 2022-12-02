const database = require("../config/db.sequalize");
const Carts = database.carts;
const Products = database.products;
const Address = database.addresses;
const Coupons = database.coupons;
const Product_taxes = database.product_taxes;
const Product_stock = database.product_stock;
const User = database.user;
const Parcel = database.product_parcel

// Update cart

exports.CartAddressUpdate = (req, res) => {
  var id = req.params.cart_id;
  const { address_id } = req.body;
  Carts.findOne({ where: { id: id } }).then(cart_data => {
    if (cart_data != null) {
      Carts.update({ address_id: address_id }, { where: { id: id } });
      res.status(201).json({
        result: true,
        message: "Cart address has been updated."
      })
    } else {
      res.status(200).json({
        result: false,
        message: "Cart is not found."
      })
    }
  })
}

// ChangeQuantity cart

exports.CartChangeQuantity = (req, res) => {
  var id = req.params.cart_id;
  Carts.findOne({ where: { id: id } }).then(data => {
    Product_stock.findOne({ where: { product_id: data.product_id } }).then(qty_data => {
      //console.log(qty_data,'dfsfds')
      if (qty_data.qty >= req.body.quantity) {
        Carts.update({ quantity: req.body.quantity }, { where: { id: id } }).then(cart_data => {
          res.status(201).json({
            result: true,
            message: "cart updated"
          })
        })
      } else {
        res.status(201).json({
          result: false,
          message: "Maximum available quantity reached"
        })
      }
    })
  })
}

// Cart Summary

/**
* Cart Summary based on owner_id
* @param {ObjectId} owner_id
* @returns {Promise<User>}
*/
exports.getCartSummary = (req, res) => {
  id = req.params.owner_id;
  user_id = req.params.user_id;
  var address_id = req.params.address_id;
  const shipping = req.params.shipping;
  const Shipping = parseFloat(shipping)
  Carts.findAll({ where: { owner_id: id, cart_status: 1, user_id: user_id } }).then((cart_data) => {
    if (cart_data.length < 0) {
      res.status(200).json({
        sub_total: 0.00,
        tax: 0.00,
        shipping_cost: 0.00,
        discount: 0.00,
        grand_total: 0.00,
        coupon_code: "",
        coupon_applied: false
      })
    } else {
      var finalData
      var Seller_Addressss = [];
      var productId = [], sub_total = []
      var seller_id, Coupon, Coupon_apply;
      var initial = 0, Total = 0, Tax = 0, Shipping_cost = Shipping, Discount = 0
      for (let k = 0; k < cart_data.length; k++) {
        productId.push(cart_data[k].product_id)
        seller_id = cart_data[k].owner_id
        sub_total.push(cart_data[k].price + cart_data[k].tax)
        Total = Total + sub_total
        Tax = Tax + cart_data[k].tax
        Shipping_cost = Shipping + cart_data[k].shipping_cost
        Discount = Discount + cart_data[k].discount
        Coupon = cart_data[k].coupon_code
        Coupon_apply = cart_data[k].coupon_applied
      }
      finalData = [];
      Products.findAll({ where: { id: productId }, attributes: ["id", "name", "user_id", "thumbnail_img", "unit_price", 'seller_address'], }).then((data) => {
        data.map((Seller_address) => {
          var Seller_Address = Seller_address.seller_address;
          var Seller_Addresss = parseInt(Seller_Address)
          Seller_Addressss.push(Seller_Addresss);
        })
        var Seller_Address = [...new Set(Seller_Addressss)]
        Address.findAll({ where: { id: address_id }, attributes: ["id", "address_id", "name", "user_id", "address", "city", "country", "phone", "postal_code"], }).then((data1) => {
          Address.findAll({ where: { id: Seller_Address }, attributes: ["id", "address_id", "name", "user_id", "address", "city", "country", "phone", "postal_code"], }).then((Seller_Address) => {
            Parcel.findAll({ where: { product_id: productId }, attributes: ["id", 'weight', "height", "width", "length", "product_id", "user_id"], }).then((parcel) => {
              var subTotal = sub_total.reduce((pre, curr) => pre + curr, initial)
              finalData.push({
                product: data,
                Buyer_Address: data1,
                Seller_Address: Seller_Address,
                Parcel: parcel,
                tax: Tax,
                shipping_cost: Shipping,
                discount: Discount / cart_data.length,
                grand_total: subTotal + Shipping - (Discount / cart_data.length),
                coupon_code: Coupon,
                coupon_applied: (Coupon_apply == 1) ? true : false,
                Seller_ids: seller_id,
                Status: 1
              })
              res.status(200).json({ Cart_Summary: finalData })
            })
          })
        })
      })
    }
  })
}


// exports.getCartSummary_for_one_product = (req, res) => {
//   var owner_id = req.body.owner_id;
//   var user_id = req.body.user_id;
//   var address_id = req.body.address_id;
//   var product_id = req.body.product_id;
//   Carts.findAll({ where: { owner_id: owner_id, cart_status: 1, user_id: user_id, product_id: product_id } }).then((cart_data) => {
//     if (cart_data.length < 0) {
//       res.status(200).json({
//         sub_total: 0.00,
//         tax: 0.00,
//         shipping_cost: 0.00,
//         discount: 0.00,
//         grand_total: 0.00,
//         coupon_code: "",
//         coupon_applied: false
//       })
//     } else {
//       var finalData
//       var productId = [], sub_total = []
//       var seller_id, Coupon, Coupon_apply;
//       var initial = 0, Total = 0, Tax = 0, Shipping_cost = 0, Discount = 0
//       for (let k = 0; k < cart_data.length; k++) {
//         productId.push(cart_data[k].product_id)
//         seller_id = cart_data[k].owner_id
//         sub_total.push(cart_data[k].price + cart_data[k].tax)
//         Total = Total + sub_total
//         Tax = Tax + cart_data[k].tax
//         Shipping_cost = Shipping_cost + cart_data[k].shipping_cost
//         Discount = Discount + cart_data[k].discount
//         Coupon = cart_data[k].coupon_code
//         Coupon_apply = cart_data[k].coupon_applied
//       }
//       finalData = []
//       Products.findAll({ where: { id: productId }, attributes: ["id", "name", "user_id", "thumbnail_img", "unit_price"], }).then((data) => {
//         Address.findAll({ where: { id: address_id }, attributes: ["id", "name", "user_id", "address", "city", "country", "phone", "postal_code"], }).then((data1) => {
//           var subTotal = sub_total.reduce((pre, curr) => pre + curr, initial)
//           finalData.push({
//             product: data,
//             Address: data1,
//             tax: Tax,
//             shipping_cost: Shipping_cost,
//             discount: Discount / cart_data.length,
//             grand_total: subTotal - (Discount / cart_data.length),
//             coupon_code: Coupon,
//             coupon_applied: (Coupon_apply == 1) ? true : false,
//             Seller_ids: seller_id
//           })
//           res.status(200).json({ Cart_Summary: finalData })
//         })
//       })
//     }
//   })
// }



// Cart List
/**
* Cart List based on user_id
* @param {ObjectId} user_id
* @returns {Promise<User>}
*/

exports.getCartList = async (req, res) => {
  var filtValue = []
  id = req.params.user_id;
  await Carts.findAll({
    where: { user_id: id }
  }).then(() => {
    Products.hasMany(Carts, {
      foreignKey: 'id'
    });
    Carts.belongsTo(Products, {
      foreignKey: 'product_id'
    });
    Carts.findAll({
      include: {
        model: Products,
        attributes: ["id", "name", "user_id", "thumbnail_img", "unit_price"],
        where: { approved: 1 }
      },
      order: [
        ["id", "DESC"]
      ],
      attributes: ["id", "price", "cart_status", "owner_id"],
      where: { user_id: id, cart_status: 1 }
    }).then((data) => {
      var collect = []
      data.map((ele) => {
        collect.push(ele.owner_id)
      })
      var iterate = collect.values();
      let setIterator = [...new Set(iterate)]
      var finalData;
      User.findAll({ attributes: ['id', "name", "profile_pic"], where: { id: setIterator } }).then((val) => {
        finalData = [];
        var filt = [],
          initial = 0
        var values = []
        setIterator.map((valuess) => {  
          values.push(valuess)
        })
        console.log(values,"uuuuuuuu");
        // for (const value of setIterator) {
          var setName = "", setProfile = "", setId = "", setPrice = [], setProduct = []
          var filtName = val.filter((e) => (e.id == value))
          filtName.map((e) => (setName = e.name, setProfile = e.profile_pic, setId = e.id))
          filt = data.filter((ele) => (ele.owner_id == value))
          filt.map((ele) => (setPrice.push(ele.price), setProduct.push(ele.product)))
          var calcPrice = setPrice.reduce((pre, curr) => pre + curr, initial)
          filtValue.push({ data: { Name: setName, price: calcPrice, profile: setProfile, Id: setId, product: setProduct } })
          // if (succeed) return result;
        // }
        
      })
    })
  })
setTimeout(() => { res.status(200).json({ cart_data: filtValue }); }, 500);
  
}











// ------------------------------------------- server code-----------------------------------------//

// // Cart List
// /**
// * Cart List based on user_id
// * @param {ObjectId} user_id
// * @returns {Promise<User>}
// */

// exports.getCartList = async (req, res) => {
//   id = req.params.user_id;
//   await Carts.findAll({
//     where: { user_id: id }
//   }).then(() => {
//     Products.hasMany(Carts, {
//       foreignKey: 'id'
//     });
//     Carts.belongsTo(Products, {
//       foreignKey: 'product_id'
//     });
//     Carts.findAll({
//       include: {
//         model: Products,
//         attributes: ["id", "name", "user_id", "thumbnail_img", "unit_price"],
//       },
//       order: [
//         ["id", "DESC"]
//       ],
//       attributes: ["id", "price", "cart_status", "owner_id"],
//       where: { user_id: id, cart_status: 1 }
//     }).then((data) => {
//       var collect = []
//       data.map((ele) => {
//         collect.push(ele.owner_id)
//       })
//       var iterate = collect.values();
//       let setIterator = [...new Set(iterate)]
//       var finalData;
//       User.findAll({ attributes: ['id', "name", "profile_pic"], where: { id: setIterator } }).then((val) => {
//         finalData = [];
//         var filt = [], filtValue = [], initial = 0
//         for (const value of setIterator) {
//           var setName = "", setProfile = "", setId = "", setPrice = [], setProduct = []
//           var filtName = val.filter((e) => (e.id == value))
//           filtName.map((e) => (setName = e.name, setProfile = e.profile_pic, setId = e.id))
//           filt = data.filter((ele) => (ele.owner_id == value))
//           filt.map((ele) => (setPrice.push(ele.price), setProduct.push(ele.product)))
//           var calcPrice = setPrice.reduce((pre, curr) => pre + curr, initial)
//           filtValue.push({ data: { Name: setName, price: calcPrice, profile: setProfile, Id: setId, product: setProduct } })
//         }
//         setTimeout(() => { res.status(200).json({ cart_data: filtValue }); }, 600);
//       })
//     })
//   })
// }

// ------------------------------------------- server code-----------------------------------------//


// // var array = ['a', 'b', 'c', 'd', 'e', 'f'];
// var array = [1, 2, 3, 4, 5, 6];
// var data = array.toString();
// console.log(data);

// const arrString = [1,2, 3, 4, 5];
// const arrInteger = arrString.map(x => Number.parseInt(x, 10));
// console.log(arrInteger);




// Delete_Cart

exports.CartDestroyed = (req, res) => {
  var user_id = req.body.user_id;
  var product_id = req.body.product_id;
  Carts.destroy({ where: { user_id: user_id, product_id: product_id } }).then(data => {
    res.status(200).json({
      result: true,
      message: "Cart has been deleted successfully."
    })
  })
}

// Bulk cart Delete

exports.BulkCartDelete = (req, res) => {
  var user_id = req.body.user_id;
  var owner_id = req.body.owner_id;
  Carts.destroy({ where: { user_id: user_id, owner_id: owner_id } }).then(data => {
    res.status(200).json({
      result: true,
      message: "Cart Deleted"
    })
  })
}

//AllDelete

exports.AllDelete = (req, res) => {
  var user_id = req.params.user_id;
  Carts.destroy({ where: { user_id: user_id } }).then(data => {
    res.status(200).json({
      result: true,
      message: "All Cart Deleted"
    })
  })
}



// Addcart

exports.AddCart = (req, res) => {
  Products.findOne(
    {
      attributes: ["id", "name", "user_id", "photos", "unit_price"],
      where: { id: req.body.product_id }
    }
  ).then((data) => {
    Carts.findOne(
      {
        attributes: ["user_id", "product_id"],
        where: { product_id: req.body.product_id, user_id: req.body.user_id }
      }
    ).then((datas) => {
      if (datas == null) {
        Carts.create({
          user_id: req.body.user_id,
          product_id: data.id,
          owner_id: data.user_id,
          quantity: 1,
          cart_status: 1,
          price: data.unit_price,
        }).then((data1) => {
          setTimeout(() => {
            res.json({
              result: true,
              message: "Product Add To Cart successfully"
            });
          }, 200)
        })
      }
      else {
        setTimeout(() => {
          res.json({
            result: false,
            message: "Product Is Already In Cart"
          })
        }, 200)
      }
    })
  })
}


// Add copon
exports.AddCopon = (req, res) => {
  Coupons.findOne(
    {
      attributes: ["id", "type", "user_id", "details", "discount", "discount_type", "code"],
      where: { id: req.body.Coupons_id }
    }
  ).then((data) => {
    const userData = {
      coupon_code: data.code,
      coupon_applied: 1,
      discount: data.discount,
    };
    Carts.update(
      userData,
      {
        where: { user_id: req.body.user_id }
      }).then((data1) => {
        res.json({
          result: true,
          message: "Coupon added successfully"
        });
      })
  })
}

// Delete Coupon
exports.Coupon_delete = (req, res) => {
  const userData = {
    coupon_code: null,
    coupon_applied: 0,
    discount: 0,
  };
  Carts.update(
    userData,
    {
      where: { user_id: req.body.user_id }
    })
    .then(() => {
      res.json({
        result: true,
        message: "Coupon Deleted successfully"
      });
    })
}


exports.GET_Parcel_Details = (req, res) => {
  const owner_id = req.params.owner_id;
  const user_id = req.params.user_id;
  const product_id = [];
  var weight = 0;
  var height = 0;
  var width = 0;
  var length = 0;
  var Owner_Address_id = [];
  var User_Address_id = [];
  Carts.findAll(
    {
      attributes: ["product_id"],
      where: { owner_id: owner_id, user_id: user_id }
    }
  ).then((Cart) => {
    Cart.map((Carts) => {
      const product_ids = Carts.product_id;
      product_id.push(product_ids);
    })
    Parcel.findAll({
      attributes: ['weight', "height", "width", "length"],
      where: { product_id: product_id },
    }).then((parcel) => {
      parcel.map((parcels) => {
        weight = parseInt(weight) + parseInt(parcels.weight);
        height = parseInt(height) + parseInt(parcels.height);
        width = parseInt(width) + parseInt(parcels.width);
        length = parseInt(length) + parseInt(parcels.length);
      })
      Address.findOne({ where: { user_id: owner_id }, attributes: ["address_id"], }).then((Owner_Address) => {
        if (Owner_Address == null) {
          Owner_Address_id.push();
        } else {
          Owner_Address_id.push(Owner_Address);
        }
        Address.findOne({ where: { user_id: user_id }, attributes: ["address_id"], }).then((User_Address) => {
          if (User_Address == null) {
            User_Address_id.push();
          } else {
            User_Address_id.push(User_Address);
          }
          res.send({
            weight: weight,
            height: height,
            width: width,
            length: length,
            Owner_address_id: Owner_Address_id,
            User_address_id: User_Address_id
          })
        })
      })
    })
  })
}

// Make_An_Offer_Add_to_Cart

exports.Make_An_Offer_Add_to_Cart = (req, res) => {
  Products.findOne(
    {
      attributes: ["id", "name", "user_id", "photos", "unit_price"],
      where: { id: req.body.product_id }
    }
  ).then((data) => {
    Carts.findOne(
      {
        attributes: ["user_id", "product_id"],
        where: { product_id: req.body.product_id, user_id: req.body.user_id }
      }
    ).then((datas) => {
      if (datas == null) {
        Carts.create({
          user_id: req.body.user_id,
          product_id: data.id,
          owner_id: data.user_id,
          quantity: 1,
          cart_status: 1,
          price: req.body.price,
        }).then((data1) => {
          setTimeout(() => {
            res.json({
              result: true,
              message: "Product Add To Cart successfully"
            });
          }, 200)
        })
      }
      else {
        setTimeout(() => {
          res.json({
            result: false,
            message: "Product Is Already In Cart"
          });
        }, 200)
      }
    })
  })
}


exports.findAll = async (req, res) => {
  Carts.findAll()
    .then(data => {
      res.send(data);
    })
}