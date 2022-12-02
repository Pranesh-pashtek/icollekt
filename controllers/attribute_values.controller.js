const database = require("../config/db.sequalize");
const Attribute_values = database.attribute_values;



exports.findAll = (req, res) => {
    Attribute_values.findAll
        (

        )
        .then(data => {
            res.send(data);
        })

}


exports.new = async (req, res) => {
    const userData = {
        attribute_id: req.body.attribute_id,
        value: req.body.value,
        color_code: req.body.color_code


    };

    await Attribute_values.create(userData)
        .then(data => {
            res.send(data);
        }).catch(err => {
            console.log(err);
            return res.status(500).json(err)
        });


}

exports.delete = (req, res) => {

    Attribute_values.destroy(

        { where: { id: req.body.id } })

        .then(() => { res.send("deleted") })

}



exports.update = (req, res) => {

    Attribute_values.update(
        {


            
            attribute_id: req.body.attribute_id,
            value: req.body.value,
            color_code: req.body.color_code,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at

        },
        { where: { id: req.body.id } })
        .then((data) => {
            res.send(data);
        })

}