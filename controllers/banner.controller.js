const database = require("../config/db.sequalize");
const Banner = database.banner;



//findall

exports.findAll = (req, res) => {
  Banner.findAll(
    {
      attributes: ["id", "photo", "org_image", "position_type", "name", "published", 'description', "created_at", "updated_at"],
      where: { published: 1 }
    }).then(Banner => {
      res.send({Banner});
    })
}

exports.update = (req, res) => {
  Banner.update(
    {
      org_image: req.body.org_image,
      photo: req.body.photo
    },
    { where: { id: req.body.id } })
    .then((data) => {
      res.send(data);
    })

}