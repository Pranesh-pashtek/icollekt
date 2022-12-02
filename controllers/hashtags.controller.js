const database = require("../config/db.sequalize");
const Hashtags = database.hashtags;

const User = database.users

exports.findAll = (req, res) => {
    Hashtags.findAll
        (

        )
        .then(data => {
            res.send(data)
        })

}
exports.findOne = (req, res) => {
    const id = req.params.id;

    Hashtags.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user with id=" + id
            });
        });
};


// Create Hashtag
exports.create1 = async (req, res) => {
    const userData = {
        name: req.body.name,
    };
    Hashtags.findOne({
        where: {
            name: userData.name
        }
    }).then((dataExists) => {
        if (!dataExists) {
            Hashtags.create(userData).then((data) => {
                res.json(data);
            });
        } else {
            return res.status(200).send({
                result: false,
                message: "Hashtag Already Exist ",
            });
        }
    })

};
////
exports.create = async (req, res) => {
    const userData = {
        name: req.body.name,
    };
    Hashtags.create(userData).then((data) => {
        res.json(data);
    });
};

//Hashtag Exist
exports.hashtag_exist = async (req, res) => {
    Hashtags.findOne({
        where: { name: req.body.name, },
    }).then((dataExists) => {
        if (!dataExists) {
            return res.status(200).send({
                result: true,
                message: "Hashtag Created Successfully",
            });
        } else {
            return res.status(200).send({
                result: false,
                message: "Hashtag Already Exist Please Select",
            });
        }
    });
};

exports.delete = (req, res) => {

    Hashtags.destroy(

        { where: { id: req.body.id } })

        .then(() => { res.send("deleted") })

}



exports.update = (req, res) => {

    Hashtags.update(
        {


            name: req.body.name,
            updated_at: req.body.updated_at,

        },
        { where: { id: req.body.id } })
        .then((data) => {
            res.send(data);
        })

}



exports.hashtags = async (req, res) => {
    let tags = [];
    await User.findOne({
        attributes: ['hashtags', 'id', 'name'],
        where: { id: req.params.id }
    }).then((data) => {
        if (data.dataValues.hashtags == null) {
            tags.push(null)
        }
        else {
            let inputStr = data.dataValues.hashtags;
            let outputStr = inputStr.split(',');
            for (var i = 0; i < outputStr.length; i++) {

                Hashtags.findOne(
                    {
                        attributes: ['name'],
                        where: { id: [outputStr[i]] },
                    }).then(data => {
                        data = data.name
                        tags.push(data);
                    })
            }
        }
        setTimeout(() => {
            res.status(200).json({ Username: data.name, Hashtag: "" + tags + "" });
        },50);
    })
};
