const database = require("../config/db.sequalize");
const Slots = database.slots;



exports.findAll = (req, res) => {
    Slots.findAll
        (

        )
        .then(data => {
            res.send(data);
        })

}



exports.create = async (req, res) => {
    const userData = {
        id:req.body.id,
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        status: req.body.status

    };

    await Slots.create(userData)
        .then(data => {
            res.send(data);
        }).catch(err => {
            console.log(err);
            return res.status(500).json(err)
        });


}

exports.delete = (req, res) => {

    Slots.destroy(

        { where: { id: req.body.id } })

        .then(() => { res.send("deleted") })

}



exports.update = (req, res) => {

    Slots.update(
        {

            name: req.body.name,
            description: req.body.description,
            type: req.body.type,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            status: req.body.status,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at

        },
        { where: { id: req.body.id } })
        .then((data) => {
            res.send(data);
        })

}