const database = require("../config/db.sequalize");
const Shopsdb = database.shops;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.new = (req, res) => {
    Shopsdb.create({
        user_id: req.body.user_id,
        name: req.body.name,
        logo: req.body.logo,
        sliders: req.body.sliders,
        phone: req.body.phone,
        address: req.body.address,
        facebbok: req.body.facebbok,
        google: req.body.google,
        twitter: req.body.twitter,
        youtube: req.body.youtube,
        slug: req.body.slug,
        meta_title: req.body.meta_title,
        meta_description: req.body.meta_description,
        pick_up_point_id: req.body.pick_up_point_id,
        shipping_cost: req.body.shipping_cost,
        delivery_pickup_latitude: req.body.delivery_pickup_latitude,
        delivery_pickup_longitude: req.body.delivery_pickup_longitude
    })

        .then(user => {
            res.json(user);
        }).catch(err => {
            res.status(500).json(err);
        })
}

exports.findAll = async (req, res) => {
    Shopsdb.findAll(
        {
            attributes: ["id", "shop_name", "shop_no", "Reg_no", "address", "email", "country_code", "phno", "Staff_name", "status"],
            where: { status: 1 }
        }
    )
        .then(data => {
            res.send(data);
        })
}

exports.delete = (req, res) => {
    Shopsdb.update(
        { status: 0 },
        { where: { id: req.body.id } })
        .then((data) => {
            res.send(data);
        })
}

exports.update = (req, res) => {
    Shopsdb.update(
        {
            user_id: req.body.user_id,
            name: req.body.name,
            logo: req.body.logo,
            sliders: req.body.sliders,
            phone: req.body.phone,
            address: req.body.address,
            facebbok: req.body.facebbok,
            google: req.body.google,
            twitter: req.body.twitter,
            youtube: req.body.youtube,
            slug: req.body.slug,
            meta_title: req.body.meta_title,
            meta_description: req.body.meta_description,
            pick_up_point_id: req.body.pick_up_point_id,
            shipping_cost: req.body.shipping_cost,
            delivery_pickup_latitude: req.body.delivery_pickup_latitude,
            delivery_pickup_longitude: req.body.delivery_pickup_longitude
        },
        { where: { id: req.body.id } })
        .then((data) => {
            res.send(data);
        })
}

