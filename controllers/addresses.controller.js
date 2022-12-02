const { user } = require("../config/db.sequalize");
const database = require("../config/db.sequalize");
const Addressesdb = database.addresses;
const User = database.user;
const worldMapData = require('city-state-country');
// const { Countries, States, Cities } = require("countries-states-cities-service")
// ADD Address 
exports.new = (req, res) => {
    Addressesdb.create({
        user_id: req.body.user_id,
        name: req.body.name,
        address: req.body.address,
        country: req.body.country,
        city: req.body.city,
        state: req.body.state,
        address_id: req.body.address_id,
        postal_code: req.body.postal_code,
        phone: req.body.phone,        
    }).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(200).json(err);
    })
}

//Find Address By User_Id
exports.findAll = async (req, res) => {
    const user_id = req.params.user_id;
    Addressesdb.findAll(
        {
            attributes: ["id", "address_id", "user_id", "name", "address", "phone", "country", "city", "state", "postal_code"],
            where: { user_id: user_id }
        }).then(Address_List => {
            res.send({ Address_List });
        })
}

//Delete Address
exports.delete = (req, res) => {
    Addressesdb.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.send({
            message: "success",
            status: true
        });
    })
}

exports.update = (req, res) => {
    const userid = req.body.user_id;
    User.findOne({
        attributes: ["id", "name"],
        where: {
            id: userid
        },
    }).then(data => {
        Addressesdb.update({
            user_id: userid,
            name: data.name,
            address_id: req.body.address_id,
            address: req.body.address,
            country: req.body.country,
            state: req.body.state,
            postal_code: req.body.postal_code,
            phone: req.body.phone,
            city: req.body.city,
        },
            {
                where: { id: req.body.id },
            }).then(data => {
                res.json({
                    status:true,
                    message:"updated"
                });
            }).catch(err => {
                res.status(500).json(err);
            })
    })
}


//county 

exports.countriesList = async (req, res) => {
    const countriesList = worldMapData.getAllCountries();
    res.json(countriesList);
}

// Stateby country

exports.statesList = async (req, res) => {
    const country = req.body.country;
    const statesList = worldMapData.getAllStatesFromCountry(country);
    res.json(statesList);
}

//countryby city

exports.citiesList = async (req, res) => {
    const state = req.body.state;
    const citiesList = worldMapData.getAllCitiesFromState(state);
    res.json(citiesList);
}