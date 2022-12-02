const database = require("../config/db.sequalize");
const Coupons = database.coupons;



exports.findAll = (req, res) => {
  Coupons.findAll
    (

    )
    .then(data => {
      res.send(data);
    })

}
exports.findOne = (req, res) => {
  const id = req.params.id;

  Coupons.findByPk(id)
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
    user_id: req.body.user_id,
    code: req.body.code,
    type: req.body.type,
    details: req.body.details,
    discount: req.body.discount,
    discount_type: req.body.discount_type,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  };

  await Coupons.create(userData)
    .then(data => {
      res.send(data);
    }).catch(err => {
      console.log(err);
      return res.status(500).json(err)
    });


}

exports.delete = (req, res) => {

  Coupons.destroy(

    { where: { id: req.body.id } })

    .then(() => { res.send("deleted") })

}



exports.update = (req, res) => {

  Coupons.update(
    {
  
      user_id: req.body.user_id,
      code: req.body.code,
      type: req.body.type,
      details: req.body.details,
      discount: req.body.discount,
      discount_type: req.body.discount_type,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      created_at: req.body.created_at,
      updated_at: req.body.updated_at

    },
    { where: { id: req.body.id } })
    .then((data) => {
      res.send(data);
    })

}