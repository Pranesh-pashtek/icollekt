const database = require("../config/db.sequalize");
const Sales = database.sales;


//Findall

exports.findAll = (req, res) => {
    Sales.findAll(
    )
        .then(data => {
            res.send(data);
        })
}

//Findone

exports.findOne = (req, res) => {
    const id = req.params.id;

    Sales.findOne({ where: { id: id } }).then(data => {
        res.send(data);
    })
};



// //create

exports.new = async (req, res) => {
    const userData = {
        price: req.body.price,
        min_price: req.body.min_price,
        status: req.body.status,
        comments: req.body.comments
    };

    await Sales.create(userData)
        .then(data => {
            res.send(data);
        }).catch(err => {
            console.log(err);
            return res.status(500).json(err)
        });
}



//update

exports.update = (req, res) => {

    Sales.update(
        {
            price: req.body.price,
            min_price: req.body.min_price,
            status: req.body.status,
            comments: req.body.comments

        },
        { where: { id: req.body.id } })
        .then((data) => {
            res.send(data);
        })

}


//delete

exports.delete = (req, res) => {
    Sales.destroy({ where: { id: req.body.id } })
        .then((order) => {
            res.json("success");
        })
        .catch((err) => {
            res.status(500).json(err);
        });

}
