const database = require("../config/db.sequalize");
const Group_image = database.group_image;
const User = database.user;
const Group_link = database.group_links;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const nodemailer = require('nodemailer');
const Group_invite = database.group_invite;
const Group_request = database.group_request;
const fs = require('fs');
const Group_users = database.group_users;
const { admin } = require('../config/firebase.config')

// image update
exports.edit = (req, res) => {
  const id = req.params.id;
  const data = `http://localhost:3001/group_images/${req.file.filename}`;

  Group_image.findOne({
    attributes: ["id", "group_image"],
    where: {
      id: id
    }
  }).then((group) => {
    if (group.group_image !== null) {
      let url = group.group_image;
      let filename = url.split('/').pop();
      let group_image = filename.replace(/['"]+/g, '')
      fs.unlink(`./upload/group_images/${group_image}`, function (err) {
        if (err) throw err;
        console.log('File deleted!');
      });
      Group_image.update(
        {
          group_image: data,
          status: 1,
        },
        { where: { id: id } }
      )
        .then((user) => {
          res.json({
            success: true,
            group_image_url: `http://localhost:3001/group_images/${req.file.filename}`,
          });
        })
        .catch((err) => {
          res.status(200).json(err);
        })
    } else {
      Group_image.update(
        {
          group_image: data,
          status: 1,
        },
        { where: { id: id } }
      )
        .then((user) => {
          res.json({
            success: true,
            group_image_url: `http://localhost:3001/group_images/${req.file.filename}`,
          });
        })
        .catch((err) => {
          res.status(200).json(err);
        })

    }
  })
};


// exports.new = (req, res) => {
//   var user_lists = req.body.user_list;
//   var result = "";
//   var characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   var charactersLength = characters.length;
//   for (var i = 0; i < charactersLength; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   const data = `http://i-collekt.jksoftec.com:3001/group_images/${req.files["group_image"][0].filename}`;
//   const bgimage = `http://i-collekt.jksoftec.com:3001/group_images/${req.files["group_banner"][0].filename}`;

//   Group_image.findOne({
//     attributes: ["id", "subject"],
//     where: { subject: req.body.subject },
//   })
//     .then((group) => {
//       console.log(group, "asss");
//       if (!group) {
//         user2 = user_lists + "," + req.body.user_id;
//         let userdata = {
//           subject: req.body.subject,
//           message: req.body.message,
//           user_id: req.body.user_id,
//           user_list: user2,
//           group_image: data,
//           group_banner: bgimage,
//           status: 1,
//         };
//         Group_image.create(userdata).then((user) => {
//           Group_link.create({
//             group_id: user.id,
//             url: `http://i-collekt.jksoftec.com:3001/${user.subject}/${result}`,
//           })
//           res.json({
//             id: user.id,
//             Status: false,
//             Message: "Your Group Has Been Created",
//           });
//           var userdata2 = {
//             subject: req.body.subject,
//             message: req.body.message,
//             creater_id: req.body.user_id,
//             user_id: req.body.user_id,
//             group_id: user.id,
//             user_list: req.body.user_id,
//             group_image: data,
//             group_banner: bgimage,
//             status: 1,
//           };
//           Group_users.create(userdata2);

//           user_data = user_lists.split(",");
//           for (var i = 0; user_data.length > i; i++) {
//             let userdata1 = {
//               subject: req.body.subject,
//               message: req.body.message,
//               group_id: user.id,
//               creater_id: req.body.user_id,
//               user_id: user_data[i],
//               group_image: data,
//               group_banner: bgimage,
//               status: 1,
//             };
//             Group_users.create(userdata1);
//           }
//           Group_users.update({ creater_id: req.body.user_id }, { where: { creater_id: 0 } });
//         });
//       } else {
//         res.json({
//           Status: true,
//           Message: "Group Subject Already Exist",
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(200).json(err);
//     });
// };




// new group create
exports.new = (req, res) => {
  var user_lists = req.body.user_list;
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < charactersLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  const data = `http://i-collekt.jksoftec.com:3001/group_images/${req.files["group_image"][0].filename}`;
  const bgimage = `http://i-collekt.jksoftec.com:3001/group_images/${req.files["group_banner"][0].filename}`;

  const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };
  Group_image.findOne({
    attributes: ["id", "subject"],
    where: { subject: req.body.subject },
  })
    .then((group) => {
      if (!group) {
        var user2 = user_lists + "," + req.body.user_id;
        let userdata = {
          subject: req.body.subject,
          message: req.body.message,
          user_id: req.body.user_id,
          user_list: user2,
          group_image: data,
          group_banner: bgimage,
          status: 1,
        };
        Group_image.create(userdata).then((user) => {
          // console.log(user,'aaaaaaaaaaaaaaaaaaaaaaaaaaaa');
          Group_link.create({
            group_id: user.id,
            url: `http://i-collekt.jksoftec.com:3001//${user.subject}/${result}`,
          });

          res.json({
            id: user.id,
            Status: false,
            Message: "Your Group Has Been Created Sucessfully",
          });
          var userdata2 = {
            subject: req.body.subject,
            message: req.body.message,
            creater_id: req.body.user_id,
            user_id: user.user_id,
            group_id: user.id,
            user_list: req.body.user_id,
            group_image: data,
            group_banner: bgimage,
            status: 1,
          };
          Group_users.create(userdata2);
          user_data = user_lists.split(",");
          for (var i = 0; user_data.length > i; i++) {
            let userdata1 = {
              subject: req.body.subject,
              message: req.body.message,
              group_id: user.id,
              creater_id: req.body.user_id,
              user_id: user_data[i],
              group_image: data,
              group_banner: bgimage,
              status: 1,
            };
            Group_users.create(userdata1);

            User.findOne({
              attributes: ["id", "device_token"],
              where: {
                id: user_data[i]
              }
            }).then((data2) => {

              User.findOne({
                attributes: ["id", "name"],
                where: {
                  id: req.body.user_id
                }
              }).then((name) => {

                const registrationToken = data2.device_token
                const options = notification_options;
                const message = {
                  'notification': {
                    'title': `${name.name} created  group "${userdata1.subject}"`,
                    'body': `and added you to that group`
                  },
                  'data': {
                    'value': `${user.id}`,
                    'key_value': 'Group post',
                    'status': '1'
                  }
                };

                admin.messaging().sendToDevice(registrationToken, message, options)
                  .then(function (response) {
                    console.log("Successfully sent message:", response);
                  })
                  .catch(function (error) {
                    console.log("Error sending message:", error);
                  });

              })
            })
          }

        });
      } else {
        res.json({
          Status: true,
          Message: "Group Subject Already Exist", // Your Request Has Been Sended To Admin
        });
      }
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};


exports.findAll = (req, res) => {
  var data = [];
  user_id = req.body.userid;

  Group_image.findAll({
    attributes: ["id", "subject", "group_image", "message", "user_id", "user_list", "status"],
  }).then((data1) => {
    var newArr = [];
    newArr = data1.map(function (item) {
      return item.id
    });
    for (i = 0; i < newArr.length; i++) {
      Group_image.findOne({
        attributes: ["id", "subject", "group_image", "message", "user_id", "user_list", "status",],
        where: {
          id: newArr[i]
        }
      }).then((datas) => {
        var output = [];
        input = datas.dataValues.user_list
        input = input.split(',')
        output.push(input);
        let numberArray = (output[0]).map(Number);
        const hasValue = numberArray.includes(user_id);
        if (!hasValue) {
          Group_image.findOne({
            where: {
              id: datas.id
            }
          }).then((data5) => {
            data.push(data5)
          })
        }
      })
    }
  });
  setTimeout(() => {
    res.status(200).json({ data });
  }, 200);
};



// Findone
exports.findOne = (req, res) => {
  const id = req.params.id;

  Group_image.findOne({ where: { id: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(200).send({
        message: "Error retrieving user with id=" + id,
      });
    });
};

// Deleting Profile_image

exports.delete_group_img = (req, res) => {
  const id = req.body.id
  Group_image.findOne({
    attributes: ["id", "group_image"],
    where: {
      id: id
    }
  }).then((data) => {

    let url = data.group_image;
    let filename = url.split('/').pop();
    let group_image = filename.replace(/['"]+/g, '')
    console.log(group_image, "group_image");
    Group_image.update({ group_image: null }, {
      where: { id: id }
    }).then(() => {
      fs.unlink(`./upload/group_images/${group_image}`, function (err) {

        if (err) throw err;
        console.log('File deleted!');
      });
      res.json({
        status: "sucess",
      });
    })
      .catch((err) => {
        res.status(200).json(err);
      })
  });
};

//View Group_img

exports.view_group_img = (req, res) => {
  const id = req.params.id;
  console.log(id, "data");
  Group_image.findOne({
    attributes: ["group_image"],
    where: { id: id },
  }).then((data) => {
    res.send(data);
  });
};

// Findone by user_id

exports.findOne_userID = (req, res) => {
  const user_id = req.params.user_id;
  Group_users.findAll({
    attributes: [
      "group_id",
      "subject",
      "group_image",
      "message",
      "user_id",
      "status",
    ],
    where: { user_id: user_id },
  }).then((data) => {
    res.send({ data });
  });
};

// Group_Banner_img_upload

exports.edit_banner = (req, res) => {
  const id = req.params.id;
  const data = `http://localhost:3001/group_banner/${req.file.filename}`;
  Group_image.findOne({
    attributes: ["id", "group_banner"],
    where: {
      id: id
    }
  }).then((group) => {
    if (group.group_banner !== null) {
      let url = group.group_banner;
      let filename = url.split('/').pop();
      let group_banner = filename.replace(/['"]+/g, '')

      fs.unlink(`./upload/group_banner/${group_banner}`, function (err) {
        if (err) throw err;
        console.log('File deleted!');
      });

      Group_image.update(
        {
          group_banner: data,
        },
        { where: { id: id } }
      )
        .then((user) => {
          res.json({
            success: true,
            group_banner_url: `http://localhost:3001/group_banner/${req.file.filename}`,
          });
        })
        .catch((err) => {
          res.status(200).json(err);
        });
    } else {
      Group_image.update(
        {
          group_banner: data,
        },
        { where: { id: id } }
      )
        .then((user) => {
          res.json({
            success: true,
            group_banner_url: `http://localhost:3001/group_banner/${req.file.filename}`,
          });
        })
        .catch((err) => {
          res.status(200).json(err);
        });
    }
  })
};

// Deleting Banner_image

exports.delete_group_banner_img = (req, res) => {
  const id = req.body.id
  Group_image.findOne({
    attributes: ["id", "group_banner"],
    where: {
      id: id
    }
  }).then((data) => {

    let url = data.group_banner;
    let filename = url.split('/').pop();
    let group_banner = filename.replace(/['"]+/g, '')


    Group_image.update({ group_banner: null }, { where: { id: req.body.id } })
      .then((order) => {
        fs.unlink(`./upload/group_images/${group_banner}`, function (err) {

          if (err) throw err;
          console.log('File deleted!');
        });
        res.json({
          status: "sucess",
        });
      })
      .catch((err) => {
        res.status(200).json(err);
      })
  })
};

//View Group_img

exports.view_group_banner_img = (req, res) => {
  const id = req.params.id;
  console.log(id, "data");
  Group_image.findOne({
    attributes: ["group_banner"],
    where: { id: id },
  }).then((data) => {
    res.send(data);
  });
};

// Find Contact

exports.find_contact = (req, res) => {
  const user_id = req.body.user_id;
  data = [];
  User.findAll({
    attributes: ["id", "name", "profile_pic"],
    where: { status: 1 },
  }).then((datass) => {

    for (var j = 0; j < datass.length; j++) {

      var newArr = datass.map(function (item) {
        return item.id
      });
      if (user_id !== newArr[j]) {

        User.findOne({
          attributes: ["id", "name", "profile_pic"],
          where: { id: newArr[j] }
        }).then(output => {
          data.push(output);
        })
      }
    }
    setTimeout(() => {
      res.status(200).json({ data });
    }, 200);
  });

};

// Find Contact Details

// exports.find_contact_list = async (req, res) => {
//   let user_list = [];
//   await Group_image.findOne({
//     attributes: ["user_list"],
//     where: { id: req.params.id },
//   }).then((data) => {
//     console.log(data.user_list,"ioioioioiooi");
//     let inputStr = data.user_list;
//     let outputStr = inputStr.split(",");
//       User.findAll({
//         attributes: ["id", "name", "profile_pic"],
//         where: { id: outputStr },
//       }).then((data) => {
//         res.status(200).json({ user_list: data });
//       });
//   });
// };


exports.find_contact_list = async (req, res) => {
  let user_list = [];
  let admin = [];
  let Admin_list = [];
  await Group_image.findOne({
    attributes: ["user_list", "user_id", "admin_list"],
    where: { id: req.params.id },
  }).then((data) => {
    User.findOne({
      attributes: ["id", "name", "profile_pic"],
      where: { id: data.user_id, },
    }).then((data_admin) => {

      admin.push(data_admin);
    });
    if (data.user_list == null || data.user_list == "") {
      Admin_list.push()
    } else {
      let inputStr = data.user_list;
      let outputStr = inputStr.split(",");
      let outputStr1 = outputStr.filter((value) => value !== data.user_id);
      outputStr1 = outputStr1.reverse()
      for (var i = 0; i < outputStr1.length; i++) {
        User.findOne({
          attributes: ["id", "name", "profile_pic"],
          where: { id: [outputStr1[i]], },
        }).then((data) => {
          user_list.push(data);
        });
      }
    }
    if (data.admin_list == null || data.admin_list == "") {
      Admin_list.push()
    } else {
      let Sub_adminS = data.admin_list;
      let Sub_adminSS = Sub_adminS.split(",")
      for (var j = 0; j < Sub_adminSS.length; j++) {
        User.findOne({
          attributes: ["id", "name", "profile_pic"],
          where: { id: [Sub_adminSS[j]], },
        }).then((data) => {
          Admin_list.push(data);
        });
      }
    }
    setTimeout(() => {
      const data = { user_list: user_list };
      const user_lists = data["user_list"];
      user_lists.sort((x, y) => {
        let a = x.name.toUpperCase(),
          b = y.name.toUpperCase();
        return a == b ? 0 : a > b ? 1 : -1;
      });
      const datas = { Admin_list: Admin_list };
      const Admin_lists = datas["Admin_list"];
      Admin_lists.sort((x, y) => {
        let a = x.name.toUpperCase(),
          b = y.name.toUpperCase();
        return a == b ? 0 : a > b ? 1 : -1;
      });
      res.status(200).json({ admin, user_lists, Admin_lists });
    }, 500);
  });
};


// exports.find_contact_list = async (req, res) => {
//   let user_list = [];
//   await Group_image.findOne({
//     attributes: ["user_list"],
//     where: { id: req.params.id },
//   }).then((data) => {
//     let inputStr = data.user_list;
//     let outputStr = inputStr.split(",");
//     for (var i = 0; i < outputStr.length; i++) {
//       console.log(outputStr[i], "data");
//       User.findOne({
//         attributes: ["id", "name", "profile_pic"],
//         where: { id: [outputStr[i]] },
//       }).then((data) => {
//         // console.log(data,'datass');
//         // data = data.name
//         user_list.push(data);
//       });
//     }
//     setTimeout(() => {
//       res.status(200).json({ user_list });
//     }, 2000);
//   });
// };

// exports.find_contact_list = async (req, res) => {
//   try {
//     var user_list = [], setSplit
//     const getGroup = await Group_image.findOne({ attributes: ["user_list"], where: { id: req.params.id } })
//     setSplit = getGroup.user_list.split(',')
//     await User.findAll({
//       attributes: ['id', 'name', 'profile_pic'],
//       where: { id: setSplit }
//     }).then((collect) => {
//       user_list.push(collect)
//     })
//     return res.send({ user_list }), getGroup
//   } catch (error) {
//     console.log(error);
//   }
// };



// var array = ["1", "2", "3", "4", "5", "6"];
// var newArray = array.filter((value) => value != "3");
// console.log(newArray);
exports.invite_contact = (req, res) => {
  ids = [];
  data = [];
  Group_image.findOne({
    attributes: ["id", "subject", "user_list"],
    where: {
      id: req.params.id
    }
  }).then((data2) => {
    data2 = data2.user_list
    let data3 = data2.split(',');
    ids.push(data3)
    let userlist = (ids[0]).map(Number);

    User.findAll({
      attributes: ["id", "name"]
    }).then((user) => {
      var users = user.map(function (item) {
        return item.id
      });

      var array3 = users.filter(function (obj) { return userlist.indexOf(obj) == -1; });

      for (i = 0; i < array3.length; i++) {
        User.findOne({
          attributes: ["id", "name", "profile_pic"],
          where: {
            id: array3[i]
          }
        }).then((data1) => {
          data.push(data1)
        })
      }
    })

  })
  setTimeout(() => {
    res.status(200).json({ data });
  }, 200);

};

//join request to Admin
exports.joinRequest = async (req, res) => {
  const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };
  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   host: "smtp.gmail.com",
  //   port: 587,
  //   auth: {
  //     user: process.env.EMAIL,
  //     pass: process.env.PASS,
  //   },
  //   tls: {
  //     rejectUnauthorized: false,
  //   },
  // });
  User.findOne({
    attributes: ["email", "id", "name", "profile_pic",],
    where: { id: req.body.user_id },
  }).then((users) => {
    User.findOne({
      attributes: ["email", "id", "profile_pic", "name"],
      where: { id: req.body.adminid },
    }).then((admins) => {
      Group_link.findOne({
        attributes: ["url"],
        where: { group_id: req.body.group_id },
      }).then((groupdata) => {
        Group_image.findOne({
          attributes: ["id", "subject", "message", "group_image"],
          where: {
            id: req.body.group_id,
          },
        }).then((data1) => {
          Group_request.create({
            user_id: req.body.user_id,
            group_id: req.body.group_id,
            name: users.name,
            user_profile: users.profile_pic,
            group_names: data1.subject,
            group_image: data1.group_image,
            admin_id: req.body.adminid,
            status: 1,
          }).then(user => {
            // let content =
            //   `<center>` +
            //   `<img src="http://i-collekt.jksoftec.com:3001/profile/profile_1646031469804.png" alt="" width="250">` +
            //   `<p style="color:#5c1c4c;"><b>${users.name}  requesting to join the group  "${data1.subject}"</b></p>` +
            //   `<center>` +
            //   `<div style="display: inline-flex;" >` +
            //   `<form action="http://i-collekt.jksoftec.com:3001/api/group_image/group_link/update/${users.id}/${req.body.group_id}" method="POST"><button type="submit" value="Join Group" style="background-color:#e3c904;color:#5c1c4c;margin-right:8px;margin-right:8px;height:30px;width:90px;border-radius:10px;"><b>Accept</b></button></form>` +
            //   `<form action="https://mail.google.com"><button style="background: #5c1c4c;color:#e3c904;margin-left:8px;height:30px;width:90px;border-radius: 10px;"><b>Reject</b></button></form>`;
            // +`</div>` + `</center>` + `</center>`;
            // const mailOptions = {
            //   from: `${users.email}:`,
            //   to: admin.email,
            //   subject: `${users.name}` + " " + "Requested to join Group" + " " + `${data1.subject}`,
            //   text: data1.subject + data1.message,
            //   html: content,
            // };
            // transporter.sendMail(mailOptions, (err, info) => {
            User.findOne({
              attributes: ["id", "device_token"],
              where: { id: req.body.adminid },
            }).then((datass) => {
              const registrationToken = datass.device_token;
              const options = notification_options;
              const message = {
                'notification': {
                  'title': `${users.name} Give a join request for ${data1.subject} group`,
                  'image': `${data1.group_image}`
                  // 'body': req.body.chat,
                },
                'data': {
                  'value': `${req.body.group_id}`,
                  'key_value': 'join request',
                  'status': '1'
                }
              };
              console.log(message, "message");
              admin.messaging().sendToDevice(registrationToken, message, options)
                .then(function (response) {
                  console.log("Successfully sent message:", response);
                })
                .catch(function (error) {
                  console.log("Error sending message:", error);
                });
            });
              return res.send({
                result: false,
                message: "Your Request Sent To Group Admin",
              });
            // });
          });
        });
      });
    });
  });
};

//for join request api ADMIN (Accept)
exports.grouprequestlink = (req, res) => {
  const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };
  const group_id = req.params.group_id;
  const user_id = req.params.id;

  Group_link.findOne({
    attributes: ["group_id"],
    where: { group_id: group_id },
  }).then((datas) => {
    datas = datas.group_id;
    const id = datas;

    Group_image.findOne({
      where: { id: id },
    }).then((data) => {
      var E = data.user_list.split(",");
      var S = E.includes(user_id);
      data1 = data.user_list;
      data2 = data1 + "," + user_id;
      if (S == false) {
        Group_users.create({
          group_id: datas,
          subject: data.subject,
          group_image: data.group_image,
          group_banner: data.group_banner,
          message: data.message,
          status: 1,
          creater_id: data.user_id,
          user_id: user_id,
        });

        Group_image.update(
          {
            user_list: data2,
          },
          { where: { id: datas } }
        ).then((output) => {

          User.findOne({
            attributes: ["id", "device_token"],
            where: { id: user_id },
          }).then((datass) => {

            const registrationToken = datass.device_token;
            const options = notification_options;
            const message = {
              'notification': {
                'title': `Admin accepted your join request for ${data.subject} group`,
                // 'body': req.body.chat,
              },
              'data': {
                'value': `${group_id}`,
                'key_value': 'join request accepted',
                'status': '1'
              }
            };
            console.log(message, "message");
            admin.messaging().sendToDevice(registrationToken, message, options)
              .then(function (response) {
                console.log("Successfully sent message:", response);
              })
              .catch(function (error) {
                console.log("Error sending message:", error);
              });
            res.send(
              `<html><head><link rel = "icon" type = "image/png" href = "http://i-collekt.jksoftec.com:3001/profile/profile_1646031469804.png"></head> <center> <img src="http://i-collekt.jksoftec.com:3001/profile/profile_1646031469804.png" alt="" width="250" height="200"> <p style="color:#5c1c4c;"><b>This User successfully added to  "${data.subject}"  Group <b></p>  
        <form action="https://mail.google.com"><button style="background:#5c1c4c;color:#e3c904;margin-left:8px;height:30px;width:90px; border-radius: 8px;">Exit</button></form></center></html>`
            );
          });
        });
      } else {
        res.send(
          `<html><head><link rel = "icon" type = "image/png" href = "http://i-collekt.jksoftec.com:3001/profile/profile_1646031469804.png"></head> <center> <img src="http://i-collekt.jksoftec.com:3001/profile/profile_1646031469804.png" alt="" width="250" height="200"> <p style="color:#5c1c4c;"><b>This User is Already Added To This  "${data.subject}"  Group <b></p>  
        <form action="https://mail.google.com"><button style="background:#5c1c4c;color:#e3c904;margin-left:8px;height:30px;width:90px; border-radius: 8px;">Exit</button></form></center></html>`
        )
      }
    });
  });
};

//invite request  from admin
exports.group_invite = async (req, res) => {
  const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };
  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   host: "smtp.gmail.com",
  //   port: 587,
  //   auth: {
  //     user: process.env.EMAIL,
  //     pass: process.env.PASS,
  //   },
  //   tls: {
  //     rejectUnauthorized: false,
  //   },
  // });
  User.findOne({
    attributes: ["email", "name", "profile_pic"],
    where: { id: req.body.user_id },
  }).then((users) => {
    console.log(users.email, "user_mail");
    User.findOne({
      attributes: ["email", "id", "profile_pic", "name"],
      where: { id: req.body.toUser_id },
    }).then((touser) => {
      console.log(touser.email, "touser_mail");
      Group_link.findOne({
        attributes: ["url"],
        where: { group_id: req.body.group_id },
      }).then((groupdata) => {
        Group_image.findOne({
          attributes: ["user_id", "group_image", "subject"],
          where: { id: req.body.group_id },
        }).then((group_data) => {
          Group_invite.create({
            // id:req.body.id,
            user_id: req.body.toUser_id,
            group_id: req.body.group_id,
            name: users.name,
            admin_profile: users.profile_pic,
            group_names: group_data.subject,
            group_image: group_data.group_image,
            invited_by: req.body.user_id,
            status: 1,
          }).then(user => {
            // let content =
            //   `<center>` +
            //   `<img src="http://i-collekt.jksoftec.com:3001/profile/profile_1646031469804.png" alt="" width="250">` +
            //   `<p style="color:#5c1c4c;"><b> ${users.name} Invite You to Icollekt Group </b></p>` +
            //   `<center>` +
            //   `<div style="display: inline-flex;" >` +
            //   `<form action="http://i-collekt.jksoftec.com:3001/api/group_image/group/group_link/update/${touser.id}/${req.body.group_id}" method="POST"><button type="submit" value="Join Group" style="background-color:#e3c904;color:#5c1c4c;margin-right:8px;height:30px;width:90px;border-radius: 10px;"><b>Accept</b></button></form>` +
            //   `<form action="https://mail.google.com"><button style="background: #5c1c4c;color:#e3c904;margin-left:8px;height:30px;width:90px;border-radius: 10px;"><b>Reject</b></button></form>`;
            // +`</div>` + `</center>` + `</center>`;
            // const mailOptions = {
            //   from: `${users.email}:`,
            //   to: touser.email,
            //   subject: "You Are Invited For Icollekt Group",
            //   text: "Welcome to Our Group",
            //   html: content,
            // };
            // transporter.sendMail(mailOptions, (err, info) => {
            User.findOne({
              attributes: ["id", "device_token"],
              where: { id: req.body.toUser_id },
            }).then((datass) => {
              const registrationToken = datass.device_token;
              const options = notification_options;
              const message = {
                'notification': {
                  'title': `${users.name} Give a Invite for ${group_data.subject} Group`,
                  'image': `${group_data.group_image}`
                  // 'body': req.body.chat,
                },
                'data': {
                  'value': `${req.body.group_id}`,
                  'key_value': 'Invite',
                  'status': '1'
                }
              };
              console.log(message, "message");
              admin.messaging().sendToDevice(registrationToken, message, options)
                .then(function (response) {
                  console.log("Successfully sent message:", response);
                })
                .catch(function (error) {
                  console.log("Error sending message:", error);
                });
            });
              return res.send({
                result: false,
                message: "Invite has Been Sent",
              });
            // });
          });
        });
      });
    });
  });
};


//for invite request  api USER  (Accept)
exports.group_link = (req, res) => {
  const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };
  const url = req.params.gId;
  const user_id = req.params.id;

  Group_link.findOne({
    attributes: ["group_id"],
    where: { group_id: url },
  }).then((datas) => {
    var datass = datas.group_id;

    Group_image.findOne({
      where: { id: datass },
    }).then((data) => {
      var E = data.user_list.split(",");
      var S = E.includes(user_id);
      console.log(S, 'koooo');
      datass = data.user_list;
      var data1 = datass + "," + user_id;
      if (S == false) {
        Group_users.create({
          group_id: req.params.gId,
          subject: data.subject,
          group_image: data.group_image,
          group_banner: data.group_banner,
          message: data.message,
          status: 1,
          creater_id: data.user_id,
          user_id: user_id,
        });
        Group_image.update(
          {
            user_list: data1,
          },
          { where: { id: req.params.gId } }
        ).then((output) => {
          User.findOne({
            attributes: ["id", "name"],
            where: { id: req.params.id },
          }).then((datass) => {
            User.findOne({
              attributes: ["id", "device_token"],
              where: { id: data.user_id },
            }).then((token) => {

              const registrationToken = token.device_token;
              const options = notification_options;
              const message = {
                'notification': {
                  'title': `${datass.name} accepted your invite request for the group "${data.subject}"`,
                  // 'body': req.body.chat,
                },
                'data': {
                  'value': `${datas}`,
                  'key_value': 'invite request accepted',
                  'status': '1'
                }
              };

              admin.messaging().sendToDevice(registrationToken, message, options)
                .then(function (response) {
                  console.log("Successfully sent message:", response);
                })
                .catch(function (error) {
                  console.log("Error sending message:", error);
                });
              res.status(200).send(`<html><head><link rel = "icon" type = "image/png" href = "http://i-collekt.jksoftec.com:3001/profile/profile_1646031469804.png"></head> <center> <img src="http://i-collekt.jksoftec.com:3001/profile/profile_1646031469804.png" alt="" width="250" height="200"> <p style="color:#5c1c4c;"><b>You are joined to this "${data.subject}" Group <b></p>  
        <form action="https://mail.google.com"><button style="background:#5c1c4c;color:#e3c904;margin-left:8px;height:30px;width:90px; border-radius: 8px;">Exit</button></form></center></html>`);
            });
          });
        });
      } else {
        res.status(200).send(`<html><head><link rel = "icon" type = "image/png" href = "http://i-collekt.jksoftec.com:3001/profile/profile_1646031469804.png"></head> <center> <img src="http://i-collekt.jksoftec.com:3001/profile/profile_1646031469804.png" alt="" width="250" height="200"> <p style="color:#5c1c4c;"><b>This User is Alredy Exist In This "${data.subject}" Group <b></p>  
        <form action="https://mail.google.com"><button style="background:#5c1c4c;color:#e3c904;margin-left:8px;height:30px;width:90px; border-radius: 8px;">Exit</button></form></center></html>`);
      }
    });
  });
};


// Group_Request_For_Mobile- Admin Accept request

exports.Group_Request_For_Mobile = (req, res) => {
  const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };
  const group_id = req.params.group_id;
  const user_id = req.params.id;

  Group_link.findOne({
    attributes: ["group_id"],
    where: { group_id: group_id },
  }).then((datas) => {
    datas = datas.group_id;
    const id = datas;

    Group_image.findOne({
      where: { id: id },
    }).then((data) => {
      var E = data.user_list.split(",");
      var S = E.includes(user_id);
      data1 = data.user_list;
      data2 = data1 + "," + user_id;
      if (S == false) {
        Group_users.create({
          group_id: datas,
          subject: data.subject,
          group_image: data.group_image,
          group_banner: data.group_banner,
          message: data.message,
          status: 1,
          creater_id: data.user_id,
          user_id: user_id,
        });
        Group_request.update(
          {
            status: 0,
          },
          { where: { group_id: req.params.group_id, user_id: req.params.id } }
        );
        Group_image.update(
          {
            user_list: data2,
          },
          { where: { id: datas } }
        ).then((output) => {

          User.findOne({
            attributes: ["id", "device_token"],
            where: { id: user_id },
          }).then((datass) => {

            const registrationToken = datass.device_token;
            const options = notification_options;
            const message = {
              'notification': {
                'title': `Admin accepted your join request for ${data.subject} group`,
                // 'body': req.body.chat,
              },
              'data': {
                'value': `${group_id}`,
                'key_value': 'join request accepted',
                'status': '1'
              }
            };
            console.log(message, "message");
            admin.messaging().sendToDevice(registrationToken, message, options)
              .then(function (response) {
                console.log("Successfully sent message:", response);
              })
              .catch(function (error) {
                console.log("Error sending message:", error);
              });
            res.send(
              {
                Message: `You are successfully added to ${data.subject} Group`,
                Status: true
              }
            );
          });
        });
      } else {
        res.send(
          {
            Message: `This User is Already Added To This ${data.subject} Group`,
            Status: false
          }
        )
      }
    });
  });
};


// Invite_Request_Accept_By_User (Mobile)

exports.Invite_Request_Accept_By_User = (req, res) => {
  const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };
  const url = req.params.gId;
  const user_id = req.params.id;

  Group_link.findOne({
    attributes: ["group_id"],
    where: { group_id: url },
  }).then((datas) => {
    var datass = datas.group_id;
    Group_image.findOne({
      where: { id: datass },
    }).then((data) => {
      var E = data.user_list.split(",");
      var S = E.includes(user_id);
      console.log(S, 'koooo');
      datass = data.user_list;
      var data1 = datass + "," + user_id;
      if (S == false) {
        Group_users.create({
          group_id: req.params.gId,
          subject: data.subject,
          group_image: data.group_image,
          group_banner: data.group_banner,
          message: data.message,
          status: 1,
          creater_id: data.user_id,
          user_id: user_id,
        });
        Group_invite.update(
          {
            status: 0,
          },
          { where: { group_id: req.params.gId, user_id: req.params.id } }
        );
        Group_image.update(
          {
            user_list: data1,
          },
          { where: { id: req.params.gId } }
        ).then((output) => {
          User.findOne({
            attributes: ["id", "name"],
            where: { id: req.params.id },
          }).then((datass) => {
            User.findOne({
              attributes: ["id", "device_token"],
              where: { id: data.user_id },
            }).then((token) => {

              const registrationToken = token.device_token;
              const options = notification_options;
              const message = {
                'notification': {
                  'title': `${datass.name} accepted your invite request for the group "${data.subject}"`,
                  // 'body': req.body.chat,
                },
                'data': {
                  'value': `${datas}`,
                  'key_value': 'invite request accepted',
                  'status': '1'
                }
              };

              admin.messaging().sendToDevice(registrationToken, message, options)
                .then(function (response) {
                  console.log("Successfully sent message:", response);
                })
                .catch(function (error) {
                  console.log("Error sending message:", error);
                });
              res.status(200).send(
                {
                  Message: `You Are Successfully Joined To This ${data.subject} Group`,
                  Status: true
                }
              );
            });
          });
        });
      } else {
        res.status(200).send(
          {
            Message: `This User is Alredy Exist In This ${data.subject} Group`,
            Status: false
          }
        );
      }
    });
  });
};




// Add_ADDmin.....................

exports.Add_Admin = (req, res) => {
  const id = req.body.id
  const admin_list = req.body.admin_id
  Group_image.findOne({
    attributes: ["user_list"],
    where: { id: id },
  }).then((data) => {
    data = data.user_list;
    data = data.split(",");
    var data = data.filter((value) => value !== admin_list);
    data = data.toString();
    Group_image.update(
      {
        user_list: data,
      },
      { where: { id: id } }
    ).then((output) => { })
  })
  Group_image.findOne({
    where: { id: id },
  }).then((data) => {
    if (data.admin_list != null) {
      var E = data.admin_list.split(",");
      var S = E.includes(admin_list);
    }
    if (S == false || S == undefined) {
      if (data.admin_list == null || data.admin_list == "") {
        Group_image.update({
          admin_list: req.body.admin_id,
        }, {
          where: { id: id },
        }).then(datas => { })
      } else {
        var datass = data.admin_list
        var data1 = datass + "," + req.body.admin_id;
        Group_image.update({
          admin_list: data1,
        }, {
          where: { id: id },
        }).then(data => { })
      }
      res.json({
        Status: true,
        Message: "Admin Added Sucessfully"
      });
    } else {
      res.json({
        Status: false,
        Message: "Somthing Went Wrong"
      });

    }
  }).catch(err => {
    res.json({
      Status: false,
      Message: "Somthing Went Wrongs"
    });
  })
}

// findall
exports.findAlllllll = async (req, res) => {
  Group_image.findAll().then(Address_List => {
    res.send({ Address_List });
  })
}



// Remove Admin

exports.Remove_Admin = (req, res) => {
  const id = req.params.id;
  const value1 = req.body.admin_id;
  Group_image.findOne({
    attributes: ["admin_list"],
    where: { id: id },
  }).then((data) => {
    data = data.admin_list;
    data = data.split(",");
    var data = data.filter((value) => value !== value1);
    data = data.toString();
    Group_image.update(
      {
        admin_list: data,
      },
      { where: { id: id } }
    ).then((output) => {
      Group_image.findOne({
        where: { id: id },
      }).then((data) => {
        if (data.user_list != null) {
          var E = data.user_list.split(",");
          var S = E.includes(value1);
        }
        if (S == false || S == undefined) {
          if (data.user_list == null || data.user_list == "") {
            Group_image.update({
              user_list: req.body.admin_id,
            }, {
              where: { id: id },
            }).then(datas => { })
          } else {
            var datass = data.user_list
            var data1 = datass + "," + req.body.admin_id;
            Group_image.update({
              user_list: data1,
            }, {
              where: { id: id },
            }).then(data => { })
          }
        }
      })
      res.status(200).json({
        Status: "Admin Removed",
      });
    });
  });
};


// Group Exit

exports.group_exit = (req, res) => {
  const id = req.params.id;
  const value1 = req.body.value1;
  Group_image.findOne({
    attributes: ["user_list"],
    where: { id: id },
  }).then((data) => {
    data = data.user_list;
    console.log(data, "dataaa");
    data = data.split(",");
    console.log(data, "datattsss");
    var data = data.filter((value) => value !== value1);
    console.log(data, "datatt");
    data = data.toString();
    console.log(data, "datasss");
    Group_image.update(
      {
        user_list: data,
      },
      { where: { id: id } }
    ).then((output) => {
      Group_users.destroy({
        where: {
          group_id: req.params.id,
          user_id: req.body.value1
        }
      }).then(() => { })

      Group_image.findOne({
        attributes: ["admin_list"],
        where: { id: id },
      }).then((data) => {
        data = data.admin_list;
        data = data.split(",");
        var data = data.filter((value) => value !== value1);
        data = data.toString();
        Group_image.update(
          {
            admin_list: data,
          },
          { where: { id: id } }
        ).then((output) => { })
      })
      res.status(200).json({
        Status: "You are exit the Group",
      });
    });
  });
};




// Admin Request List  (BY ADMIN Get The List) 

exports.Admin_Request_List = async (req, res) => {
  const admin_id = req.params.admin_id;
  Group_request.findAll(
    {
      order: [["id", "DESC"]],
      attributes: ["id", "user_id", "admin_id", "group_id", "name", "user_profile", "group_names", "group_image", "status", "created_at", "updated_at"],
      where: { admin_id: admin_id }
    }).then(Admin_Request_List => {
      res.send({ Admin_Request_List });
    })
}



// User_request_List (BY USER GET THE LIST)

exports.User_request_List = async (req, res) => {
  const user_id = req.params.user_id;
  Group_invite.findAll(
    {
      order: [["id", "DESC"]],
      attributes: ["id", "invited_by", "user_id", "group_id", "name", "admin_profile", "group_names", "group_image", "status", "created_at", "updated_at"],
      where: { user_id: user_id }
    }).then(Group_Request_List => {
      res.send({ Group_Request_List });
    })
}

// Cancel in Request List (By ADMIN)

exports.Cancel_In_Request_List = (req, res) => {
  Group_request.destroy({
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

// Cancel In Invite List (BY USERS)

exports.Cancel_In_Invite_List = (req, res) => {
  Group_invite.destroy({
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