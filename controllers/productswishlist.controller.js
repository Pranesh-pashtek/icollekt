const database = require("../config/db.sequalize");
const Productswishlist = database.wishlists;



exports.findAll = (req, res) => {
    Productswishlist.findAll
        (

        )
        .then(data => {
            res.send(data)
        })

}
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Productswishlist.findByPk(id)
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

        user_id: req.body.user_id,
            product_id: req.body.product_id,

    };

    await Productswishlist.create(userData)
        .then(data => {
            res.send(data);
        }).catch(err => {
            console.log(err);
            return res.status(500).json(err)
        });


}

exports.delete = (req, res) => {

    Productswishlist.destroy(

        { where: { id: req.body.id } })

        .then(() => { res.send("deleted") })

}



exports.update = (req, res) => {

    Productswishlist.update(
        {

            user_id: req.body.user_id,
            product_id: req.body.product_id,

            created_at: req.body.created_at,
            updated_at: req.body.updated_at

        },
        { where: { id: req.body.id } })
        .then((data) => {
            res.send(data);
        })
}