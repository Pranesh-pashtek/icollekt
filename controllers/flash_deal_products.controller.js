const database = require("../config/db.sequalize");
const Flash_deal_products = database.flash_deal_products;



exports.findAll = (req, res) => {
    Flash_deal_products.findAll
        (

        )
        .then(data => {
            res.send(data);
        })

}


exports.new = async (req, res) => {
    const userData = {
        flash_deal_id: req.body.flash_deal_id,
        products_id: req.body.products_id,
        discount: req.body.discount,
        discount_type: req.body.discount_type,



    };

    await Flash_deal_products.create(userData)
        .then(data => {
            res.send(data);
        }).catch(err => {
            console.log(err);
            return res.status(500).json(err)
        });


}

exports.delete = (req, res) => {

    Flash_deal_products.destroy(

        { where: { id: req.body.id } })

        .then(() => { res.send("deleted") })

}



exports.update = (req, res) => {

    Flash_deal_products.update(
        {


            flash_deal_id: req.body.flash_deal_id,
            products_id: req.body.products_id,
            discount: req.body.discount,
            discount_type: req.body.discount_type,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at

        },
        { where: { id: req.body.id } })
        .then((data) => {
            res.send(data);
        })

}