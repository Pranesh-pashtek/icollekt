const database = require("../config/db.sequalize");
const Coupon_usages = database.coupon_usages;



exports.findAll = (req, res) => {
    Coupon_usages.findAll
        (

        )
        .then(data => {
            res.send(data);
        })

}


exports.new = async (req, res) => {
    const userData = {
       user_id: req.body.user_id,
      coupon_id:req.body.coupon_id


    };

    await Coupon_usages.create(userData)
        .then(data => {
            res.send(data);
        }).catch(err => {
            console.log(err);
            return res.status(500).json(err)
        });


}

exports.delete = (req, res) => {

    Coupon_usages.destroy(

        { where: { id: req.body.id } })

        .then(() => { res.send("deleted") })

}



exports.update = (req, res) => {

    Coupon_usages.update(
        {

            user_id: req.body.user_id,
            coupon_id:req.body.coupon_id,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at

        },
        { where: { id: req.body.id } })
        .then((data) => {
            res.send(data);
        })

}