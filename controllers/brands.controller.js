const database = require("../config/db.sequalize");
const Brands = database.brands;



exports.findAll = (req, res) => {
  Brands.findAll
    (

    )
    .then(data => {
      res.send(data);
    })

}
exports.findOne = (req, res) => {
  const id = req.params.id;

  Brands.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id
      });
    });
};


exports.create = async (req, res) => {
  const userData = {

    name: req.body.name,
    logo: req.body.logo,
    top: req.body.top,
    slug: req.body.slug,
    meta_title: req.body.meta_title,
    meta_description: req.body.meta_description,


  };

  await Brands.create(userData)
    .then(data => {
      res.send(data);
    }).catch(err => {
      console.log(err);
      return res.status(500).json(err)
    });


}

exports.delete = (req, res) => {

  Brands.destroy(

    { where: { id: req.body.id } })

    .then(() => { res.send("deleted") })

}



exports.update = (req, res) => {

  Brands.update(
    {

     
      name: req.body.name,
      logo: req.body.logo,
      top: req.body.top,
      slug: req.body.slug,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      created_at: req.body.created_at,
      updated_at: req.body.updated_at

    },
    { where: { id: req.body.id } })
    .then((data) => {
      res.send(data);
    })

}