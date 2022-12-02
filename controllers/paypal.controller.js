const database = require("../config/db.sequalize");
const Paypal = database.paypal;


exports.Payment_Details = (req, res) => {
    Paypal.create({      
        user_id: req.body.user_id,
        seller_id: req.body.seller_id,
        product_id: req.body.product_id,
        payment_id: req.body.payment_id,
        payerId: req.body.payerId,
        payment_methord: req.body.payment_methord,
        created_time: req.body.created_time,
        amount: req.body.amount,       
    }).then(Payment_Details => {
        res.json(Payment_Details);
    }).catch(err => {
        res.json(err);
    })
}

//Delete

exports.delete = (req, res) => {
    Paypal.destroy({
        where: {
            id: req.params.id
        }
})
        .then(() => {
            res.send("success");
        })
} 

// find all

exports.findAll = async (req, res) => {
    Paypal.findAll(
        {}).then(Paypal => {
            res.send({ Paypal });
        })
}