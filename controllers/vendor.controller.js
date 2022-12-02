const database = require("../config/db.sequalize");
const Vendor = database.vendor;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.new = (req, res) => {
    Vendor.findAll(
        {
            attributes: ["id", "vendor_id", "name", "companyname", "address", "number", "status"],
            where: { status: 1 }
        }
    )

        .then(data => {
            const count = data.length;
            const vendor_id = "" + "CHS" + new Date().getDate() + (new Date().getMonth() + 1) + new Date().getFullYear() + (count + 1);

            Vendor.create({
                vendor_id: vendor_id,
                name: req.body.name,
                companyname: req.body.companyname,
                address: req.body.address,
                number: req.body.number,
                status: 1,
            })

                .then((user) => {
                    res.json(user);
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
        })
}
exports.findAll = (req, res) => {
    Vendor.findAll(
        {
            attributes: ["id", "vendor_id", "name", "companyname", "address", "number", "status"],
            where: { status: 1 }
        }
    )
        .then(data => {
            res.send(data);
        })
}

