const database = require("../config/db.sequalize");
const Reports = database.reports;
const User = database.user;
const nodemailer = require('nodemailer');

exports.report_send = async (req, res) => {

    User.findOne({
        where: { id: req.body.user_id },
    }).then(user => {
        // var email = email;
        Reports.create({
            User_id: User.id,
            from_mail: user.email,
            reason_for_report: req.body.reason_for_report,
            description: req.body.description,
            to_mail: "info.icollekt.app@gmail.com",
            status: 1,
        })


            .then((user) => {
                console.log(user, "userr");
                res.json(user);
            })
            .catch((err) => {
                res.status(500).json(err);
            });

    })
}

exports.findAll = (req, res) => {
    Reports.findAll()
        .then(data => {
            res.send(data);
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    Reports.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user with id"
            });
        });
};

exports.create = async (req, res) => {
    const userData = {
        reason_for_report: req.body.reason_for_report,
        description: req.body.description,
        status: req.body.status,
    };
    await Reports.create(userData)
        .then(data => {
            res.send(data);
        }).catch(err => {
            console.log(err);
            return res.status(500).json(err)
        });
}

exports.delete = (req, res) => {
    Reports.destroy(
        { where: { id: req.body.id } })
        .then(() => { res.send("deleted") })
}


exports.update = (req, res) => {
    Reports.update(
        {
            reason_for_report: req.body.reason_for_report,
            description: req.body.description,
            status: req.body.status,
        },
        { where: { id: req.body.id } })
        .then((data) => {
            res.send(data);
        })
}


exports.send_report = async (req, res) => {

    const transporter = nodemailer.createTransport({
   service: "gmail",
   host: "smtp.gmail.com",
   port: 587,
   auth: {
     user: "no-reply@i-collekt.crosshurdle.com",
     pass: "CrossH@321"
   },
   tls: {
     rejectUnauthorized: false
 }
 });

   User.findOne({
       attributes: ["id", "email", "password", "name", "phone", "address", "status"],
       where: { id: req.body.user_id },

   }).then(users => {
       Reports.create({
           reason_for_report: req.body.reason_for_report,
           description: req.body.description,
           from_mail: users.email,
           to_mail: process.env.EMAIL,
           status: 1,
       })
           .then((user) => {
               console.log(user.dataValues, "reqbody");
               const mailOptions = {
                   from: `${users.email}`,
                   to: 'janasiva@gmail.com',
                   subject: users.name + ">>" + user.reason_for_report,
                   text: user.description,
                   html: ``
               };
               transporter.sendMail(mailOptions, (err, info) => {

                  return res.send({
               result: false,
               message: "Mail sent"
             });
               });
           })
   })
}