const Sequelize = require("sequelize");

let sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });


const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.categories = require("../models/categories.model")(sequelize, Sequelize);
db.collections = require("../models/collection.model")(sequelize, Sequelize);
db.user = require("../models/user.model")(sequelize, Sequelize);
db.faq = require("../models/faq.model")(sequelize, Sequelize);
db.vendor = require("../models/vendor.model")(sequelize, Sequelize);
db.seller = require("../models/seller.model")(sequelize, Sequelize);
db.order = require("../models/order.model")(sequelize, Sequelize);
db.event = require("../models/event.model")(sequelize, Sequelize);
db.search = require("../models/search.model")(sequelize, Sequelize);
db.purchases = require("../models/purchase.model")(sequelize, Sequelize);
db.followers = require("../models/followers.model")(sequelize, Sequelize);
db.brands = require("../models/brands.model")(sequelize, Sequelize);
db.coupons = require("../models/coupons.model")(sequelize, Sequelize);
db.carts = require("../models/carts.model")(sequelize, Sequelize);
db.flash_deals = require("../models/flashdeals.model")(sequelize, Sequelize);
db.customerfeedback = require("../models/customerfeedback.model")(sequelize, Sequelize);
//db.orderstatus=require("../models/orderstatus.model")(sequelize, Sequelize);
db.productswishlists = require("../models/productswishlist.model")(sequelize, Sequelize);
db.makeOffer = require("../models/makeOffer.model")(sequelize, Sequelize);
db.follower = require("../models/follower.model")(sequelize, Sequelize);
db.totalproductbranch = require("../models/totalproductbranch.model")(sequelize, Sequelize);
db.paypal = require("../models/paypal.model")(sequelize, Sequelize);
db.deliveries = require("../models/delivery.model")(sequelize, Sequelize);
db.customers = require("../models/customers.model")(sequelize, Sequelize);
db.attributes = require("../models/attributes.model")(sequelize, Sequelize);
// db.attribute_category=require("../models/attribute_category.model")(sequelize, Sequelize);
db.colors = require("../models/colors.model")(sequelize, Sequelize);
db.addons = require("../models/addons.model")(sequelize, Sequelize);
db.addresses = require("../models/addresses.model")(sequelize, Sequelize);
db.app_settings = require("../models/app_settings.model")(sequelize, Sequelize);
db.group_invite = require("../models/group_invite.model")(sequelize, Sequelize);
db.group_request = require("../models/group_request.model")(sequelize, Sequelize);
db.digital_port=require("../models/degital_port.model")(sequelize, Sequelize);
// db.blog_categories=require("../models/blog_categories.model")(sequelize, Sequelize);

// db.products = require("../models/product.model")(sequelize, Sequelize);
db.stocks = require("../models/stock.model")(sequelize, Sequelize);
db.staffs = require("../models/staff.model")(sequelize, Sequelize);
// db.allorders=require("../models/allorders.model")(sequelize, Sequelize);



//db.totalproductcategories = require("../models/totalproductcategory.model")(sequelize, Sequelize);
//db.sellerproducts = require("../models/sellerproduct.model")(sequelize, Sequelize);
// db.purchases=require("../models/purchase.model")(sequelize, Sequelize);
// db.brands=require("../models/brands.model")(sequelize, Sequelize);
// db.coupons=require("../models/coupons.model")(sequelize, Sequelize);
// db.flashdeals=require("../models/flashdeals.model")(sequelize, Sequelize);
db.brand_translations = require("../models/brand_translations.model")(sequelize, Sequelize);
db.attribute_translations = require("../models/attribute_translations.model")(sequelize, Sequelize);
db.attribute_values = require("../models/attribute_values.model")(sequelize, Sequelize);
db.attribute_values = require("../models/attribute_values.model")(sequelize, Sequelize);
db.flash_deal_products = require("../models/flash_deal_products.model")(sequelize, Sequelize);
db.flash_deal_translatons = require("../models/flash_deal_translations.model")(sequelize, Sequelize);
db.category_translations = require("../models/category_translations.model")(sequelize, Sequelize);
db.coupon_usages = require("../models/coupon_usages.model")(sequelize, Sequelize);
db.wallets = require("../models/wallets.model")(sequelize, Sequelize);
db.order_details = require("../models/order_details.model")(sequelize, Sequelize);
db.slots = require("../models/slots.model")(sequelize, Sequelize);
db.home_categories = require("../models/home_categories.model")(sequelize, Sequelize);
db.products = require("../models/product.model")(sequelize, Sequelize);
db.stocks = require("../models/stock.model")(sequelize, Sequelize);
db.staffs = require("../models/staff.model")(sequelize, Sequelize);
db.users = require("../models/profile.model")(sequelize, Sequelize);


//
db.city = require("../models/city.model")(sequelize, Sequelize);
db.banner = require("../models/banner.model")(sequelize, Sequelize);
db.payment = require("../models/payment.model")(sequelize, Sequelize);
db.country = require("../models/country.model")(sequelize, Sequelize);
db.policie = require("../models/policies.model")(sequelize, Sequelize);
db.review = require("../models/review.model")(sequelize, Sequelize);
db.slider = require("../models/slider.model")(sequelize, Sequelize);
db.shops = require("../models/shops.model")(sequelize, Sequelize);
db.home_pages = require("../models/home_pages.model")(sequelize, Sequelize);
db.hashtags = require("../models/hashtags.model")(sequelize, Sequelize);
db.reports = require("../models/reports.model")(sequelize, Sequelize);
db.user_post = require("../models/user_post.model")(sequelize, Sequelize);
db.sales = require("../models/sales.model")(sequelize, Sequelize);
db.settings = require("../models/settings.model")(sequelize, Sequelize);
db.group_image = require("../models/group_image.model")(sequelize, Sequelize);
db.help = require("../models/help.model")(sequelize, Sequelize);
db.product_stock = require("../models/product_stock.model")(sequelize, Sequelize);
db.product_taxes = require("../models/product_taxes.model")(sequelize, Sequelize);
db.product_parcel = require("../models/product_parcel.model")(sequelize, Sequelize);
db.user_posts = require("../models/coins.model")(sequelize, Sequelize);
db.conversations = require("../models/conversations.model")(sequelize, Sequelize);
db.messages = require("../models/messages.model")(sequelize, Sequelize);
db.messages_inbox = require("../models/message_inbox.model")(sequelize, Sequelize);
db.connections = require("../models/connection.model")(sequelize, Sequelize);
db.group_links = require("../models/group_link.model")(sequelize, Sequelize);
db.likes = require("../models/like.model")(sequelize, Sequelize);
db.group_users = require("../models/group_users.model")(sequelize, Sequelize);
db.comments = require("../models/comment.model")(sequelize, Sequelize);
db.product_comments = require("../models/product_comment.model")(sequelize, Sequelize);
db.product_like_comments = require("../models/product_like_comment.model.js")(sequelize, Sequelize);
db.like_comments = require("../models/like_comment.model")(sequelize, Sequelize);
db.like_products = require("../models/like_products.model")(sequelize, Sequelize);
db.easypost = require("../models/easypost.model")(sequelize, Sequelize);
module.exports = db;


//Settings