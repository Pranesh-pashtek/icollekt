const database = require("../config/db.sequalize");
const Search = database.search;
const Products = database.products;
const User = database.user;

//// Search_Data
exports.new = (req, res) => {
  Search.create({
    user_id: req.body.user_id,
    product_id: req.body.product_id,
    account_id: req.body.account_id,
    status: 1
  })
    .then(user => {
      res.json(user);
    }).catch(err => {
      res.status(200).json(err);
    })
}

/////Find_product
exports.findAll_Product = async (req, res) => {
  const user_id = req.params.user_id;
  var product_id = [];
  Search.findAll({
    attributes: ['id', 'product_id', "user_id"],
    where: { user_id: user_id }
  })
    .then(data => {
      data.map((datas) => {
        datas = datas.product_id
        product_id.push(datas)
      })
      let uniqueChars = [...new Set(product_id)];
      uniqueChars = uniqueChars.filter(function (item) {
        return item !== 0
      })
      Products.findAll({
        attributes: ['id', 'thumbnail_img', "name"],
        where: { id: uniqueChars }
      })
        .then(product_list => {
          res.send({ product_list })
        })
    })
}


//////Find_Account
exports.findAll_Account = async (req, res) => {
  const user_id = req.params.user_id;
  var account_id = [];
  Search.findAll({
    attributes: ['id', 'account_id', "user_id"],
    where: { user_id: user_id }
  })
    .then(data => {
      data.map((datas) => {
        datas = datas.account_id
        account_id.push(datas)
      })
      let uniqueChars = [...new Set(account_id)];
      uniqueChars = uniqueChars.filter(function (item) {
        return item !== 0
      })
      User.findAll({
        attributes: ['id', 'profile_pic', "name"],
        where: { id: uniqueChars }
      })
        .then(account_list => {
          res.send({ account_list })
        })
    })
}

///Delete_search_product
exports.delete_search_product = (req, res) => {
  Search.destroy({
    where: { user_id: req.body.user_id, product_id: req.body.product_id }
  }).then(() => {
    res.send({ status: true, Message: "Search Product Clear Successfully" });
  })
}

///Delete_search_Account
exports.delete_search_account = (req, res) => {
  Search.destroy({
    where: { user_id: req.body.user_id, account_id: req.body.account_id }
  }).then(() => {
    res.send({ status: true, Message: "Search Account Clear Successfully" });
  })
}

///Delete All_search_product
exports.delete_all_search_product = (req, res) => {
  Search.update({ product_id: 0 },
    {
      where: { user_id: req.params.user_id }
    }).then(() => {
      res.send({ status: true, Message: "Search History For Product Clear Successfully" });
    })
}

///Delete All_search_Account
exports.delete_all_search_account = (req, res) => {
  Search.update({ account_id: 0 },
    {
      where: { user_id: req.params.user_id }
    }).then(() => {
      res.send({ status: true, Message: "Search History For Account Clear Successfully" });
    })
}