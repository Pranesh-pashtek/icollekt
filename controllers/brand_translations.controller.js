const database = require("../config/db.sequalize");
const Brand_translations = database.brand_translations;



exports.findAll = (req, res) => {
    Brand_translations.findAll
        (

        )
        .then(data => {
            res.send(data);
        })

}


exports.new = async (req, res) => {
    const userData = {
        brand_id: req.body.brand_id,
        name: req.body.name,
        lang: req.body.lang


    };

    await Brand_translations.create(userData)
        .then(data => {
            res.send(data);
        }).catch(err => {
            console.log(err);
            return res.status(500).json(err)
        });


}

exports.delete = (req, res) => {

    Brand_translations.destroy(

        { where: { id: req.body.id } })

        .then(() => { res.send("deleted") })

}



exports.update = (req, res) => {

    Brand_translations.update(
        {


            brand_id: req.body.brand_id,
            name: req.body.name,
            lang: req.body.lang,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at

        },
        { where: { id: req.body.id } })
        .then((data) => {
            res.send(data);
        })

}