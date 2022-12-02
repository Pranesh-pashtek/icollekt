const database = require("../config/db.sequalize");
const nodemailer = require('nodemailer');
const env = require('dotenv');
env.config();
const User = database.user;
const Customer = database.customers;
const fast2sms = require('fast-two-sms');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var sequelize = require('sequelize');
const Collection = database.collections;
const Hashtags = database.hashtags;

exports.signUp = async (req, res) => {
  var minm = 10000;
  var maxm = 99999;
  var data = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  let userData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    verification_code: data,
    status: 0
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  User.findOne({
    attributes: ["id", "email", "password", "name", "phone", "address", "status", "verification_code", "provider_id", "email_verified_at", "country", "city", "postal_code"],
    where: {
      email: userData.email,
    },
  })
    .then((userExists) => {
      if (!userExists) {
        const password = bcrypt.hashSync(userData.password, 10);
        userData.password = password;

        console.log('userData', userData)

        User.create(userData)
          .then((user) => {
            if (req.body.sendBy == 'email') {
              const mailOptions = {
                from: process.env.EMAIL,
                to: userData.email,
                subject: 'Your verification code...',
                text: "I collekt verification code is :" + data,
                html: ``
              };

              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return console.log(error);
                }
                return res.json({
                  message: "A verification link has been sent to your email",
                });
              });
              if (user.id) {
                sendadminnotification(user.id);
              }
              return res.send({
                result: false,
                message: "Signup successfully",
                user_data: user
              });
            } else {
              // const response = fast2sms.sendMessage({ authorization: process.env.API_KEY, message: `i collekt verification code is : ${data}`, numbers: [userData.phone] });
              // res.send(response);
              return res.send({
                result: false,
                message: "Signup successfully",
                user_data: user
              });
            }
          })
          .catch((err) => {
            return res
              .status(200)
              .send("Failed to register the user. Please try again");
          });
      } else {
        return res.status(200).send({
          result: true,
          message: "User already exists",
          user_data: {}
        });
      }
    })
    .catch((err) => {
      return res.status(200).send("Message:" + err);
    });
};


function sendadminnotification(id) {
  // console.log("userid2: ",id);

  const request = require('request');
  const options = {
    url: process.env.ADMIN_URL + '/api/v2/auth/signup',
    json: true,
    body: {
      id: id
    }
  };

  request.post(options, (err, res, body) => {
    if (err) {
      return console.log(err);
    } else {
      console.log(`Status: ${res.statusCode}`);
      console.log(body);
      return true;
    }
  });
}

exports.VerificationCode = (req, res) => {
  const id = req.params.id;
  const { verification_code } = req.body;

  User.findByPk(id)
    .then(data => {
      if (data.verification_code == verification_code) {
        var v_code = '';
        var status = 1
        var email_verified_at = new Date();
        User.update({ status: status, verification_code: v_code, email_verified_at: email_verified_at }, { where: { id: id } });
        return res.send({
          result: false,
          message: "Verified successfully"
        });
      } else {
        return res.status(200).json({
          result: true,
          message: "Verification code is incorrect"
        });
      }
    })
}

exports.ForgotPassword = (req, res) => {
  var minm = 10000;
  var maxm = 99999;
  var data = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  if (req.body.email && req.body.sendBy == 'email') {
    User.findOne({ attributes: ["id", "email", "password", "name", "phone", "address", "status", "verification_code", "provider_id", "email_verified_at", "country", "city", "postal_code"], where: { email: req.body.email } }).then(user_data => {
      if (user_data) {
        User.findOne({ attributes: ["id", "email", "password", "name", "phone", "address", "status", "verification_code", "provider_id", "email_verified_at", "country", "city", "postal_code"], where: { id: user_data.id } }).then(user => {
          if (req.body.email == user.email) {
            const transporter = nodemailer.createTransport({
              service: "gmail",
              host: "smtp.gmail.com",
              port: 587,
              auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
              },
              tls: {
                rejectUnauthorized: false
              }
            });

            User.update({ verification_code: data }, { where: { id: user_data.id } })
            const mailOptions = {
              from: process.env.EMAIL,
              to: user.email,
              subject: 'Your verification code...',
              text: "I collekt OTP is :" + data,
              html: ``
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return console.log(error);
              }
              return res.json({
                message: "A OTP has been sent to your email",
              });
            });
            return res.send({
              result: false,
              message: "OTP has been sent your email.",
              id: user_data.id,
              verification_code: user_data.verification_code
            });
          }
        })
      } else {
        return res.send({
          result: true,
          message: "Email is not exist."
        });
      }
    })
  } else if (req.body.sendBy == 'mobile') {
    User.findOne({ attributes: ["id", "email", "password", "name", "phone", "address", "status", "verification_code", "provider_id", "email_verified_at", "country", "city", "postal_code"], where: { phone: req.body.phone } }).then(user_data => {
      if (user_data) {
        User.update({ verification_code: data }, { where: { id: user_data.id } })
        const response = fast2sms.sendMessage({ authorization: process.env.API_KEY, message: `i collekt verification code is : ${data}`, numbers: [user_data.phone] });
        //res.send(response);
        return res.send({
          result: false,
          message: "OTP code has been sent."
        });
      } else {
        return res.send({
          result: true,
          message: "Mobile number is not exist."
        });
      }
    })
  }
}

exports.ConfirmPassword = (req, res) => {
  const id = req.params.id;
  const { password } = req.body;
  User.findOne({ attributes: ["id", "email", "password", "name", "phone", "address", "status", "verification_code", "provider_id", "email_verified_at", "country", "city", "postal_code"], where: { id: id } }).then(user => {
    const pass = bcrypt.hashSync(password, 10);
    User.update({ password: pass }, { where: { id: id } })
    res.status(200).json({
      result: false,
      message: "Password has been changed.",
      user_data: user
    });
  })
}

exports.ResendCode = (req, res) => {
  var minm = 10000;
  var maxm = 99999;
  var data = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  const id = req.params.id;
  User.findOne({ attributes: ["id", "email", "password", "name", "phone", "address", "status", "verification_code", "provider_id", "email_verified_at", "country", "city", "postal_code"], where: { id: id } }).then(user => {
    if (req.body.sendBy == 'email') {
      if (req.body.email == user.email) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          port: 587,
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
          },
          tls: {
            rejectUnauthorized: false
          }
        });
        User.update({ verification_code: data }, { where: { id: id } })
        const mailOptions = {
          from: process.env.EMAIL,
          to: user.email,
          subject: 'Your verification code...',
          text: "I collekt verification code is :" + data,
          html: ``
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          return res.json({
            message: "A verification link has been sent to your email",
          });
        });
        return res.send({
          result: false,
          message: "Verification code has been sent your email."
        });
      }
    } else if (user.phone == req.body.phone) {
      User.update({ verification_code: data }, { where: { id: id } })
      const response = fast2sms.sendMessage({ authorization: process.env.API_KEY, message: `i collekt verification code is : ${data}`, numbers: [user.phone] });
      //res.send(response);
      return res.send({
        result: false,
        message: "Verification code has been sent."
      });
    }
  })
}

exports.SocialLogin = (req, res) => {
  const { name, email, provider_id, email_verified_at } = req.body;
  User.findOne({
    attributes: ["id", "email", "name", "phone", "address", "status", "verification_code", "provider_id", "email_verified_at", "country", "city", "postal_code"],
    where: { email: email, status: 1 }
  })
    .then(user => {
      let token = jwt.sign({ user: user }, process.env.AUTH_SECRET,);
      if (user) {
        let token = jwt.sign({ user: user }, process.env.AUTH_SECRET,);
        res.status(200).json({
          result: false,
          message: "Login Successfully",
          user_data: user,
          token: token
        });
      } else {
        User.create({
          name: name,
          email: email,
          provider_id: provider_id,
          email_verified_at: new Date(),
          status: 1
        }).then(user => {
          res.status(200).json({
            result: false,
            message: "Login Successfully",
            user_data: user,
            token: token
          });
          Customer.create({ user_id: user.id })
        })
      }
    })
}

exports.signIn = async (req, res) => {
  let { email, password } = req.body

  User.findOne({
    attributes: ["id", "email", "password", "name", "phone", "address", "status", "verification_code", "provider_id", "email_verified_at", "country", "city", "postal_code"],
    where: {
      email: email, status: 1
    }
  }).then(user => {
    if (!user) {
      res.status(200).json({
        result: true,
        message: "please verify your email.",
        user_data: {}
      });
    } else {
      if (bcrypt.compareSync(password, user.password)) {
        let token = jwt.sign({ user: user }, process.env.AUTH_SECRET,
          // {
          //   expiresIn:"1d"
          // }
        );
        res.cookie('token', token, {
          secure: false,
          httpOnly: true,
        });
        res.json({
          result: false,
          message: "Login Successfully",
          user_data: user,
          token: token
        });
      } else {
        res.status(200).json({
          result: true,
          message: "Password is incorrect",
          user_data: {}
        });
      }
    }
  })

};

exports.Logout = (req, res) => {
  User.update(
    {
      device_token: "",
    },
    { where: { id: req.params.id } })
    .then((data) => { })
  res.clearCookie("token");
  res.status(200).json({
    result: false,
    message: "Logout Successfully"
  });
}



// exports.findAll = (req, res) => {


//   User.findAll
//     (
//       // {attributes:["id","title"],
//       // where:{title: "men"}}
//     )
//     .then(data => {
//       res.send(data);
//     })
// }
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {

      res.send(data.dataValues);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id
      });
    });
};


exports.new = (req, res) => {
  User.findAll(
    {
      attributes: ["id", "email", "password", "name", "phone", "address", "status"],
      where: { status: 1 }
    }
  )
    .then(data => {
      const count = data.length;
      const users_id = "" + "CHS" + new Date().getDate() + (new Date().getMonth() + 1) + new Date().getFullYear() + (count + 1);

      User.create({

        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
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
  User.findAll(
    {
      attributes: ["id", "email", "device_token", "password", "name", "phone", "address", "status", "verification_code", "provider_id", "email_verified_at", "country", "city", "postal_code"],
      where: { status: 1 }
    }
  )
    .then(data => {
      res.send(data);
    })
}

//delete user
exports.delete = (req, res) => {

  User.destroy(

    { where: { id: req.body.id } })

    .then(() => { res.send("deleted") })

}


exports.update = (req, res) => {

  User.update(
    {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address

    },
    { where: { id: req.body.id } })
    .then((data) => {
      res.send(data);
    })

}

exports.infoupdate = async (req, res) => {
  const userData = {
    name: req.body.name,
  };

  await User.create(userData)
    .then(data => {
      res.send(data);
    }).catch(err => {
      console.log(err);
      return res.status(500).json(err)
    });


  // user/shipping/create

  exports.shipping = (req, res) => {
    User.create({
      id: req.body.id,
      address: req.body.address,
      country: req.body.country,
      city: req.body.city,
      postal_code: req.body.postal_code,
      phone: req.body.phone,
      //  status:1
    }).then(user => {

      res.json(user);
    }).catch(err => {
      res.status(500).json(err);
    })
  }


  // user/shipping/update
  exports.shipping = async (req, res) => {
    const userData = {
      address: req.body.address,
      country: req.body.country,
      city: req.body.city,
      postal_code: req.body.postal_code,
      phone: req.body.phone,
    };
    User.update(
      userData,
      { where: { id: req.body.id } })
      .then((data) => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json(err)
      });
  }
}
exports.dobUpdate = (req, res) => {

  User.update(
    {
      date_of_birth: req.body.date_of_birth,

    },
    { where: { id: req.body.id } })
    .then((data) => {
      if (data) {
        return res.status(200).send({
          result: true,
          message: "Your date of birth Will Be Updated",

        });
      }

    })

}

exports.collectionUpdate = (req, res) => {

  User.update(
    {
      user_collection: req.body.user_collection,

    },
    { where: { id: req.body.id } })
    .then((data) => {
      console.log('data', data);
      if (data) {
        return res.status(200).send({
          result: true,
          message: "Your Collection Will Be Updated",

        });
      }

    })

}



//hashtags
// exports.hashtagUpdate = (req, res) => {
//   var tags = [];
//   if(req.body.hashtags !== ' ' ){
//     tag = req.body.hashtags;   
//   }else{
//     return res.status(200).send({
//       result: true,
//       message: "Please enter again",     
//     });
//   }
//   tag.map(data=>{
//     tag.push(data)
//   })
//   User.update(
//     {
//       hashtags: tags,
//     },
//     { where: { id: req.body.id } })    
//    .then((data)  => {    
//       if (data) {
//         return res.status(200).send({
//           result: true,
//           message: "Your Hashtags Will Be Updated",

//         });
//       } 

//     })

// }


// sigup_exist

exports.signUp_exist = async (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((userExists) => {
      if (!userExists) {
        return res.status(200).send({
          result: false,
          message: "welcome to icollekt",

        });
      }
      else {
        return res.status(200).send({
          result: true,
          message: "Email Already Exist",

        });
      }
    })
}

//signUp_exist_Social_login

exports.signUp_exist_social_login = async (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
      provider_id: req.body.provider_id
    },
  })
    .then((userExists) => {
      if (!userExists) {
        return res.status(200).send({
          result: false,
          message: "welcome to icollekt",

        });
      }
      else {
        return res.status(200).send({
          result: true,
          message: "SocialLogin-Email Already Exist",

        });
      }
    })
}

//User Name Exist

exports.followersUpdate = (req, res) => {
  User.findOne({
    attributes: ["id", "name", "userfollower", "following", "followers", "userfollowing"],
    where: { id: req.params.id }
  }).then(data => {
    let datas = [];
    datas.push(req.body.userid)
    datas.push(data.dataValues.userfollower)
    console.log(datas, "userfollower");
    User.update(

      {
        userfollower: "" + datas + "",
        followers: sequelize.literal('followers + 1')
      },

      {
        where: { id: req.params.id }
      })
      .then((data) => {

        res.send(data);
      })
  })
}


exports.followingUpdate = (req, res) => {
  User.findOne({
    attributes: ["id", "name", "userfollower", "following", "followers", "userfollowing"],
    where: { id: req.params.id }
  }).then(data => {
    let datas = [];
    datas.push(req.body.userid)
    datas.push(data.dataValues.userfollowing)
    console.log(datas, "userfollowing");
    User.update(
      {
        userfollowing: "" + datas + "",
        following: sequelize.literal('following + 1')
      },

      {
        where: { id: req.params.id }
      })
      .then((data) => {
        res.send(data);
      })
  })
}

exports.followCount = (req, res) => {
  const id = req.params.id;
  console.log(id, 'data')
  User.findOne({
    attributes: ["following", "followers"],
    where: { id: id }
  }).then(data => {
    res.send(data);
  })
};



exports.viewFollowing = async (req, res) => {
  let userfollowing = [];
  await User.findOne({
    attributes: ["id", "name", "following", "followers", "userfollowing", "userfollower"],
    where: { id: req.params.id }
  }).then(data => {
    let inputStr = data.dataValues.userfollowing;
    let outputStr = inputStr.split(',');
    for (var i = 0; i < outputStr.length; i++) {
      User.findOne(
        {
          attributes: ["id", "name", "userfollower", "following", "followers", "userfollowing"],
          where: { id: (outputStr[i]) }
        }).then(data => {
          userfollowing.push(data.dataValues);
        })
    }
    setTimeout(() => {
      res.status(200).json({ userfollowing });
    }, 200);
  })

};

// Device_token

exports.device_token_update = (req, res) => {
  User.update(
    {
      device_token: req.body.device_token,

    },
    { where: { id: req.body.id } })
    .then((data) => {

      if (req.body.device_token != "") {
        return res.status(200).send({
          result: true,
          message: "Your Token Will Be Updated",
        });
      }
      else {
        return res.status(200).send({
          result: false,
          message: "Failed",

        });
      }
    })
}

exports.notificationUpdate = (req, res) => {
  User.update(
    {
      delivery_notification: req.body.delivery_notification,
      inbox_notification: req.body.inbox_notification,
      group_notification: req.body.group_notification
    },
    { where: { id: req.body.id } })
    .then((data) => {
      return res.status(200).send({
        delivery_notification: req.body.delivery_notification,
        inbox_notification: req.body.inbox_notification,
        group_notification: req.body.group_notification
      });
    })
}
exports.notificationView = (req, res) => {
  User.findOne({
    attributes: ["delivery_notification", "inbox_notification", "group_notification"],
    where: {
      id: req.body.id
    }
  }).then((data) => {
    res.json(data)
  })
}