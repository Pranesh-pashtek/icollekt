const database = require("../config/db.sequalize");
const Home_pages = database.home_pages;
//const Sequelize = require("sequelize");
//const { Sequelize } = require("../config/db.sequalize");
var sequelize = require('sequelize');

exports.findAll = (req, res) => {
  Home_pages.findAll(
    {
      attributes: ["id", "title", "user_id", "hastag", "discription", "price", "status", "sharecount", "images", "created_at", "update_at",],
    },
  )
    .then(data => {
      console.log(data, "bbghvgh");
      res.send({ data });
    })

}

exports.findAlltime = (req, res) => {
  Home_pages.findAll(

  )
    .then(data => {
      console.log(data);
      res.send({ data });
    })

}


exports.findOne = (req, res) => {
  const id = req.params.id;

  Home_pages.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id"
      });
    });
};


exports.create = async (req, res) => {
  const userData = {
    title: req.body.title,
    hastag: req.body.hastag,
    discription: req.body.discription,
    price: req.body.price,
    status: req.body.status
  };

  await Home_pages.create(userData)
    .then(data => {
      res.send(data);
    }).catch(err => {
      console.log(err);
      return res.status(500).json(err)
    });


}

exports.delete = (req, res) => {
  Home_pages.destroy({ where: { id: req.body.id } })
    .then(() => { res.send("deleted") })
}



exports.update = (req, res) => {

  Home_pages.update(
    {
      title: req.body.title,
      hastag: req.body.hastag,
      discription: req.body.discription,
      price: req.body.price,
      images: req.body.images,
      sharecount: req.body.sharecount,
      status: req.body.status,
      created_at: req.body.created_at,
      update_at: req.body.update_at

    },
    { where: { id: req.body.id } })
    .then((data) => {
      res.send(data);
    })

}

exports.findBymonths = (req, res) => {
  const createat_mnth = new Date(req.body.created_at);
  var firstmonth = new Date(createat_mnth.getFullYear(), createat_mnth.getMonth(), createat_mnth.getDay()).toISOString().split('T')[0];
  var endmonth = new Date(createat_mnth.getFullYear(), createat_mnth.getMonth() + 1, createat_mnth.getDay()).toISOString().split('T')[0];
  console.log(firstmonth, "StartMonth")
  const Op = Sequelize.Op;
  console.log(endmonth, "EndMonth")
  Home_pages.findAll(
    {
      attributes: ["id", "title", "price", "sharecount", "status", "created_at", "update_at"],
      order: [
        [Sequelize.col("sharecount"), 'DESC']],
      where: { "created_at": { [Op.between]: [firstmonth, endmonth] } },
      limit: 10
    })
    .then(data => {
      res.send(data);
    }).catch(err => {
      console.log(err);
      return res.status(500).json(err)
    });

}


exports.findByyear = (req, res) => {
  const createat = new Date(req.body.created_at);
  var firstDay = new Date(createat.getFullYear(), createat.getMonth(), createat.getDay()).toISOString().slice(0, 10);
  var lastDay = new Date(createat.getFullYear() + 1, createat.getMonth(), createat.getDay()).toISOString().slice(0, 10);
  console.log("Year is", firstDay);
  console.log("Year is", lastDay);
  const Op = Sequelize.Op;
  Home_pages.findAll(
    {
      attributes: ["id", "title", "price", "sharecount", "status", "created_at", "update_at"],
      order: [
        [Sequelize.col("sharecount"), 'DESC']],
      where: { "created_at": { [Op.gte]: [firstDay], [Op.lte]: [lastDay] } },
      limit: 10

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

    const data = "'" + ("http://localhost:3001/home_images/") + (images.filename) + "'";
    if (images.size <= 102400) {
      url.push(data);
    } else {
      res.send("image must be less than 100kb")
    }
  })

  data = url.toString();
  Home_pages.update(

    {
      images: data,
      status: 1,
    },
    { where: { id: id } }
  )
    .then((user) => {
      res.json({
        success: 1,
        home_page_url: url,
      });
    })
    .catch((err) => {
      res.status(200).json(err);
    });

};


exports.findAllimage = (req, res) => {
  images = [];
  Home_pages.findOne(
    {
      attributes: ["id", "images"],
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(data => {
      data = data.images;
      data = data.replace(/['"]+/g, ''); //(/['"]+/g, '')
      data = data.split(",");
      res.send(data);
    })

  // setTimeout(() => {
  //   res.status(200).send("Home_pages:"["" + images + ""]);
  // }, 1000);

}

// exports.new = (req, res) => {
//   let url = [];
//   const id = req.params.id;
//   console.log(req.files.length, "req.files.filename");
//   // const data = ("http://localhost:3001/home_images/")+(images.filename)
//   req.files.map((images, index) => {
//     console.log(images, "image");
//     const data = " '" + ("http://localhost:3001/home_images/") + (images.filename) + "' ";
//     url.push(data);
//   });
//   console.log(url, "url");
//   Home_pages.update(

//     {
//       images: " [" + url + "] ",
//       status: 1,
//     },
//     { where: { id: id } }
//   )
//     .then((user) => {
//       console.log(user);
//       res.json({
//         success: 1,
//         home_page_url: url,
//       });
//     })
//     .catch((err) => {
//       res.status(200).json(err);
//     });
// };


exports.shareCount = (req, res) => {

  Home_pages.findOne({
    attributes: ["id", "sharecount", "user_id"],
    where: { id: req.params.id }
  }).then(data => {
    // res.send(data);
    let datas = [];
    datas.push(req.body.userid)
    console.log(datas, "userid");
    datas.push(data.dataValues.user_id)
    console.log(datas, "userrrrrrr");
    Home_pages.update(

      {
        user_id: "" + datas + "",
        sharecount: sequelize.literal('sharecount + 1')
      },

      {
        where: { id: req.params.id }
      })
      .then((data) => {
        res.send(data);
      })
  })
};