const database = require("../config/db.sequalize");
const Product_db = database.products;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require("../config/db.sequalize");
const User = database.user;
const Hashtags = database.hashtags;
const Like_products = database.like_products;
const { Op, where } = require('sequelize');
var Sequelize = require('sequelize');
const Product_Comment = database.product_comments;
const Product_Like_comments = database.product_like_comments
const makeOffer = database.makeOffer;
const Parcel = database.product_parcel
const Carts = database.carts;
const fs = require('fs');
const { invoiceTemplate } = require("paypal-rest-sdk");
const { admin } = require('../config/firebase.config')
exports.new = (req, res) => {
  Product_db.create({
    name: req.body.name,
    added_by: req.body.added_by,
    user_id: req.body.user_id,
    category_id: req.body.category_id,
    brand_id: req.body.brand_id,
    photos: req.body.photos,
    thumbnail_img: req.body.thumbnail_img,
    video_provider: req.body.video_provider,
    video_link: req.body.video_link,
    tags: req.body.tags,
    description: req.body.description,
    unit_price: req.body.unit_price,
    purchase_price: req.body.purchase_price,
    variant_product: req.body.variant_product,
    attributes: req.body.attributes,
    choice_options: req.body.choice_options,
    colors: req.body.colors,
    variations: req.body.variations,
    todays_deal: req.body.todays_deal,
    published: req.body.published,
    approved: req.body.approved,
    stock_visibility_state: req.body.stock_visibility_state,
    cash_on_delivery: req.body.cash_on_delivery,
    featured: req.body.featured,
    seller_featured: req.body.seller_featured,
    current_stock: req.body.current_stock,
    unit: req.body.unit,
    min_qty: req.body.min_qty,
    low_stock_qty: req.body.low_stock_qty,
    discount: req.body.discount,
    discount_type: req.body.discount_type,
    discount_start_date: req.body.discount_start_date,
    discount_end_date: req.body.discount_end_date,
    tax: req.body.tax,
    tax_type: req.body.tax_type,
    shipping_type: req.body.shipping_type,
    shipping_cost: req.body.shipping_cost,
    is_quantity_multiplied: req.body.is_quantity_multiplied,
    est_shipping_days: req.body.est_shipping_days,
    num_of_sale: req.body.num_of_sale,
    meta_title: req.body.meta_title,
    meta_description: req.body.meta_description,
    meta_image: req.body.meta_image,
    pdf: req.body.pdf,
    slug: req.body.slug,
    rating: req.body.rating,
    bar_code: req.body.bar_code,
    digital: req.body.digital,
    auction_product: req.body.auction_product,
    file_name: req.body.file_name,
    file_path: req.body.file_path,
    gallery_img: req.body.gallery_img,
    external_link: req.body.external_link,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    product_type: req.body.product_type
  })

    .then(user => {
      res.json(user);
    }).catch(err => {
      res.status(500).json(err);
    })
}


exports.findAll = (req, res) => {
  Product_db.findAll(
    {
      attributes: ['id', 'name', 'tags', 'description', 'unit_price', 'org_img', 'thumbnail_img', 'photos', 'product_type']
    }
  )
    .then(data => {
      res.send({ data });
    })
}



exports.findOne = async (req, res) => {
  let tags = [];
  await Product_db.findOne({
    attributes: ['tags'],
    where: { id: req.params.id }
  }).then(data => {
    if (data.tags != null) {
      let inputStr = data.tags;
      let outputStr = inputStr.split(',');
      for (var i = 0; i < outputStr.length; i++) {
        console.log(outputStr[i], "data");
        Hashtags.findOne(
          {
            attributes: ['name'],
            where: { id: [outputStr[i]] },
          }).then(data => {
            data = data.name
            tags.push(data);
          })
      }
    } else {
      tags.push(null)
    }
    setTimeout(() => {
      res.status(200).json({ Hashtag: "" + tags + "" });
    }, 200);
  })
};

exports.findCategory = (req, res) => {
  const cid = req.params.category_id;
  Product_db.findAll(
    {
      where: { category_id: cid },
      attributes: ['id', 'name', 'added_by', 'user_id', 'category_id', 'brand_id', 'photos', 'thumbnail_img', 'video_provider', 'video_link', 'tags', 'description', 'unit_price', 'purchase_price', 'variant_product', 'attributes', 'choice_options', 'colors', 'variations', 'todays_deal', 'approved', 'stock_visibility_state', 'cash_on_delivery', 'featured', 'seller_featured', 'current_stock', 'unit', 'min_qty', 'low_stock_quantity', 'discount', 'discount_type', 'discount_start_date', 'discount_end_date', 'tax', 'tax_type', 'shipping_type', 'shipping_cost', 'is_quantity_multiplied', 'est_shipping_days', 'num_of_sale', 'meta_title', 'meta_description', 'meta_img', 'pdf', 'slug', 'rating', 'barcode', 'digital', 'auction_product', 'file_name', 'file_path', 'external_link', 'created_at', 'updated_at', 'product_type']
    })
    .then(data => {
      res.send(data);
    })
}
// exports.findCategory = (req, res) => {
// const cid = req.body.category_id;
//   Product_db.findAll(
//   {
//       where:{category_id:cid},
//       attributes:['id','name','added_by','user_id','category_id','brand_id','photos','thumbnail_img','video_provider', 'video_link','tags','description','unit_price','purchase_price','variant_product','attributes','choice_options','colors','variations','todays_deal','approved','stock_visibility_state','cash_on_delivery','featured','seller_featured','current_stock','unit','min_qty','low_stock_quantity','discount','discount_type','discount_start_date','discount_end_date','tax','tax_type','shipping_type','shipping_cost','is_quantity_multiplied','est_shipping_days','num_of_sale','meta_title','meta_description','meta_img','pdf','slug','rating','barcode','digital','auction_product','file_name','file_path','external_link','created_at','updated_at']        })
//     .then(data => {
//     res.send(data);
//   })
// }

exports.findBrand = (req, res) => {
  const bid = req.params.brand_id;
  Product_db.findAll(
    {
      where: { brand_id: bid },
      attributes: ['id', 'name', 'added_by', 'user_id', 'category_id', 'brand_id', 'photos', 'thumbnail_img', 'video_provider', 'video_link', 'tags', 'description', 'unit_price', 'purchase_price', 'variant_product', 'attributes', 'choice_options', 'colors', 'variations', 'todays_deal', 'approved', 'stock_visibility_state', 'cash_on_delivery', 'featured', 'seller_featured', 'current_stock', 'unit', 'min_qty', 'low_stock_quantity', 'discount', 'discount_type', 'discount_start_date', 'discount_end_date', 'tax', 'tax_type', 'shipping_type', 'shipping_cost', 'is_quantity_multiplied', 'est_shipping_days', 'num_of_sale', 'meta_title', 'meta_description', 'meta_img', 'pdf', 'slug', 'rating', 'barcode', 'digital', 'auction_product', 'file_name', 'file_path', 'external_link', 'created_at', 'updated_at', 'product_type']
    })
    .then(data => {
      res.send(data);
    })
}

exports.findDeal = (req, res) => {
  const deal = req.params.todays_deal;
  Product_db.findAll(
    {
      where: { todays_deal: deal },
      attributes: ['id', 'name', 'added_by', 'user_id', 'category_id', 'brand_id', 'photos', 'thumbnail_img', 'video_provider', 'video_link', 'tags', 'description', 'unit_price', 'purchase_price', 'variant_product', 'attributes', 'choice_options', 'colors', 'variations', 'todays_deal', 'approved', 'stock_visibility_state', 'cash_on_delivery', 'featured', 'seller_featured', 'current_stock', 'unit', 'min_qty', 'low_stock_quantity', 'discount', 'discount_type', 'discount_start_date', 'discount_end_date', 'tax', 'tax_type', 'shipping_type', 'shipping_cost', 'is_quantity_multiplied', 'est_shipping_days', 'num_of_sale', 'meta_title', 'meta_description', 'meta_img', 'pdf', 'slug', 'rating', 'barcode', 'digital', 'auction_product', 'file_name', 'file_path', 'external_link', 'created_at', 'updated_at', 'product_type']
    })
    .then(data => {
      res.send(data);
    })
}

exports.sellerFeatured = (req, res) => {
  const featured = req.params.seller_featured;
  Product_db.findAll(
    {
      where: { seller_featured: featured },
      attributes: ['id', 'name', 'added_by', 'user_id', 'category_id', 'brand_id', 'photos', 'thumbnail_img', 'video_provider', 'video_link', 'tags', 'description', 'unit_price', 'purchase_price', 'variant_product', 'attributes', 'choice_options', 'colors', 'variations', 'todays_deal', 'approved', 'stock_visibility_state', 'cash_on_delivery', 'featured', 'seller_featured', 'current_stock', 'unit', 'min_qty', 'low_stock_quantity', 'discount', 'discount_type', 'discount_start_date', 'discount_end_date', 'tax', 'tax_type', 'shipping_type', 'shipping_cost', 'is_quantity_multiplied', 'est_shipping_days', 'num_of_sale', 'meta_title', 'meta_description', 'meta_img', 'pdf', 'slug', 'rating', 'barcode', 'digital', 'auction_product', 'file_name', 'file_path', 'external_link', 'created_at', 'updated_at', 'product_type']
    })
    .then(data => {
      res.send(data);
    })
}

exports.findHome = (req, res) => {
  Product_db.findAll(
    {
      attributes: ['id', 'name', 'photos', 'thumbnail_img', 'unit_price', 'purchase_price', 'todays_deal', 'featured', 'unit', 'discount', 'discount_type', 'rating', 'external_link', 'product_type']
    })
    .then(data => {
      res.send(data);
    })
}

// Delete
exports.delete = (req, res) => {
  Product_db.destroy({
    where: { id: req.params.id }
  }).then((Product_delete) => {
    Like_products.destroy({
      where: { product_id: req.params.id }
    }).then((Product_like_delete) => {
      Product_Comment.destroy({
        where: { product_id: req.params.id }
      }).then((Product_Comment_delete) => {
        Product_Like_comments.destroy({
          where: { product_id: req.params.id }
        }).then((Product_Like_comments_delete) => {
          makeOffer.destroy({
            where: { product_id: req.params.id }
          }).then((Product_makeOffer_delete) => {
            Carts.destroy({
              where: { product_id: req.params.id }
            }).then((Product_cart_delete) => {
            })
          })
        })
      })
    })
  })
  res.send({ status: true, Message: "success" });
}

exports.update = (req, res) => {
  Product_db.update(
    {
      id: req.body.id,
      name: req.body.name,
      added_by: req.body.added_by,
      user_id: req.body.user_id,
      category_id: req.body.category_id,
      brand_id: req.body.brand_id,
      photos: req.body.photos,
      thumbnail_img: req.body.thumbnail_img,
      video_provider: req.body.video_provider,
      video_link: req.body.video_link,
      tags: req.body.tags,
      description: req.body.description,
      unit_price: req.body.unit_price,
      purchase_price: req.body.purchase_price,
      variant_product: req.body.variant_product,
      attributes: req.body.attributes,
      choice_options: req.body.choice_options,
      colors: req.body.colors,
      variations: req.body.variations,
      todays_deal: req.body.todays_deal,
      published: req.body.published,
      approved: req.body.approved,
      stock_visibility_state: req.body.stock_visibility_state,
      cash_on_delivery: req.body.cash_on_delivery,
      featured: req.body.featured,
      seller_featured: req.body.seller_featured,
      current_stock: req.body.current_stock,
      unit: req.body.unit,
      min_qty: req.body.min_qty,
      low_stock_qty: req.body.low_stock_qty,
      discount: req.body.discount,
      discount_type: req.body.discount_type,
      discount_start_date: req.body.discount_start_date,
      discount_end_date: req.body.discount_end_date,
      tax: req.body.tax,
      tax_type: req.body.tax_type,
      shipping_type: req.body.shipping_type,
      shipping_cost: req.body.shipping_cost,
      is_quantity_multiplied: req.body.is_quantity_multiplied,
      est_shipping_days: req.body.est_shipping_days,
      num_of_sale: req.body.num_of_sale,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      meta_image: req.body.meta_image,
      pdf: req.body.pdf,
      slug: req.body.slug,
      rating: req.body.rating,
      bar_code: req.body.bar_code,
      digital: req.body.digital,
      auction_product: req.body.auction_product,
      file_name: req.body.file_name,
      file_path: req.body.file_path,
      gallery_img: req.body.gallery_img,
      external_link: req.body.external_link,
      created_at: req.body.created_at,
      updated_at: req.body.updated_at,
      product_type: req.body.product_type,
    },
    { where: { id: req.body.id } })
    .then((data) => {
      res.send(data);
    })
}

// exports.findProdByUserId = (req, res) => {
//   User.hasMany(Product_db, {
//     foreignKey: 'user_id'
//   });

//   Product_db.belongsTo(User, {
//     foreignKey: 'user_id',
//     targetKey: 'id'
//   });
//   const id = req.params.id;
//   User.findOne({

//     include: [{
//       model: Product_db,
//       required: true
//     }],
//     attributes: ["id", "name", "email", "profile_pic"],
//     where: { id: id }
//   })

//     .then(data => {
//       console.log(data,"jjjjjjjjjjj");
//       // res.send(data);
//     }).catch(err => {
//       console.log(err);
//       return res.status(500).json(err)
//     });
// }

exports.findProdByCategoryId = (req, res) => {
  Categories.hasMany(Product_db, {
    foreignKey: 'category_id'
  });

  Product_db.belongsTo(User, {
    foreignKey: 'category_id',
    targetKey: 'id'
  });
  const id = req.params.id;
  Categories.findOne({

    include: [{
      model: Product_db,
      required: true
    }],
    attributes: ["id", "name",],
    where: { id: id }
  })

    .then(data => {
      res.send(data);
    }).catch(err => {
      console.log(err);
      return res.status(500).json(err)
    });
}


exports.findProdByBrandId = (req, res) => {
  Brands.hasMany(Product_db, {
    foreignKey: 'brand_id'
  });

  Product_db.belongsTo(Brands, {
    foreignKey: 'brand_id',
    targetKey: 'id'
  });
  const id = req.params.id;
  Brands.findOne({
    include: [{
      model: Product_db,
      required: true
    }],
    attributes: ["id", "name", "logo"],
    where: { id: id }
  })

    .then(data => {
      res.send(data);
    }).catch(err => {
      console.log(err);
      return res.status(500).json(err)
    });
}



// // image upload multer
// exports.upload = (req, res) => {
//   let url = [];
//   const id = req.params.user_id;
//   req.files.map((images, index) => {
//     const data = " '" + `http://localhost:3001/post_images/${images.filename}` + "' ";

//     url.push(data);

//   });
//   // Product_db.findOne({
//   //   attributes: ["photos"],
//   //   where: {
//   //     id: id
//   //   }
//   // }).then((data) => {
//   //   if (data.photos !== null) {
//   // let url = data.photos;
//   // let filename = url.split('/').pop();
//   // let photo = filename.replace(/['"]+/g, '')

//   // fs.unlink(`./upload/post_images/${photo}`, function (err) {
//   //   if (err) throw err;
//   //   console.log('File deleted!');
//   // });
//   Product_db.update(
//     {
//       added_by: req.body.added_by,
//       photos: "'" + url + "'",
//       status: 1,
//     },
//     { where: { user_id: id } }
//   )
//     .then((user) => {
//       res.json({
//         success: 1,
//         photos_url: url,
//       });
//     })
//     .catch((err) => {
//       res.status(200).json(err);
//     })
//   // } else {

//   // Product_db.update(

//   //   {
//   //     added_by: req.body.added_by,
//   //     photos: "'" + url + "'",
//   //     status: 1,
//   //   },
//   //   { where: { user_id: user_id } }
//   // )
//   //   .then((user) => {

//   //     res.json({
//   //       success: 1,
//   //       photos_url: url,
//   //     });
//   //   })
//   //   .catch((err) => {
//   //     res.status(200).json(err);
//   //   })
//   // }

//   // });
// };

// Product Filter By Tags

// exports.filterbyTags = (req, res) => {
//   let response = [];
//   function myFunction(newArray) {
//     for (var j = 0; j < newArray.length; j++) {
//       response.push(newArray[j][0].id)
//     }
//   }
//   let final = [];
//   User.findAll({
//     attributes: ["hashtags"],
//     where: { id: req.body.Userid }
//   }).then(dataa => {
//     if (dataa[0] && dataa[0].dataValues.hashtags == null) {
//       Product_db.hasMany(Like_products, {
//         foreignKey: "product_id",
//       });
//       Like_products.belongsTo(Product_db, {
//         foreignKey: "product_id",
//       });
//       outputStr = [];
//       Product_db.findAll({
//         attributes: ['id'],
//       }).then(data => {
//         for (var j = 0; j < data.length; j++) {
//           let inputStr = data[j] && data[j].dataValues.id;
//           outputStr.push(inputStr)
//           Product_db.findOne({
//             include: {
//               model: Like_products,
//               attributes: ["id", "user_id", "product_id", "likes", "status"],
//             },
//             attributes: ["id", "name", "tags", "description", "unit_price", "photos", "product_type", "likecount"],
//             where: { id: outputStr[j] }
//           }).then(output => {
//             final.push(output);
//           })
//         }
//       })
//     } else {
//       let inputStr = dataa[0] && dataa[0].dataValues.hashtags;
//       let outputStr = inputStr.split(',');
//       Product_db.findAll({
//         attributes: ["id", "tags"],
//       }).then(data => {
//         var newArr = data.map(function (item) {
//           return [{ "id": item.id, "tags": item.tags }];
//         });
//         for (let i = 0; i < outputStr.length; i++) {
//           console.log(outputStr,"huhuhuhuhuhuhuhuuh");
//           var newArray = newArr.filter(function (el) {
//             return (el[0].tags).match(outputStr[i])
//           });
//           myFunction(newArray);
//         }
//         const unique = Array.from(new Set(response))
//         const resid = unique.sort(function (a, b) { return a - b });
//         if (resid.length > 2) {
//           for (var k = 0; k < resid.length; k++) {
//             Product_db.hasMany(Like_products, {
//               foreignKey: "product_id",
//             });
//             Like_products.belongsTo(Product_db, {
//               foreignKey: "product_id",
//             });
//             Product_db.findOne({
//               include: {
//                 model: Like_products,
//                 attributes: ["id", "user_id", "product_id", "likes", "status"],
//               },
//               attributes: ["id", "name", "tags", "description", "unit_price", "thumbnail_img", "product_type", "likecount"],
//               where: { id: resid[k] }
//             }).then(output => {
//               final.push(output);
//             })
//           }
//         }
//         else {
//           outputStr = [];
//           Product_db.findAll({
//             attributes: ['id'],
//           }).then(data => {
//             for (var j = 0; j < data.length; j++) {
//               Product_db.hasMany(Like_products, {
//                 foreignKey: "product_id",
//               });
//               Like_products.belongsTo(Product_db, {
//                 foreignKey: "product_id",
//               });
//               let inputStr = data[j] && data[j].dataValues.id;
//               outputStr.push(inputStr)
//               Product_db.findOne({
//                 include: {
//                   model: Like_products,
//                   attributes: ["id", "user_id", "product_id", "likes", "status"],
//                 },
//                 attributes: ["id", "name", "tags", "description", "unit_price", "thumbnail_img", "product_type", "likecount"],
//                 where: { id: outputStr[j] }
//               }).then(output => {
//                 final.push(output);
//               })
//             }
//           })
//         }
//       })
//     }
//     setTimeout(() => {
//       const data = { final: final };
//       const finaloutput = data["final"];
//       finaloutput.sort((a, b) => {
//         if (a.likecount < b.likecount) return 1;
//         if (a.likecount > b.likecount) return -1;
//         if (a.id < b.id) return 1;
//         if (a.id > b.id) return -1;
//         return 0;
//       });
//       res.status(200).json({ finaloutput });
//     }, 200);
//   })

// }



exports.filterbyTags = (req, res) => {
  let response = [];
  async function myFunction(newArray) {
    for (var j = 0; j < newArray.length; j++) {
      response.push(newArray[j][0].id)
    }
  }
  let final = [];

  console.log(final, "kokokok");
  User.findAll({
    attributes: ["hashtags"],
    where: { id: req.body.Userid }
  }).then(dataa => {
    if (dataa[0] && dataa[0].dataValues.hashtags == null) {
      Product_db.hasMany(Like_products, {
        foreignKey: "product_id",
      });
      Like_products.belongsTo(Product_db, {
        foreignKey: "product_id",
      });
      outputStr = [];
      Product_db.findAll({
        attributes: ['id'],
      }).then(data => {
        for (var j = 0; j < data.length; j++) {
          let inputStr = data[j] && data[j].dataValues.id;
          outputStr.push(inputStr)
          Product_db.findOne({
            include: {
              model: Like_products,
              attributes: ["id", "user_id", "product_id", "likes", "status"],
            },
            attributes: ["id", "name", "tags", "description", "unit_price", "photos", "product_type", "likecount"],
            limit: 5,
            where: { id: outputStr[j], approved: 1 },
          }).then(output => {
            // let output = outputs.filter((ele) => (ele != null))
            final.push(output);
          })
        }
      })
    } else {
      let inputStr = dataa[0] && dataa[0].dataValues.hashtags;
      let outputStr = inputStr.split(',');
      Product_db.findAll({
        attributes: ["id", "tags"],
      }).then(data => {
        var newArr = data.map(function (item) {
          // console.log(item, 'kokokokokok');
          return [{ "id": item.id, "tags": item.tags }];
        });
        for (let i = 0; i < outputStr.length; i++) {
          var newArray = newArr.filter(function (el) {
            return (el[0].tags).match(outputStr[i])
          });
          myFunction(newArray);
        }
        const unique = Array.from(new Set(response))
        const resid = unique.sort(function (a, b) { return a - b });
        if (resid.length > 2) {
          for (var k = 0; k < resid.length; k++) {
            Product_db.hasMany(Like_products, {
              foreignKey: "product_id",
            });
            Like_products.belongsTo(Product_db, {
              foreignKey: "product_id",
            });
            Product_db.findOne({
              include: {
                model: Like_products,
                attributes: ["id", "user_id", "product_id", "likes", "status"],
              },
              attributes: ["id", "name", "tags", "description", "unit_price", "thumbnail_img", "product_type", "likecount"],
              limit: 5,
              where: { id: resid[k], approved: 1 },
            }).then(output => {
              // let output = outputs.filter((ele) => (ele != null))
              final.push(output);
            })
          }
        }
        else {
          outputStr = [];
          Product_db.findAll({
            attributes: ['id'],
          }).then(data => {
            for (var j = 0; j < data.length; j++) {
              Product_db.hasMany(Like_products, {
                foreignKey: "product_id",
              });
              Like_products.belongsTo(Product_db, {
                foreignKey: "product_id",
              });
              let inputStr = data[j] && data[j].dataValues.id;
              outputStr.push(inputStr)
              Product_db.findOne({
                include: {
                  model: Like_products,
                  attributes: ["id", "user_id", "product_id", "likes", "status"],
                },
                attributes: ["id", "name", "tags", "description", "unit_price", "thumbnail_img", "product_type", "likecount"],
                limit: 5,
                where: { id: outputStr[j], approved: 1 },
              }).then(output => {
                // let output = outputs.filter((ele) => (ele != null))
                final.push(output);
              })
            }
          })
        }
      })
    }
    setTimeout(() => {
      let finals = final.filter((ele) => (ele != null))
      const data = { final: finals };
      const finaloutput = data["final"];
      finaloutput.sort((a, b) => {
        // if (a.likecount < b.likecount) return 1;
        // if (a.likecount > b.likecount) return -1;
        if (a.id < b.id) return 1;
        if (a.id > b.id) return -1;
        return 0;
      });
      // var Buffers = Buffer.from(finaloutput)
      res.json({ finaloutput });
    }, 500);
  })

}



// exports.filterbyTags = (req, res) => {
// function myFunction(newArray) {
//   for (var j = 0; j < newArray.length; j++) {
//     response.push(newArray[j][0].id)
//   }
// }
// let response = [];
//   let finaloutput = [];
//   User.findAll({
//     attributes: ["hashtags"],
//     where: { id: req.body.Userid }
//   }).then(dataa => {

//     let inputStr = dataa[0] && dataa[0].dataValues.hashtags;
//     let outputStr = inputStr.split(',');

//     Product_db.findAll({
//       attributes: ["id", "tags"],
//     }).then(data => {

//       var newArr = data.map(function (item) {
//         return [{ "id": item.id, "tags": item.tags }];
//       });

//       for (let i = 0; i < outputStr.length; i++) {
//         var newArray = newArr.filter(function (el) {
//           return (el[0].tags).match(outputStr[i])
//         });
//         myFunction(newArray);

//       }
//       const unique = Array.from(new Set(response))
//       const resid = unique.sort(function (a, b) { return a - b });
//       for (var k = 0; k < resid.length; k++) {
//         Product_db.findOne({
//           attributes: ['id', 'name', 'tags', 'description', 'unit_price', 'thumbnail_img', 'photos', 'product_type'],
//           where: { id: resid[k] }
//         }).then(output => {
//           finaloutput.push(output);
//         })
//       }
//       setTimeout(() => {
//         res.status(200).json({ finaloutput });
//       }, 200);
//     })

//   })

// }







// Product Top Week

exports.TopWeekproducts = (req, res) => {

  const endDate = new Date();
  first = endDate.toJSON();
  const startedDate = new Date(new Date().setDate(new Date().getDate() - 7));
  last = startedDate.toJSON()

  Product_db.findAll({
    attributes: ["id"]
  }).then((data) => {

    var ids = data.map(function (item) {
      return item.id;
    });

    for (i = 0; i < ids.length; i++) {

      Like_products.findAll({
        attributes: ["id", "product_id"],
        where: {
          "createdAt": { [Op.between]: [last, first] },
          product_id: ids[i],
          status: 1
        }
      }).then((data1) => {

        if (data1 != "") {

          let count = data1.length;

          Product_db.update(

            {
              thisweek_like: count
            },
            { where: { id: data1[0].product_id } }).then((data3) => {

            })

        }

      })
    }
    Product_db.hasMany(Like_products, {
      foreignKey: "product_id",
    });
    Like_products.belongsTo(Product_db, {
      foreignKey: "product_id",
    });
    Product_db.findAll(
      {
        include: {
          model: Like_products,
          attributes: ["id", "user_id", "product_id", "likes", "status"],
          where: {
            "createdAt": { [Op.between]: [last, first] },
            status: 1,
          }
        },
        attributes: ["id", "name", "tags", "description", "unit_price", "org_img", "photos", "product_type", "likecount", "thisweek_like"],
        order: [
          ['thisweek_like', 'DESC'],
          ['id', 'DESC'],
        ],
        where: { approved: 1 }
      }).then((topweek) => {
        res.status(200).json({ topweek });
      }).catch(err => {
        return res.status(500).json(err)
      });

  })

}

exports.findtoptenProducts = (req, res) => {

  Product_db.findAll({
    attributes: ["id", "name", "photos", "likecount", "created_at", "updated_at"],
    order: [
      [[Sequelize.col("likecount"), 'DESC']]
    ],
    where: { approved: 1 },
    limit: 10
  }).then(data => {
    res.send(data);
  }).catch(err => {
    console.log(err);
    return res.status(500).json(err)
  })
}


exports.findBymonths = (req, res) => {
  var date = new Date();
  var first_date = new Date(date);
  first_date.setUTCDate(1);
  first = first_date.toJSON();
  var last_date = new Date(first_date);
  last_date.setUTCMonth(last_date.getUTCMonth() + 1);
  last_date.setUTCDate(0);
  last = last_date.toJSON();

  Product_db.findAll({
    attributes: ["id"]
  }).then((data) => {

    var ids = data.map(function (item) {
      return item.id;
    });

    for (i = 0; i < ids.length; i++) {

      Like_products.findAll({
        attributes: ["id", "product_id"],
        where: {
          "createdAt": { [Op.between]: [first, last] },
          product_id: ids[i],
          status: 1
        }
      }).then((data1) => {

        if (data1 != "") {
          let count = data1.length
          Product_db.update(
            {
              thismonth_like: count
            },
            { where: { id: data1[0].product_id } })
        }

      })
    }
    Product_db.hasMany(Like_products, {
      foreignKey: "product_id",
    });
    Like_products.belongsTo(Product_db, {
      foreignKey: "product_id",
    });
    Product_db.findAll(
      {
        include: {
          model: Like_products,
          attributes: ["id", "user_id", "product_id", "likes", "status"],
          where: {
            "createdAt": { [Op.between]: [first, last] },
            status: 1
          }
        },
        attributes: ["id", "name", "tags", "description", "unit_price", "org_img", "photos", "product_type", "likecount", "thismonth_like"],
        where: { approved: 1 },
        order: [
          ['thismonth_like', 'DESC'],
          ['id', 'DESC'],
        ],

      }).then((topmonth) => {
        res.status(200).json({ topmonth });
      }).catch(err => {

        return res.status(500).json(err)
      });
  })
}

exports.findByyear = (req, res) => {
  var currentDate = new Date();
  var theFirst = new Date(currentDate.getFullYear(), 0, 2);
  var theLast = new Date(currentDate.getFullYear(), 11, 32);

  Product_db.findAll({
    attributes: ["id"]
  }).then((data) => {

    var ids = data.map(function (item) {
      return item.id;
    });

    for (i = 0; i < ids.length; i++) {

      Like_products.findAll({
        attributes: ["id", "product_id"],
        where: {
          "createdAt": { [Op.between]: [theFirst, theLast] },
          product_id: ids[i],
          status: 1
        }
      }).then((data1) => {

        if (data1 != "") {
          let count = data1.length
          Product_db.update(
            {
              thisyear_like: count
            },
            { where: { id: data1[0].product_id } })
        }

      })
    }
    Product_db.hasMany(Like_products, {
      foreignKey: "product_id",
    }),
      Like_products.belongsTo(Product_db, {
        foreignKey: "product_id",
      }),

      Product_db.findAll(
        {
          include: {
            model: Like_products,
            attributes: ["id", "user_id", "product_id", "likes", "status"],
            where: {
              "createdAt": { [Op.between]: [theFirst, theLast] },
              status: 1
            }
          },
          attributes: ["id", "name", "tags", "description", "unit_price", "thumbnail_img", "photos", "product_type", "likecount", "thisyear_like"],
          order: [
            ['thisyear_like', 'DESC'],
            ['id', 'DESC'],
          ],
          where: { approved: 1 },
        }).then((topyear) => {
          res.status(200).json({ topyear });
        }).catch(err => {
          return res.status(500).json(err)
        });
  })
}

exports.productCreate = (req, res) => {
  const data = `http://localhost:3001/post_images/${req.file.filename}`
  Product_db.create({
    name: req.body.name,
    product_type: req.body.product_type,
    added_by: req.body.added_by,
    user_id: req.body.user_id,
    category_id: req.body.category_id,
    brand_id: req.body.brand_id,
    org_img: data,
    tags: req.body.tags,
    description: req.body.description,
    unit_price: req.body.unit_price,
    published: req.body.published,
    approved: req.body.approved,
    attributes: req.body.attributes,
    colors: req.body.colors,
    todays_deal: req.body.todays_deal,
    unit: req.body.unit,
    min_qty: req.body.min_qty,
    discount: req.body.discount,
    discount_type: req.body.discount_type,
    discount_start_date: req.body.discount_start_date,
    discount_end_date: req.body.discount_end_date,
    tax: req.body.tax,
    tax_type: req.body.tax_type,
    meta_title: req.body.meta_title,
    meta_description: req.body.meta_description,
    meta_image: req.body.meta_image,
    status: 1
  }).then(user => {

    res.json(user);
  }).catch(err => {
    res.status(200).json(err);
  })
}


exports.productUpdate = (req, res) => {
  const data = `http://localhost:3001/group_images/${req.file.filename}`
  Product_db.update({
    name: req.body.name,
    product_type: req.body.product_type,
    added_by: req.body.added_by,
    user_id: req.body.user_id,
    category_id: req.body.category_id,
    brand_id: req.body.brand_id,
    org_img: data,
    tags: req.body.tags,
    description: req.body.description,
    unit_price: req.body.unit_price,
    published: req.body.published,
    approved: req.body.approved,
    attributes: req.body.attributes,
    colors: req.body.colors,
    todays_deal: req.body.todays_deal,
    unit: req.body.unit,
    min_qty: req.body.min_qty,
    discount: req.body.discount,
    discount_type: req.body.discount_type,
    discount_start_date: req.body.discount_start_date,
    discount_end_date: req.body.discount_end_date,
    tax: req.body.tax,
    tax_type: req.body.tax_type,
    meta_title: req.body.meta_title,
    meta_description: req.body.meta_description,
    meta_image: req.body.meta_image,
    status: 1
  },
    {
      where: {
        id: req.params.id
      }


    }).then(user => {

      res.json(user);
    }).catch(err => {
      res.status(200).json(err);
    })
}


// --------------------------------------------Server-------------------------------------------------------------------------

// exports.likeProduct = (req, res) => {

//   var dataCount = {};
//   const user_id = req.body.user_id;
//   const product_id = req.body.product_id;

//   Like_products.findOne({
//     where: { user_id: user_id, product_id: product_id },
//   }).then((Exist) => {

//     if (Exist !== null) {
//       Like_products.update(
//         { status: 1 },
//         { where: { user_id: user_id, product_id: product_id } }
//       )
//         .then(() => {
//           Like_products.findAll({ where: { product_id: product_id, status: 1 } }).then((data) => {
//             dataCount = data;
//             count = data.length;
//             Like_products.update({
//               likes: count
//             }, { where: { product_id: product_id } })
//             Product_db.update({
//               likecount: count
//             }, { where: { id: product_id } })
//             const Result = [];
//             dataCount.map((data) => {
//               data.likes = count;
//               Result.push(data);
//             });
//             res.json({ Like_Data: Result });
//           });
//         })
//         .catch((err) => {
//           res.status(500).json(err);

//         });
//     } else {
//       Like_products.create({
//         user_id: user_id,
//         product_id: product_id,
//         status: 1,
//       }).then(() => {
//         Like_products.findAll({ where: { product_id: product_id, status: 1 } })
//           .then((data) => {
//             dataCount = data;
//             count = data.length;
//             Like_products.update({
//               likes: count
//             }, { where: { product_id: product_id } })
//             Product_db.update({
//               likecount: count
//             }, { where: { id: product_id } })
//             const Result = [];
//             dataCount.map((data) => {
//               data.likes = count;
//               Result.push(data);
//             });

//             res.json({ Like_Data: Result });
//           })
//           .catch((err) => {
//             res.status(500).json(err);
//           });
//       });
//     }
//   });
// };
// ---------------------------------------------------------------------------------------------------------------------



exports.likeProduct = (req, res) => {
  const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };
  var dataCount = {};
  const user_id = req.body.user_id;
  const product_id = req.body.product_id;

  Like_products.findOne({
    where: { user_id: user_id, product_id: product_id },
  }).then((Exist) => {

    if (Exist !== null) {
      Like_products.update(
        { status: 1 },
        { where: { user_id: user_id, product_id: product_id } }
      )
        .then(() => {
          Like_products.findAll({ where: { product_id: product_id, status: 1 } }).then((data) => {
            dataCount = data;
            count = data.length;
            Like_products.update({
              likes: count
            }, { where: { product_id: product_id } })
            Product_db.update({
              likecount: count
            }, { where: { id: product_id } })
            const Result = [];
            dataCount.map((data) => {
              data.likes = count;
              Result.push(data);
            });
            res.json({ Like_Data: Result });
          });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } else {
      Like_products.create({
        user_id: user_id,
        product_id: product_id,
        status: 1,
      }).then(() => {
        Like_products.findAll({ where: { product_id: product_id, status: 1 } })
          .then((data) => {
            dataCount = data;
            count = data.length;
            Like_products.update({
              likes: count
            }, { where: { product_id: product_id } })
            Product_db.update({
              likecount: count
            }, { where: { id: product_id } })
            const Result = [];
            dataCount.map((data) => {
              data.likes = count;
              Result.push(data);
            });
            Product_db.findOne({
              attributes: ["user_id", "thumbnail_img"],
              where: {
                id: product_id
              }
            }).then((user_id1) => {
              User.findOne({
                attributes: ["name"],
                where: {
                  id: user_id
                }
              }).then((user_name) => {
                User.findOne({
                  attributes: ["device_token"],
                  where: {
                    id: user_id1.user_id
                  }
                }).then((devicetoken) => {
                  const registrationToken = devicetoken.device_token
                  const options = notification_options;
                  const message = {
                    'notification': {
                      'title': `${user_name.name} likes your Product`,
                      'image': `${user_id1.thumbnail_img}`
                    },
                    'data': {
                      'value': `${product_id}`,
                      'key_value': 'like Post',
                      'status': '1'
                    }
                  };
                  admin.messaging().sendToDevice(registrationToken, message, options)
                    .then(function (response) {
                      console.log("Successfully sent message:", response);
                    })
                    .catch(function (error) {
                      console.log("Error sending message:", error);
                    })
                  res.json({ Like_Data: Result });
                })
              })
            })
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      });
    }
  });
};



exports.unlikeProduct = (req, res) => {
  const user_id = req.body.user_id;
  const product_id = req.body.product_id;

  Like_products.findOne({
    where: { user_id: user_id, product_id: product_id, status: 1 },
  }).then((Exist) => {

    if (Exist !== null) {
      Like_products.findAll({ where: { product_id: product_id, status: 1 } })
        .then((data) => {
          dataCount = data;
          count = data.length - 1;

          Like_products.update({
            likes: count,

          }, { where: { product_id: product_id } })
          Like_products.update({
            status: 0,

          }, { where: { user_id: user_id, product_id: product_id } })
          Product_db.update({
            likecount: count
          }, { where: { id: product_id } })
          const Result = [];

          dataCount.map((data) => {
            data.likes = count;
            Result.push(data);
          });
          res.json({ Like_Data: Result });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } else {
      Like_products.update(
        {
          status: 0,
        },
        {
          where: { user_id: user_id, product_id: product_id },
        }
      ).then(() => {
        Like_products.findAll({ where: { product_id: product_id, status: 1 } })
          .then((data) => {

            dataCount = data;
            count = data.length;

            const Result = [];
            Like_products.update({
              likes: count
            }, { where: { product_id: product_id } })
            Product_db.update({
              likecount: count
            }, { where: { id: product_id } })
            dataCount.map((data) => {
              data.likes = count;
              Result.push(data);
            });
            res.json({ Like_Data: Result });
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      });
    }
  });
};

//***********************************NEW Changes********************************************************************* */

// Find Product By Id

exports.findProductsbyID = (req, res) => {
  id = req.params.id
  Product_db.findOne({
    attributes: ["tags", "photos"],
    where: {
      id: id
    }
  }).then(data => {
    Product_db.hasMany(Like_products, {
      foreignKey: "product_id",
    });
    Like_products.belongsTo(Product_db, {
      foreignKey: "product_id",
    });
    Product_db.hasMany(Product_Comment, {
      foreignKey: "product_id",
    });
    Product_Comment.belongsTo(Product_db, {
      foreignKey: "product_id",
    });
    User.hasMany(Product_Comment, {
      foreignKey: "user_id",
    });
    Product_Comment.belongsTo(User, {
      foreignKey: "user_id",
    });
    Product_Comment.hasMany(Product_Like_comments, {
      foreignKey: "comment_id",
    });
    Product_Like_comments.belongsTo(Product_Comment, {
      foreignKey: "comment_id",
    });
    Product_db.findOne({
      include: [
        {
          model: Like_products,
          attributes: ["id", "user_id", "product_id", "likes", "status"],
        },
        {
          model: Product_Comment,
          include: [
            {
              model: User,
              attributes: ["id", "name", "profile_pic"],
              required: true,
            },
            {
              model: Product_Like_comments,
              attributes: ["id", "comment_id", "user_id", "product_id", "status", "likecount",],
            },
          ],
          attributes: ["id", "user_id", "product_id", "comment", "status", "created_at"],
        }
      ],
      attributes: ["id", "name", "product_type", "user_id", "tags", "hashtags", "thumbnail_img", "added_by", "description", "unit_price", "min_qty", "photos", "end_date", "seller_address", "likecount", "share_count"],
      where: {
        id: id
      }
    }).then((data1) => {
      let photo = data1.photos;
      photo3 = photo.replace(/['"]+/g, '');
      photo2 = photo3.split(",");
      photo2[0] = photo2[0].slice(1);
      phoo = photo2[photo2.length - 1];
      pho = phoo.slice(0, -1);
      photo2[photo2.length - 1] = pho;
      if (data.added_by === "user") {
        data.photos = photo2;
      } else {
        data.photos = data.photos
      }
      var products_comments = data1.products_comments.length;
      var products_commentsss = data1.products_comments.sort((a, b) => b.id - a.id);
      data1.products_comments = products_commentsss
      // console.log(data1.products_comments,'oopppppp');
      data1.share_count = products_comments;
      data1.photos = photo2;
      res.json({
        product: data1,
      });
    })
  })
};
//********************************************************************************************************************************************************************************************************************************************** */



// exports.findProductsbyID = (req, res) => {
//   id = req.params.id
//   var tags = [];

//   Product_db.findOne({
//     attributes: ["tags", "photos"],
//     where: {
//       id: id
//     }
//   }).then(data => {
//     // let photo = data.photos;
//     // photo = photo.replace(/['"]+/g, ''); //(/['"]+/g, '')
//     // photo = photo.split(",");
//     if (data.tags != null) {
//       let inputStr = data.tags;
//       let outputStr = inputStr.split(',');

//       for (var i = 0; i < outputStr.length; i++) {

//         Hashtags.findOne(
//           {
//             attributes: ['name'],
//             where: { id: [outputStr[i]] },
//           }).then(data => {
//             data = data.name
//             tags.push(data);
//           })

//         if (i == outputStr.length - 1) {
//           Product_db.hasMany(Like_products, {
//             foreignKey: "product_id",
//           });
//           Like_products.belongsTo(Product_db, {
//             foreignKey: "product_id",
//           });
//           Product_db.findOne({
//             include: [{
//               model: Like_products,
//               attributes: ["id", "user_id", "product_id", "likes", "status"],
//             }],
//             attributes: ["id", "name", "tags", "description", "unit_price", "org_img", "thumbnail_img", "product_type", "likecount"],
//             where: {
//               id: id
//             }
//           }).then((data1) => {
//             res.json({
//               product: data1,
//               Hashtag: "" + tags + "",

//             });
//           })

//         }

//       }
//     } else {
//       Product_db.hasMany(Like_products, {
//         foreignKey: "product_id",
//       });
//       Like_products.belongsTo(Product_db, {
//         foreignKey: "product_id",
//       });
//       Product_db.findOne({
//         include: [{
//           model: Like_products,
//           attributes: ["id", "user_id", "product_id", "likes", "status"],
//         }],
//         attributes: ["id", "name", "tags", "description", "unit_price", "org_img", "thumbnail_img", "product_type", "likecount"],
//         where: {
//           id: id
//         }
//       }).then((data1) => {
//         res.json({
//           product: data1,
//           Hashtag: "",

//         });
//       })

//     }
//   })
// };

exports.MainProfile = (req, res) => {
  const user_id = req.body.user_id;
  Product_db.findAll({
    attributes: ["id", "name", "description", "unit_price", "thumbnail_img", "photos", "product_type", "likecount"],
    order: [
      ['id', 'DESC'],
    ],
    where: { user_id: user_id },
  },
  ).then((data) => {
    res.send(data)
  })
}


// exports.allTimeProducts = (req, res) => {
//   var tags = [];
//   Product_db.hasMany(Like_products, {
//     foreignKey: "product_id",
//   });
//   Like_products.belongsTo(Product_db, {
//     foreignKey: "product_id",
//   });
//   User.hasMany(Product_db, {
//     foreignKey: "user_id",
//   });
//   Product_db.belongsTo(User, {
//     foreignKey: "user_id",
//   });
//   Product_db.findAll({
//     include: [
//       {
//         model: Like_products,
//         attributes: ["id", "user_id", "product_id", "likes", "status"],
//       },
//       {
//         model: User,
//         attributes: ["id", "name", "profile_pic"],
//       },
//     ],
//     attributes: ["id", "name", "tags", "description", "unit_price", "org_img", "photos", "product_type", "likecount"],
//     order: [
//       ['likecount', 'DESC'],
//       ['id', 'DESC'],
//     ],

//   }).then((alltime) => {
//     var newArr = [];
//     newArr = alltime.map(function (item) {
//       return item.id
//     });
//     for (var i = 0; i < 1; i++) {
//       Product_db.findOne({
//         attributes: ["tags"],
//         where: {
//           id: newArr[i]
//         }
//       }).then((data) => {
//         let inputStr = data.tags;
//         let outputStr = inputStr.split(',');
//         for (var j = 0; j < outputStr.length; j++) {

//           Hashtags.findOne(
//             {
//               attributes: ['name'],
//               where: { id: outputStr[j] },
//             }).then(data => {
//               if(data){
//                 data = data.name
//                 tags.push(data);
//                 console.log(tags,"bbbbb");
//               }else{
//                 tags.push(null)
//               }
//             })
//         }


//       })

//     }
//      res.status(200).json({ tags });
//   }).catch(err => {
//     console.log(err);
//     return res.status(500).json(err)
//   })
// }


// image upload multer
exports.upload = (req, res) => {
  let url = [];
  const id = req.params.user_id;
  req.files.map((images, index) => {
    const data = "" + `http://localhost:3001/post_images/${images.filename}` + "";
    url.push(data);
  });

  Product_db.update(
    {
      added_by: req.body.added_by,
      photos: "'" + url + "'",
      status: 1,
    },
    { where: { user_id: id } }
  )
    .then((user) => {
      res.json({
        success: 1,
        photos_url: url,
      });
    })
    .catch((err) => {
      res.status(200).json(err);
    })

};



// exports.newProduct = (req, res) => {
//   const thumbnail_img = `http://localhost:3001/post_images/${req.files["thumbnail_img"][0].filename}`;
//   const multi_imgs = [
//     `http://localhost:3001/post_images/${req.files["photos"][0].filename}`,
//     `http://localhost:3001/post_images/${req.files["photos"][1].filename}`,
//     `http://localhost:3001/post_images/${req.files["photos"][2].filename}`,
//     `http://localhost:3001/post_images/${req.files["photos"][3].filename}`,
//     `http://localhost:3001/post_images/${req.files["photos"][4].filename}`
//   ];

//   Product_db.create({
//     name: req.body.name,
//     product_type: req.body.product_type,
//     user_id: req.body.user_id,
//     tags: req.body.tags,
//     thumbnail_img: thumbnail_img,
//     description: req.body.description,
//     unit_price: req.body.unit_price,
//     min_qty: req.body.min_qty,
//     photos: multi_imgs,
//     status: 1
//   }).then((user) => {
//     User.update({
//       address: req.body.address
//     },
//       {
//         where: {
//           id: req.body.user_id
//         }
//       }
//     )
//     if (user.product_type == 0) {
//       res.json({

//         Message: "Product uploaded successfully"
//       });
//     } else if (user.product_type == 1) {
//       // res.json({
//       //   price: user.unit_price,
//       //   Message: "Product uploaded successfully"
//       // })
//       res.send(user)
//     }
//   })

// }


// exports.newProduct = (req, res) => {
//   const thumbnail_img = `http://i-collekt.jksoftec.com:3001/post_images/${req.files["thumbnail_img"][0].filename}`;
//   const multi_imgs = []

//   for (var i in req.files["photos"]) {
//     const data = `http://i-collekt.jksoftec.com:3001/post_images/${req.files["photos"][i].filename}`

//     multi_imgs.push(data)
//   }
//   Product_db.create({
//     name: req.body.name,
//     product_type: req.body.product_type,
//     user_id: req.body.user_id,
//     tags: req.body.tags,
//     thumbnail_img: thumbnail_img,
//     added_by: req.body.added_by,
//     description: req.body.description,
//     unit_price: req.body.unit_price,
//     min_qty: req.body.min_qty,
//     photos: multi_imgs,
//     end_date: req.body.end_date,
//     status: 1
//   }).then((user) => {
//     User.update({
//       address: req.body.address
//     },
//       {
//         where: {
//           id: req.body.user_id
//         }
//       }
//     )
//     if (user) {
//       return res.status(200).send({
//         result: false,
//         message: "Product uploaded successfully",
//         data: user
//       });
//     } else {
//       return res.status(200).send({
//         result: true,
//         message: "Failed",
//       });
//     }

//   })

// }


// exports.newProduct = (req, res) => {
//   const thumbnail_img = `http://i-collekt.jksoftec.com:3001/post_images/${req.files["thumbnail_img"][0].filename}`;
//   const multi_imgs = [];
//   for (var i in req.files["photos"]) {
//     const data = `http://i-collekt.jksoftec.com:3001/post_images/${req.files["photos"][i].filename}`
//     multi_imgs.push(data)
//   }
//   Product_db.create({
//     name: req.body.name,
//     product_type: req.body.product_type,
//     user_id: req.body.user_id,
//     tags: req.body.tags,
//     hashtags: req.body.hashtags,
//     thumbnail_img: thumbnail_img,
//     added_by: req.body.added_by,
//     description: req.body.description,
//     unit_price: req.body.unit_price,
//     min_qty: req.body.min_qty,
//     photos: multi_imgs,
//     end_date: req.body.end_date,
//     seller_address: req.body.seller_address,
//     slug: req.body.name,
//     status: 1
//   }).then((user) => {
//     User.update({
//       address: req.body.address
//     }, {
//       where: {
//         id: req.body.user_id
//       }
//     })
//     if (user) {
//       return res.status(200).send({
//         result: false,
//         message: "Product uploaded successfully",
//         data: user
//       });
//     } else {
//       return res.status(200).send({
//         result: true,
//         message: "Failed",
//       });
//     }
//   })
// }




//// Product Upload 
exports.newProduct = (req, res) => {
  const thumbnail_img = `http://i-collekt.jksoftec.com:3001/post_images/${req.files["thumbnail_img"][0].filename}`;
  const multi_imgs = [];
  for (var i in req.files["photos"]) {
    const data = `http://i-collekt.jksoftec.com:3001/post_images/${req.files["photos"][i].filename}`
    multi_imgs.push(data)
  }
  Product_db.create({
    name: req.body.name,
    product_type: req.body.product_type,
    user_id: req.body.user_id,
    tags: req.body.tags,
    hashtags: req.body.hashtags,
    thumbnail_img: thumbnail_img,
    added_by: req.body.added_by,
    description: req.body.description,
    unit_price: req.body.unit_price,
    min_qty: req.body.min_qty,
    photos: multi_imgs,
    end_date: req.body.end_date,
    seller_address: req.body.seller_address,
    slug: req.body.name,
    status: 1
  }).then((user) => {
    Parcel.create({
      weight: req.body.weight,
      height: req.body.height,
      width: req.body.width,
      length: req.body.length,
      product_id: user.id,
      user_id: req.body.user_id
    }).then((Parcel) => {
      User.update({
        address: req.body.address
      }, {
        where: {
          id: req.body.user_id
        }
      })
      if (user) {
        return res.status(200).send({
          result: false,
          message: "Product uploaded successfully",
          data: user
        });
      } else {
        return res.status(200).send({
          result: true,
          message: "Failed",
        });
      }
    })
  })
}

exports.findProduct = (req, res) => {
  var tags = [];
  var final = [];
  var newArr = [];
  Product_db.findAll({
    attributes: ["id"]
  }).then((idss) => {
    newArr = idss.map(function (item) {
      return item.id
    });
    for (k = 0; k < newArr.length; k++) {
      Product_db.findOne({
        attributes: ["id", "tags", "photos"],
        where: {
          id: newArr[k]
        }
      }).then(data => {
        let inputStr = data.tags;
        let outputStr = inputStr.split(',');

        for (var i = 0; i < outputStr.length; i++) {

          Hashtags.findOne(
            {
              attributes: ['name'],
              where: { id: [outputStr[i]] },
            }).then(data => {
              data = data.name
              tags.push(data);
            })

          if (i == outputStr.length - 1) {
            Product_db.hasMany(Like_products, {
              foreignKey: "product_id",
            });
            Like_products.belongsTo(Product_db, {
              foreignKey: "product_id",
            });
            User.hasMany(Product_db, {
              foreignKey: "user_id",
            });
            Product_db.belongsTo(User, {
              foreignKey: "user_id",
            });
            Product_db.findOne({

              include: [
                {
                  model: Like_products,
                  attributes: ["id", "user_id", "product_id", "likes", "status"],
                },
                {
                  model: User,
                  attributes: ["id", "name", "profile_pic"],
                },
              ],
              attributes: ["id", "name", "tags", "unit_price", "description", "thumbnail_img", "photos", "product_type", "likecount", "created_at", "end_date",],
              where: {
                id: data.id
              }
            }).then((data1) => {
              photo = data1.photos;
              photo = photo.replace(/['"]+/g, ''); //(/['"]+/g, '')
              data1.photos = photo;

              data1.tags = tags.slice(0, 5);
              final.push(data1)
            })
          }
        }
      })
    }
    setTimeout(() => {
      res.status(200).json({ alltime: final })
    }, 1000);
  })
};
// exports.allTimeProducts = (req, res) => {
//   var tags = [];
//   var final = [];
//   var newArr = [];
//   var new1 = [];
//   var kkk = [];
//   // function myFunction1(result) {

//   // }

//   Product_db.hasMany(Like_products, {
//     foreignKey: "product_id",
//   });
//   Like_products.belongsTo(Product_db, {
//     foreignKey: "product_id",
//   });
//   User.hasMany(Product_db, {
//     foreignKey: "user_id",
//   });
//   Product_db.belongsTo(User, {
//     foreignKey: "user_id",
//   });
//   Product_db.findAll({
//     attributes: ["id"]
//   }).then((ids) => {
//     newArr = ids.map(function (item) {
//       return item.id
//     });
//     tags = ids.map(function (item) {
//       return item.id
//     });
//     Hashtags.findAll({
//       attributes: ["id", "name"],
//     }).then((dataa) => {
//       kkk = dataa.map(function (item) {
//         return item.name
//       });

//       for (i = 0; i < newArr.length; i++) {
//         Product_db.findOne({
//           attributes: ["id", "tags", "photos"],
//           where: {
//             id: newArr[i]
//           }
//         }).then((prod) => {
//           // console.log(prod,"prod");
//           photo = prod.photos;
//           photo = photo.replace(/['"]+/g, ''); //(/['"]+/g, '')
//           photo = photo.split(",");

//           prod.photos = photo;

//           let inputStr = prod.tags;
//           let outputStr = inputStr.split(',');

//           var result = outputStr.map(function (x) {
//             return parseInt(x, 10);
//           });
//           for (j = 0; j < result.length; j++) {
//             Hashtags.findOne({
//               attributes: ["id", "name"],
//               where: {
//                 id: result[j]
//               }
//             }).then((datas) => {
//               datass = datas.name
//               new1.push(datass)
//             })
//           }
//           new11 = datas.map(function (item) {
//             return item.name
//           });
//           console.log(new1, "new1new1new1");
//           // myFunction1(result);
//           // console.log(new1, "new1111111");
//         })

//       }
//       // setTimeout(() => {
//       //   res.send(final)
//       // }, 1000);
//       // console.log(kkk, "kkkkkkkjjbhtfswr");
//     })
//   })

// }


//All Time Product

exports.allTimeProducts = (req, res) => {
  var Alltime_Product = [];
  var product = [];
  Product_db.hasMany(Like_products, {
    foreignKey: "product_id",
  });
  Like_products.belongsTo(Product_db, {
    foreignKey: "product_id",
  });
  User.hasMany(Product_db, {
    foreignKey: "user_id",
  });
  Product_db.belongsTo(User, {
    foreignKey: "user_id",
  });
  var newArr = [];
  Product_db.findAll({
    attributes: ["id"]
  }).then((idss) => {
    newArr = idss.map(function (item) {
      return item.id
    });
    for (k = 0; k < newArr.length; k++) {
      Product_db.findOne({
        include: [
          {
            model: Like_products,
            attributes: ["id", "user_id", "product_id", "likes", "status"],
          },
          {
            model: User,
            attributes: ["id", "name", "profile_pic"],
          },
        ],
        attributes: ["id", "name", "user_id", "added_by", "description", "photos", "thumbnail_img", "tags", "created_at", "product_type", "unit_price", "min_qty", "end_date"],
        where: { id: newArr[k] }
      })
        .then((products) => {
          let photo = products.photos;
          photo3 = photo.replace(/['"]+/g, '');
          photo2 = photo3.split(",");
          photo2[0] = photo2[0].slice(1);
          phoo = photo2[photo2.length - 1];
          pho = phoo.slice(0, -1);
          photo2[photo2.length - 1] = pho;
          if (products.added_by === "user") {
            products.photos = photo2;
          } else {
            products.photos = photo2
          }
          product.push(products)
          var tag = []
          const tags = product.map((item, index) => {
            let inputStr = item.tags;
            let outputStr = inputStr.split(',');
            for (var i = 0; i < outputStr.length; i++) {
              Hashtags.findOne(
                {
                  attributes: ['name'],
                  where: { id: [outputStr[i]] },
                }).then(data => {
                  data = data.name
                  tag[index] += data;
                  let hashtags = tag[index]
                  item.tags = hashtags.slice(hashtags.indexOf("#"));
                })
            }
          })
          Alltime_Product.push(products)
        })
    }
    setTimeout(() => {
      res.status(200).json({ Alltime_Product });
    }, 2000);
  })
};

// *********************************************** NEW CODE *******************************************************

/// Find Products For Profile
exports.findProdByUserId = (req, res) => {
  const id = req.params.id;
  let ids = parseInt(id)
  const product_id = [];
  Product_db.findAll({
    attributes: ["id"],
    where: {
      user_id: req.params.id,
    },
  }).then((i) => {
    i.map((datas) => {
      datas = datas.id
      product_id.push(datas)
    })
    User.hasMany(Product_db, {
      foreignKey: 'user_id'
    });
    Product_db.belongsTo(User, {
      foreignKey: 'user_id',
    });
    Product_db.hasMany(Like_products, {
      foreignKey: "product_id",
    });

    Like_products.belongsTo(Product_db, {
      foreignKey: "product_id",
    });
    Product_db.hasMany(Product_Comment, {
      foreignKey: "product_id",
    });
    Product_Comment.belongsTo(Product_db, {
      foreignKey: "product_id",
    });
    User.hasMany(Product_Comment, {
      foreignKey: "user_id",
    });
    Product_Comment.belongsTo(User, {
      foreignKey: "user_id",
    });
    Product_Comment.hasMany(Product_Like_comments, {
      foreignKey: "comment_id",
    });
    Product_Like_comments.belongsTo(Product_Comment, {
      foreignKey: "comment_id",
    });
    Product_db.findAll({
      include: [{
        model: User,
        attributes: ["id", "name", "profile_pic"],
        required: true
      },
      {
        model: Like_products,
        attributes: ["id", "user_id", "product_id", "status", "likes"],
      },
      {
        model: Product_Comment,
        include: [
          {
            model: User,
            attributes: ["id", "name", "profile_pic"],
            required: true,
          },
          {
            model: Product_Like_comments,
            attributes: ["id", "comment_id", "user_id", "product_id", "status", "likecount",],
            order: [["id", "DESC"]],
          },
        ],

        attributes: ["id", "user_id", "product_id", "comment", "status", "created_at"],
        order: [["id", "DESC"]],
        limit: 2
      }
      ],
      order: [["id", "DESC"]],
      attributes: ["id", "name", "user_id", "photos", "thumbnail_img", "tags", "hashtags", "created_at", "description", "product_type", "unit_price", "min_qty", "end_date", "share_count", "likecount", "approved"],
      where: { user_id: id, id: product_id }
    })
      .then(products => {
        if (products != null) {
          const tags = products.map((item, index) => {
            products_comments = item.products_comments.length;
            item.share_count = products_comments;
            let photo = item.photos;
            photo3 = photo.replace(/['"]+/g, '')
            photo2 = photo3.split(",");
            photo2[0] = photo2[0].slice(1)
            phoo = photo2[photo2.length - 1]
            pho = phoo.slice(0, -1)
            photo2[photo2.length - 1] = pho
            item.photos = photo2;
            // var products_commentsss = item.products_comments.sort((a, b) => b.id - a.id);
            // // console.log(products_commentsss.length = 2,'okkokokopsllsmsmksk');
            // item.products_comments = products_commentsss.length = 2;
            // console.log(item.products_comments, 'okkokokopsllsmsmksk');
          })
        } else {
          data = {
            "id": ids,
            "products": []
          };
        }

        res.status(200).json({ products });
      })
  })
}

// ****************************************************************************************************************************


// --------------------------------------------------------------------------------------------------------------- /

/////// ----------- Server Backup ----------- /////////

// /// Find Products For Profile
// exports.findProdByUserId = (req, res) => {
//   User.hasMany(Product_db, {
//     foreignKey: 'user_id'
//   });
//   Product_db.belongsTo(User, {
//     foreignKey: 'user_id',
//     targetKey: 'id'
//   });
//   const id = req.params.id;
//   let ids = parseInt(id)
//   User.findOne({
//     include: [{
//       model: Product_db,
//       attributes: ["id", "name", "user_id", "photos", "thumbnail_img", "tags", "hashtags", "created_at", "description", "product_type", "unit_price", "min_qty", "end_date"],
//       required: true
//     }],
//     attributes: ["id"],
//     where: { id: id }
//   })
//     .then(data => {
//       if (data != null) {
//         var tag = [];
//         const tags = data.products.map((item, index) => {
//           let photo = item.photos;
//           photo3 = photo.replace(/['"]+/g, '')
//           photo2 = photo3.split(",");
//           photo2[0] = photo2[0].slice(1)
//           phoo = photo2[photo2.length - 1]
//           pho = phoo.slice(0, -1)
//           photo2[photo2.length - 1] = pho
//           item.photos = photo2
//           let inputStr = item.tags;
//           let outputStr = inputStr.split(',');
//           let l = outputStr.length;
//         })
//       } else {
//         data = {
//           "id": ids,
//           "products": []
//         };
//       }
//       res.status(200).json(data);
//     })
// }

/////// ----------- Server Backup ----------- /////////
// --------------------------------------------------------------------------------------------------------------- /
///
// exports.findProdByUserId = (req, res) => {
//   User.hasMany(Product_db, {
//     foreignKey: 'user_id'
//   });
//   Product_db.belongsTo(User, {
//     foreignKey: 'user_id',
//     targetKey: 'id'
//   });
//   const id = req.params.id;
//   User.findOne({
//     include: [{
//       model: Product_db,
//       attributes: ["id", "name", "user_id", "photos", "thumbnail_img", "tags", "created_at", "description", "product_type", "unit_price", "min_qty", "end_date"],
//       required: true
//     }],
//     attributes: ["id", "name", "profile_pic"],
//     where: { id: id }
//   })
//     .then(data => {
//       var tag = []
//       const tags = data.products.map((item, index) => {
//         let photo = item.photos;
//         photo3 = photo.replace(/['"]+/g, '')
//         photo2 = photo3.split(",");
//         photo2[0] = photo2[0].slice(1)
//         phoo = photo2[photo2.length - 1]
//         pho = phoo.slice(0, -1)
//         photo2[photo2.length - 1] = pho
//         item.photos = photo2
//         let inputStr = item.tags;
//         let outputStr = inputStr.split(',');
//         for (var i = 0; i < outputStr.length; i++) {
//           Hashtags.findOne(
//             {
//               attributes: ['name'],
//               where: { id: [outputStr[i]] },
//             }).then(data => {
//               data = data.name
//               tag[index] += data;
//               let hashtags = tag[index]
//               item.tags = hashtags.slice(hashtags.indexOf("#"));
//             })
//         }
//       })
//       data.products.sort((a, b) => {
//         if (a.created_at < b.created_at) return 1;
//         if (a.created_at > b.created_at) return -1;
//         return 0;
//       });
//       setTimeout(() => {
//         res.status(200).json(data);
//       }, 500);
//     })
// }

////
exports.updateProducttype = (req, res) => {
  Product_db.update(
    {
      product_type: req.body.product_type
    },
    { where: { id: req.body.id } }, { new: true }
  )
    .then(data => {

      res.send({
        "product_type": req.body.product_type,
        "message": "product type is updated successfully",
        "status": true
      });
    })
}

exports.sellerDetails = (req, res) => {
  Product_db.findAll(
    {
      attributes: ["id", "seller_phone", "seller_name", "seller_address"],
    }
  )
    .then(data => {
      res.send(data);
    })
}



//// Update hashtags
exports.update_hashtags = (req, res) => {
  Product_db.update(
    {
      hashtags: req.body.hashtags,
      slug: req.body.slug,
    },
    { where: { id: req.body.id } })
    .then((data) => {
      res.send({
        "message": "sucess",
        "status": true
      });
    })
}

exports.Photos = (req, res) => {
  Product_db.findAll(
    {
      attributes: ['id', 'thumbnail_img', 'photos']
    }, { where: { id: req.body.id } }
  )
    .then(products => {
      const tags = products.map((item, index) => {
        let photo = item.photos;
        photo3 = photo.replace(/['"]+/g, '')
        let photo2 = photo3.split(",");
        console.log(photo3);
        photo2[0] = photo2[0].slice(1)
        phoo = photo2[photo2.length - 1]
        pho = phoo.slice(0, -1)
        console.log(pho);
        photo2[photo2.length - 1] = pho
        let Post = [photo2[0], photo2[1], photo2[2], photo2[3], photo2[4], item.thumbnail_img];
        let filt = Post.filter((ele) => (ele != null))
        item.photos = filt
      })
      res.send({ products });
    })
}