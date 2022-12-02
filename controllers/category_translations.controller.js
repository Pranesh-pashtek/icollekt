const database = require("../config/db.sequalize");
const Category_translations = database.category_translations;



exports.findAll = (req, res) => {
    Category_translations.findAll
        (

        )
        .then(data => {
            res.send(data);
        })

}


exports.new = async (req, res) => {
    const userData = {
        category_id: req.body.category_id,
        name: req.body.name,
        lang: req.body.lang


    };

    await Category_translations.create(userData)
        .then(data => {
            res.send(data);
        }).catch(err => {
            console.log(err);
            return res.status(500).json(err)
        });


}

exports.delete = (req, res) => {

    Category_translations.destroy(

        { where: { id: req.body.id } })

        .then(() => { res.send("deleted") })

}



exports.update = (req, res) => {

    Category_translations.update(
        {

            category_id: req.body.category_id,
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