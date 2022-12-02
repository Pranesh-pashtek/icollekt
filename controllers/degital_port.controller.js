const database = require("../config/db.sequalize");
const digital_port = database.digital_port;

exports.new = (req, res) => {
    digital_port.create({
        token: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        status: 0,
        message: req.body.message,
    }).then(user => {
            res.json(user);
        }).catch(err => {
            res.status(500).json(err);
        })
}

exports.findAll = async (req, res) => {
    digital_port.findOne(
        {
            attributes: ["id", "status", "message"],
        }
    ).then(data => {
            res.send(data);
        })
}

exports.delete = (req, res) => {
    digital_port.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.send("success");
        })
}

exports.update = (req, res) => {
    digital_port.update(
        {
            token: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            status: req.body.status,
            message: req.body.message,
        },
        { where: { id: req.body.id } })
        .then((data) => {
            res.send({
                id: req.body.id,
                status: req.body.status,
                message: req.body.message,
            }
            );
        })
}

