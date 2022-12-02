const database = require("../config/db.sequalize");
const Home_categories = database.home_categories;



exports.findAll = (req, res) => {
    Home_categories.findAll
        (

        )
        .then(data => {
            res.send(data);
        })

}



exports.create = async (req, res) => {
    const userData = {

        category_id: req.body.category_id,
        subsubcategories: req.body.subsubcategories,
        status: req.body.status,

    };

    await Home_categories.create(userData)
        .then(data => {
            res.send(data);
        }).catch(err => {
            console.log(err);
            return res.status(500).json(err)
        });


}

exports.delete = (req, res) => {

    Home_categories.destroy(

        { where: { id: req.body.id } })

        .then(() => { res.send("deleted") })

}



exports.update = (req, res) => {

    Home_categories.update(
        {

            category_id: req.body.category_id,
            subsubcategories: req.body.subsubcategories,
            status: req.body.status,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at

        },
        { where: { id: req.body.id } })
        .then((data) => {
            res.send(data);
        })

}