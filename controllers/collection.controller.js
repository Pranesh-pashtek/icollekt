const database = require("../config/db.sequalize");
const Collection = database.collections;
const { Op } = require('sequelize');
var Sequelize = require('sequelize');



exports.findAll = (req, res) => {
  Collection.findAll(
    {
      order: [
        ['title', 'ASC']
      ],
      attributes: ['id', 'title', 'image', 'status', 'createdAt', 'updatedAt'],
    }
  )
    .then(data => {
      res.send({ data });
    })
}


exports.delete = (req, res) => {

  Collection.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.send("success");
    })

}

exports.create = async (req, res) => {
  const userData = {
    title: req.body.name,
    price: req.body.price,
    status: req.body.status,


  };

  await Collection.create(userData)
    .then(data => {
      res.send(data);
    }).catch(err => {
      console.log(err);
      return res.status(500).json(err)
    });


}

exports.update = (req, res) => {

  Collection.update(
    {
      title: req.body.name,
      price: req.body.price,
      status: req.body.status,
      created_at: req.body.created_at,
      update_at: req.body.update_at

    },
    { where: { id: req.body.id } })
    .then((data) => {
      res.send(data);
    })

}

exports.findbyweek = (req, res) => {

  const endDate = new Date();
  const startedDate = new Date(new Date().setDate(new Date().getDate() - 7));

  Collection.findAll(
    {
      attributes: ["id", "title", "image", "status", "createdAt", "updatedAt"],
      where: { "createdAt": { [Op.between]: [startedDate, endDate] } }
    })
    .then(data => {
      res.send(data);
    }).catch(err => {
      console.log(err);
      return res.status(500).json(err)
    });

}
// image upload
exports.new = (req, res) => {
  let url = [];
  const id = req.params.id;
  console.log(req.files.length, "req.files.filename");
  // const data = ("http://localhost:3001/home_images/")+(images.filename)
  req.files.map((images, index) => {
    console.log(images, "image");
    const data = " " + ("http://i-collekt.jksoftec.com:3001/collection/") + (images.filename) + " ";
    url.push(data);
  });
  console.log(url, "url");
  Collection.update(

    {
      image: " [" + url + "] ",
      status: 1,
    },
    { where: { id: id } }
  )
    .then((user) => {
      console.log(user);
      res.json({
        success: 1,
        home_page_url: url,
      });
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};