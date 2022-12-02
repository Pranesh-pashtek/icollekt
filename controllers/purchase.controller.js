const database = require("../config/db.sequalize");
const Purchase = database.purchases;


exports.findAll = (req, res) => {
    Purchase.findAll
        (

        )
        .then(data => {
            res.send(data);
        })

}

exports.findOne = (req, res) => {
    const id = req.params.id;
  
   Purchase.findByPk(id)
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
        id: req.body.id,
        product: req.body.product,
        quantity: req.body.quantity,
        price: req.body.price,
        status: req.body.status,

    };

    await Purchase.create(userData)
        .then(data => {
            res.send(data);
        }).catch(err => {
            console.log(err);
            return res.status(500).json(err)
        });


}
exports.delete = (req, res) => {

    Purchase.destroy(

        { where: { id: req.body.id } })

        .then(() => { res.send("deleted") })

}


exports.update = (req, res) => {

    Purchase.update(
        {
            id: req.body.id,
            product: req.body.product,
            quantity: req.body.quantity,
            price: req.body.price,
            status: req.body.status,

        },
        { where: { id: req.body.id } })
        .then((data) => {
            res.send(data);
        })

}
