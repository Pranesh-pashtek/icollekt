const express = require("express");
const app = express();
const cors = require("cors");


// var http = require('http')
// //var passport = require('passport');
// const server = http.createServer(app);
// const { io } = require("./utils/socket");
// io.attach(server);
// const flash = require('connect-flash');

// const upload = require("express-fileupload");
// app.use(upload()); 
//multer path
app.use('/profile', express.static('upload/profile_images'))
app.use('/home_images', express.static('upload/home_images'))
app.use('/post_images', express.static('upload/post_images'))
app.use('/group_images', express.static('upload/group_images'))
app.use('/collection', express.static('upload/collection'))
app.use('/banner_images', express.static('upload/banner_images'))
// app.use('/banner_images', express.static('upload/group_banners'))

//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

// Load config
require('dotenv').config();

//using app import
require("./routers/categories.router")(app);
require("./routers/collection.router")(app);
require("./routers/user.router")(app);
require("./routers/faq.router")(app);
// require("./routers/seller.router")(app);
// require("./routers/vendor.router")(app);
require("./routers/order.router")(app);
// require("./routers/allorders.router")(app);
// require("./routers/event.router")(app);
require("./routers/event.router")(app);

// require("./routers/purchase.router")(app);
// require("./routers/brands.router")(app);
// require("./routers/coupons.router")(app);
// require("./routers/carts.router")(app);
// require("./routers/flashdeals.router")(app);
// require("./routers/customerfeedback.router")(app);


//
require("./routers/city.router")(app);
require("./routers/banner.router")(app);
require("./routers/country.router")(app);
require("./routers/policie.router")(app);
require("./routers/review.router")(app);
require("./routers/slider.router")(app);
require("./routers/payment.router")(app);
require("./routers/shops.router")(app);
require("./routers/user_post.router")(app);
require("./routers/settings.router")(app);
require("./routers/group_image.router")(app);
//


require("./routers/search.router")(app);
require("./routers/purchase.router")(app);
// require("./routers/home_pages.router")(app);
require("./routers/brands.router")(app);
require("./routers/coupons.router")(app);
require("./routers/carts.router")(app);
require("./routers/flashdeals.router")(app);
require("./routers/customerfeedback.router")(app);
//require("./routers/orderstatus.router")(app);
require("./routers/productswishlist.router")(app);
require("./routers/totalproductbranch.router")(app);
require("./routers/delivery.router")(app);
require("./routers/customer.router")(app);
require("./routers/attributes.router")(app);
// require("./routers/attribute_category.router")(app);
require("./routers/colors.router")(app);
require("./routers/brand_translations.router")(app);
require("./routers/attribute_translations.router")(app);
require("./routers/attribute_values.router")(app);
require("./routers/flash_deal_products.router")(app);
require("./routers/flash_deal_translations.router")(app);
require("./routers/category_translations.router")(app);
require("./routers/coupon_usages.router")(app);
require("./routers/wallets.router")(app);
require("./routers/order_details.router")(app);
require("./routers/slots.router")(app);
require("./routers/home_categories.router")(app);
require("./routers/product.router")(app);
require("./routers/stock.router")(app);
require("./routers/staff.router")(app);
require("./routers/profile.router")(app);
require("./routers/addons.router")(app);
require("./routers/addresses.router")(app);
require("./routers/app_settings.router")(app)
require("./routers/home_pages.router")(app)
require("./routers/hashtags.router")(app)
require("./routers/reports.router")(app)
require("./routers/sales.router")(app)
require("./routers/help.router")(app)
require("./routers/coins.router")(app)
require("./routers/messages.router")(app)
require("./routers/conversations.router")(app)
require("./routers/comment.router")(app)
require("./routers/product_comment.router")(app)
require("./routers/makeOffer.router")(app)
require("./routers/follower.router")(app)
require("./routers/paypal.router")(app)
require("./routers/easypost.router")(app)
require("./routers/degital_port.router")(app)
// On every Client Connection

// require("./routers/blogs.router")(app)
// require("./routers/blog_categories.router")(app)
//require("./routers/profile.router")(app);
//require("./routers/profile.router")(app);
const port = process.env.PORT || 3001;
const server = app.listen(port, () => console.log(`Listening on port ${port}..`));
const socket = require('socket.io')(server);
socket.on('connection', socket => {
    console.log('Socket: client connected');
});