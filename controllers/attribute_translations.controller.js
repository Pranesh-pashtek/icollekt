const database = require("../config/db.sequalize");
const Attribute_translations = database.attribute_translations;



exports.findAll = (req, res) => {
    Attribute_translations.findAll
        (

        )
        .then(data => {
            res.send(data);
        })

}


exports.new = async (req, res) => {
    const userData = {
        attribute_id: req.body.attribute_id,
        name: req.body.name,
        lang: req.body.lang


    };

    await Attribute_translations.create(userData)
        .then(data => {
            res.send(data);
        }).catch(err => {
            console.log(err);
            return res.status(500).json(err)
        });


}

exports.delete = (req, res) => {

    Attribute_translations.destroy(

        { where: { id: req.body.id } })

        .then(() => { res.send("deleted") })

}



exports.update = (req, res) => {

    Attribute_translations.update(
        {


            attribute_id: req.body.attribute_id,
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