const database = require("../config/db.sequalize");
const Wallets = database.wallets;



exports.findAll = (req, res) => {
    Wallets.findAll
        (

        )
        .then(data => {
            res.send(data);
        })

}



exports.create = async (req, res) => {
    const userData = {
        user_id: req.body.user_id,
        amount: req.body.amount,
        payment_method: req.body.payment_method,
        payment_details: req.body.payment_details

    };

    await Wallets.create(userData)
        .then(data => {
            res.send(data);
        }).catch(err => {
            console.log(err);
            return res.status(500).json(err)
        });


}

exports.delete = (req, res) => {

    Wallets.destroy(

        { where: { id: req.body.id } })

        .then(() => { res.send("deleted") })

}



exports.update = (req, res) => {

    Wallets.update(
        {

            user_id: req.body.user_id,
            amount: req.body.amount,
            payment_method: req.body.payment_method,
            payment_details: req.body.payment_details,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at

        },
        { where: { id: req.body.id } })
        .then((data) => {
            res.send(data);
        })

}