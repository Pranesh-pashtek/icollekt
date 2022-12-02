const database = require("../config/db.sequalize");
const Help = database.help;
const User = database.user;
const nodemailer = require('nodemailer');
const { users } = require("../config/db.sequalize");


//create

exports.help_create = async (req, res) => {

  User.findOne({
    where: { id: req.body.user_id },
  }).then(user => {
    // var email = email;
    Help.create({
      user_id: user.id,
      from_mail: user.email,
      help_questions: req.body.help_questions,
      messages: req.body.messages,
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

//findall

exports.findAll = (req, res) => {
  Help.findAll(
    {
      attributes: ["id", "from_mail", "to_mail", "help_questions", "messages", "status", "created_at", "updated_at"],
      where: { status: 1 }
    }
  )
    .then(data => {
      res.send(data);
    })
}

exports.send_help = async (req, res) => {

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
    console.log(users.dataValues, "users");

    let userdata = {
      user_id: req.body.user_id,
      help_questions: req.body.help_questions,
      messages: req.body.messages,
      from_mail: users.email,
      to_mail: process.env.EMAIL,
      status: 1,
    }

    Help.create(userdata)
      .then((data) => {
        const mailOptions = {
          from: `${users.email}`,
          to: 'janasiva@gmail.com',
          subject: users.name + ">>" + data.help_questions,
          text: data.messages,
          html: ``
        };

        transporter.sendMail(mailOptions, (err, info) => {

          return res.send({
            result: false,
            message: "Mail Sent"
          });
        });
      })
  })
}