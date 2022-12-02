const database = require("../config/db.sequalize");
const Flashdeals = database.flash_deals;



exports.findAll = (req, res) => {
  Flashdeals.findAll
    (

    )
    .then(data => {
      res.send(data)
    })

}
exports.findOne = (req, res) => {
  const id = req.params.id;

  Flashdeals.findByPk(id)
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

    title: req.body.title,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    status: req.body.status,
    featured: req.body.featured,
    background_color: req.body.background_color,
    text_color: req.body.text_color,
    banner: req.body.banner,
    slug: req.body.slug,


  };

  await Flashdeals.create(userData)
    .then(data => {
      res.send(data);
    }).catch(err => {
      console.log(err);
      return res.status(500).json(err)
    });


}

exports.delete = (req, res) => {

  Flashdeals.destroy(

    { where: { id: req.body.id } })

    .then(() => { res.send("deleted") })

}



exports.update = (req, res) => {

  Flashdeals.update(
    {


      title: req.body.title,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      status: req.body.status,
      featured: req.body.featured,
      background_color: req.body.background_color,
      text_color: req.body.text_color,
      banner: req.body.banner,
      slug: req.body.slug,
      created_at: req.body.created_at,
      updated_at: req.body.updated_at
    },
    { where: { id: req.body.id } })
    .then((data) => {
      res.send(data);
    })

}