const database = require("../config/db.sequalize");
const Flash_deal_translations = database.flash_deal_translations;



exports.findAll = (req, res) => {
    Flash_deal_translations.findAll
        (

        )
        .then(data => {
            res.send(data);
        })

}


exports.new = async (req, res) => {
    const userData = {
        flash_deal_id: req.body.flash_deal_id,
        title: req.body.title,
        lang: req.body.lang,



    };

    await Flash_deal_translations.create(userData)
        .then(data => {
            res.send(data);
        }).catch(err => {
            console.log(err);
            return res.status(500).json(err)
        });


}

exports.delete = (req, res) => {

    Flash_deal_translations.destroy(

        { where: { id: req.body.id } })

        .then(() => { res.send("deleted") })

}



exports.update = (req, res) => {

    Flash_deal_translations.update(
        {


            flash_deal_id: req.body.flash_deal_id,
            title: req.body.title,
            lang: req.body.lang,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at

        },
        { where: { id: req.body.id } })
        .then((data) => {
            res.send(data);
        })

}