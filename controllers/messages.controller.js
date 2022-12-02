const database = require("../config/db.sequalize");
const Message = database.messages;
const Connection = database.connections;
const User = database.user;
const Messages_inbox = database.messages_inbox
const { admin } = require('../config/firebase.config')
var Sequelize = require('sequelize');
const { Op, where } = require('sequelize');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('ReallySecretKey');

// exports.Chat = (req, res) => {
//   if (req.body.chat != "") {
//     Message.create({
//       chat: req.body.chat,
//       fromUserId: req.body.fromUserId,
//       toUserId: req.body.toUserId,
//       connectionId: req.body.connectionId,
//       user1: 1,
//       user2: 1
//     })
//       .then((data) => {
//         res.json({ Status: "Success" });
//       })
//       .catch((err) => {
//         res.status(200).json(err);
//       });
//   } else {
//     res.status(200).json({ Note: "Please Type Your Message" });
//   }
// };


// User Connection

exports.connection = (req, res) => {
  let connectionData = {
    user_one: req.body.user_one,
    user_two: req.body.user_two,
    status: 1,
  };

  Connection.findOne({
    attributes: ["id", "user_one", "user_two"],
    where: {
      user_one: connectionData.user_one,
      user_two: connectionData.user_two,
    },
  }).then((data) => {
    console.log(data, "data");
    if (!data) {
      Connection.findOne({
        attributes: ["id", "user_one", "user_two"],
        where: {
          user_one: connectionData.user_two,
          user_two: connectionData.user_one,
        },
      }).then((data) => {
        if (!data) {
          Connection.create(connectionData).then((datas) => {
            res.status(200).send({
              result: false,
              id: datas.id,
              status: "You Are Connected",
            });
          });
        } else {
          return res.status(200).send({
            result: true,
            id: data.id,
            status: "Already Exist",
          });
        }
      });
    } else {
      return res.status(200).send({
        result: true,
        id: data.id,
        status: "Already Exist",
      });
    }
  });
};

// Chat

// exports.Chat = (req, res) => {
//   const notification_options = {
//     priority: "high",
//     timeToLive: 60 * 60 * 24
//   };
//   if (req.body.chat != "") {
//     Message.create({
//       chat: req.body.chat,
//       fromUserId: req.body.fromUserId,
//       toUserId: req.body.toUserId,
//       connectionId: req.body.connectionId,
//     })
//       .then((data) => {
//         User.findOne({
//           attributes: ["id", "name"],
//           where: {
//             id: req.body.fromUserId
//           }
//         }).then((fromuser) => {
//           User.findOne({
//             attributes: ["id", "device_token"],
//             where: {
//               id: req.body.toUserId
//             }
//           }).then((touser) => {

//             const registrationToken = touser.device_token;
//             const options = notification_options;
//             const message = {
//               'notification': {
//                 'title': `${fromuser.name} sent a new message`,
//                 'body': req.body.chat,
//               // tockens : 'gunaaaaa',


//             //   data : {
//             //     my_key: "value",
//             //     my_another_key :'jvckhvsd' 
//             // }
//               }
//             };

//             admin.messaging().sendToDevice(registrationToken, message, options)
//               .then(function (response) {
//                 console.log("Successfully sent message:", response);
//               })
//               .catch(function (error) {
//                 console.log("Error sending message:", error);
//               });
//             res.json({ Status: "Success" });
//           })
//             .catch((err) => {
//               res.status(200).json(err);
//             })
//         })
//       });
//   } else {
//     res.status(200).json({ Note: "Please Type Your Message" });
//   }
// };


// exports.Chat = (req, res) => {
//   if (req.body.chat != "") {
//     Message.create({
//       chat: req.body.chat,
//       fromUserId: req.body.fromUserId,
//       toUserId: req.body.toUserId,
//       connectionId: req.body.connectionId,
//     })
//       .then((data) => {
//         User.findOne({
//           attributes: ["id", "name"],
//           where: {
//             id: req.body.fromUserId
//           }
//         }).then((user) => {
//           res.json({ Status: "Success" });
//           notifier.notify(
//             {
//               title: user.name,
//               to: req.body.toUserId,
//               message: req.body.chat,
//               icon: "",
//               sound: true,
//               wait: true
//             },
//             function (err, response, metadata) {
//               console.log(response, metadata, "response");
//             }

//           );
//         })
//           .catch((err) => {
//             res.status(200).json(err);
//           })
//       });
//   } else {
//     res.status(200).json({ Note: "Please Type Your Message" });
//   }
// };
//Chat_View

exports.Chat_view = (req, res) => {
  const connectionId = req.params.connectionId;
  const clearid = req.params.clearid;
  Message.findAll({
    order: [
      ["id", "DESC"]
    ],
    attributes: ["id", "chat", "fromUserId", "toUserId", "created_at"],
    where: {
      connectionId: connectionId,
      clearid: clearid,
    },
  })
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};

//View_Profile

exports.view_toprofile = (req, res) => {
  const id = req.params.id;
  User.findOne({
    attributes: ["id", "profile_pic", "name"],
    where: {
      id: id,
    },
  })
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};



//Message Inbox

// exports.message_view = (req, res) => {
//   const fromUserId = req.params.fromUserId;
//   var userData = [];
//   Message.findAll({
//     attributes: ["toUserId"],
//     where: {
//       fromUserId: fromUserId,
//     },
//   }).then((data) => {

//     var arrayId = [];
//     data.map((data) => {
//       arrayId.push(data.toUserId);
//     });

//     uniqueArray = arrayId.filter(function (elem, pos) {
//       return arrayId.indexOf(elem) == pos;
//     });
//     console.log(uniqueArray, " arrayId");
//     Connection.findOne(
//       {
//         attributes: ["id", "user_one", "user_two"],
//         where: { id: req.body.connectionId }
//       }).then(data => {
//         console.log(data, "data");
//         User.findOne({
//           attributes: ["id", "name"],
//           where: {
//             id: req.body.id,
//           },
//         })
//           .then(datas => {
//             console.log(data.user_one, data.id, "user");

//             if (data.user_one === data.id) {
//               for (var i = 0; i < uniqueArray.length; i++) {
//                 User.hasMany(Message, {
//                   foreignKey: "toUserId",
//                 });

//                 Message.belongsTo(User, {
//                   foreignKey: "toUserId",
//                 });
//                 Message.findOne({
//                   include: {
//                     model: User,
//                     attributes: ["id", "name", "profile_pic"],
//                     required: true,
//                   },
//                   order: [
//                     ["created_at", "DESC"]
//                   ],
//                   attributes: ["chat", "toUserId", "created_at"],
//                   where: {
//                     toUserId: [uniqueArray[i]],
//                     fromUserId: fromUserId,
//                     user1: 1
//                   },
//                 }).then((data) => {

//                   userData.push(data);
//                 });
//               }

//               // const datas = userData.sort(function (x, y) {
//               //   return x.created_at - y.created_at;
//               // })
//               //console.log(userData, "datasdatas")

//               setTimeout(() => {
//                 res.status(200).json({ userData: userData });
//               }, 100 * uniqueArray.length);

//             } else {
//               for (var i = 0; i < uniqueArray.length; i++) {
//                 User.hasMany(Message, {
//                   foreignKey: "toUserId",
//                 });

//                 Message.belongsTo(User, {
//                   foreignKey: "toUserId",
//                 });
//                 Message.findOne({
//                   include: {
//                     model: User,
//                     attributes: ["id", "name", "profile_pic"],
//                     required: true,
//                   },
//                   order: [
//                     ["created_at", "DESC"]
//                   ],
//                   attributes: ["chat", "toUserId", "created_at"],
//                   where: {
//                     toUserId: [uniqueArray[i]],
//                     fromUserId: fromUserId,
//                     user2: 1

//                   },
//                 }).then((data) => {

//                   userData.push(data);
//                 });
//               }

//               // const datas = userData.sort(function (x, y) {
//               //   return x.created_at - y.created_at;
//               // })


//               setTimeout(() => {
//                 res.status(200).json({ userData: userData });
//               }, 100 * uniqueArray.length);
//             }
//           });
//       })
//   })
// };


//delete
exports.delete = (req, res) => {
  const connectionId = req.params.connectionId;
  User.findOne({
    attributes: ["id", "name"],
    where: {
      id: req.body.id,
    },
  })
    .then(data => {
      Connection.findOne({
        attributes: ["id", "user_one", "user_two"],
        where: {
          id: connectionId,
        }
      }).then(datas => {

        if (data.id === datas.user_one) {
          Message.update(
            {
              user1: 0,
              clearid: data.id
            },
            {
              where: {
                connectionId: connectionId,
              }
            })
            .then(data => {
              Messages_inbox.update(
                {
                  status2: 0,
                },
                {
                  where: {
                    connectionId: connectionId,
                  }
                })
                .then(data => { })
              Message.findAll({
                attributes: ["id", "clearid"],
                where: {
                  connectionId: connectionId,
                  user1: 1
                },
              }).then(datass => {
                res.send(datass)
              })
            })
        } else {
          Message.update(
            {
              user2: 0,
              clearid: data.id
            },
            {
              where: {
                connectionId: connectionId,
              }
            })
            .then(data => {
              Messages_inbox.update(
                {
                  status1: 0,
                },
                {
                  where: {
                    connectionId: connectionId,
                  }
                })
                .then(data => { })
              Message.findAll({
                attributes: ["id", "clearid"],
                where: {
                  connectionId: connectionId,
                  user2: 1
                },
              }).then(datass => {
                res.send(datass)
              })
            })
        }
      })
    })
}


// exports.View = (req, res) => {
//   Connection.findOne(
//     {
//       attributes: ["id", "user_one", "user_two"],
//       where: { id: req.params.connectionId }
//     }).then(data => {

//       User.findOne({
//         attributes: ["id", "name"],
//         where: {
//           id: req.body.id,
//         },
//       })
//         .then(datas => {

//           if (data.user_one === datas.id) {
//             Message.findAll({
//               order: [
//                 ["id", "DESC"]
//               ],
//               attributes: ["id", "chat", "fromUserId", "toUserId", "created_at"],
//               where: {
//                 user1: 1,
//                 connectionId: req.params.connectionId
//               },
//             })
//               .then((data) => {
//                 res.json({ data });
//               })

//           } else {
//             Message.findAll({
//               order: [
//                 ["id", "DESC"]
//               ],
//               attributes: ["id", "chat", "fromUserId", "toUserId", "created_at"],
//               where: {
//                 user2: 1,
//                 connectionId: req.params.connectionId
//               },
//             })
//               .then((data) => {
//                 res.json({ data });
//               })

//           }

//         })
//     })
// };


//view
exports.View = (req, res) => {
  const connectionId = req.params.connectionId
  Connection.findOne(
    {
      attributes: ["id", "user_one", "user_two"],
      where: { id: connectionId }
    }).then(data => {
      User.findOne({
        attributes: ["id", "name"],
        where: {
          id: req.body.id,
        },
      })
        .then(datas => {

          if (data.user_one === datas.id) {
            Message.findAll({
              order: [
                ["id", "DESC"]
              ],
              attributes: ["id", "chat", "fromUserId", "toUserId", "created_at"],
              where: {
                user1: 1,
                connectionId: req.params.connectionId
              },
            })
              .then((data) => {
                data.map((datas) => {
                  const chats = datas.chat
                  datas.chat = cryptr.decrypt(chats);
                })
                res.json({ data });
              })

          } else {
            Message.findAll({
              order: [
                ["id", "DESC"]
              ],
              attributes: ["id", "chat", "fromUserId", "toUserId", "created_at"],
              where: {
                user2: 1,
                connectionId: req.params.connectionId
              },
            })
              .then((data) => {
                data.map((datas) => {
                  const chats = datas.chat
                  datas.chat = cryptr.decrypt(chats);
                })
                res.json({ data });
              })
          }
        })
    })
};



// ---------------------------------------------------------------


exports.Chat = (req, res) => {
  const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };
  const encryptedString = cryptr.encrypt(req.body.chat);
  if (req.body.chat != "") {
    Message.create({
      chat: encryptedString,
      fromUserId: req.body.fromUserId,
      toUserId: req.body.toUserId,
      connectionId: req.body.connectionId,
      user1: 1,
      user2: 1
    }).then((data) => {
      User.findOne({
        attributes: ["id", "name", "profile_pic"],
        where: {
          id: req.body.fromUserId
        }
      }).then((fromuser) => {
        User.findOne({
          attributes: ["id", "device_token", "name", "profile_pic"],
          where: {
            id: req.body.toUserId
          }
        }).then((touser) => {
          Messages_inbox.create({
            chat: req.body.chat,
            from_id: req.body.fromUserId,
            to_id: req.body.toUserId,
            connectionId: req.body.connectionId,
            from_profile: fromuser.profile_pic,
            to_profile: touser.profile_pic,
            from_name: fromuser.name,
            to_name: touser.name
          }).then((data111) => {
            if (touser.device_token != "") {
              const registrationToken = touser.device_token;
              console.log(registrationToken, "registrationToken");
              const options = notification_options;
              const message = {
                'notification': {
                  'title': `${fromuser.name} sent a new message`,
                  'image': `${fromuser.profile_pic}`,
                  'body': req.body.chat,
                },
                'data': {
                  'value': `${req.body.connectionId}`,
                  'key_value': 'Personal chat',
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
              res.json({ Status: "Success" });
            }
            else {
              res.json({ Status: "Success" });
            }
          }).catch((err) => {
            res.status(200).json(err);
          })
        })
      })
    });
  } else {
    res.status(200).json({ Note: "Please Type Your Message" });
  }
};


// exports.message_view = (req, res) => {
//     const fromUserId = req.params.fromUserId;
//     var userData = [];
//     var ConnId = [];
//     var toUsersId = [];
//     var fromUsersId = [];
//     Message.findAll().then((da)=>{
//       da.map((dat)=>{
//         toUsersId.push(dat.toUserId);
//         fromUsersId.push(dat.fromUserId)
//       })
//     })

//     Message.findAll({
//       attributes: ["toUserId","connectionId"],
//       where: {
//         fromUserId: fromUserId,
//       },
//     }).then((data) => {
//       var arrayId = [];
//       data.map((data) => {
//         arrayId.push(data.toUserId);
//         ConnId.push(data.connectionId);
//       });
//       uniqueArray = arrayId.filter(function (elem, pos) {
//         return arrayId.indexOf(elem) == pos;
//       });
//       const userUnique = Array.from(new Set(arrayId));
//       const toUserUnique = Array.from(new Set(toUsersId));
//       const fromUserUnique = Array.from(new Set(fromUsersId));
//       const ConnUnique = Array.from(new Set(ConnId)); 
//       //console.log(ConnUnique,'dffdsfdsfdsfdsf');
//       for (var i = 0; i < ConnUnique.length; i++) {
//         console.log(uniqueArray.length,'fsdafsf',userUnique,'dfsdfsfsd',ConnUnique[i],'sfsdfsfsfg',toUserUnique,'ghfghfhfhfg',fromUserUnique);
//         User.hasMany(Message, {
//           foreignKey: "toUserId",
//         });
//         Message.belongsTo(User, {
//           foreignKey: "toUserId",
//         });
//         Message.findOne({
//           include: {
//             model: User,
//             attributes: ["id", "name", "profile_pic"],
//             required: true,
//           },
//           order: [
//             ["id", "DESC"]
//           ],
//           attributes: ["chat","toUserId","created_at"],
//           where: {
//             connectionId:ConnUnique[i],
//             user1:1
//           },
//         }).then((data) => {
//           if(data !== null){
//           userData.push(data);
//           }
//         });
//       }
//     })
//       const datas= userData.sort(function(x, y){
//       return x.created_at - y.created_at;
//   })
//       setTimeout(() => {
//         res.status(200).json({ userData: userData });
//       }, 1000);
//   };

// exports.message_view = (req, res) => {
//   const fromUserId = req.params.fromUserId;
//   var userData = [];
//   var ConnId = [];
//   var toUsersId = [];
//   var fromUsersId = [];
//   Message.findAll().then((da)=>{
//     da.map((dat)=>{
//       for(var i = 0 ; dat.fromUserId > i ; i++){
//       if(fromUserId == dat.toUserId){
//       toUsersId.push(dat.toUserId);
//       }
//       if(fromUserId == dat.fromUserId){
//       fromUsersId.push(dat.fromUserId)
//       }
//       }
//     })
//   })

//   Message.findAll({where:{toUserId:fromUserId}}).then((data)=>{
//     data.map((da)=>{
//       ConnId.push(da.connectionId);
//     })
//   })
//   Message.findAll({where:{fromUserId:fromUserId}}).then((data)=>{
//     data.map((da)=>{
//       ConnId.push(da.connectionId);
//     })
//   })

//   Message.findAll({
//     attributes: ["toUserId","connectionId"],
//     where: {
//       fromUserId: fromUserId,
//     },
//   }).then((data) => {
//     var arrayId = [];
//     data.map((data) => {
//       arrayId.push(data.toUserId);
//     });
//     uniqueArray = arrayId.filter(function (elem, pos) {
//       return arrayId.indexOf(elem) == pos;
//     });
//     const ConnUnique = Array.from(new Set(ConnId)); 
//     const ToUserId = Array.from(new Set(toUsersId))
//  console.log(ToUserId,'dffdsfdsfdsfdsf');
//     for (var i = 0; i < ConnUnique.length; i++) {
//       Message.findOne({
//         attributes: ["chat","toUserId","fromUserId","created_at"],
//         order: [
//           ["created_at", "DESC"]
//         ],
//         where: {
//           connectionId:[ConnUnique[i]],
//           //toid_status:1
//         },
//       }).then((data) => {
//         if(data !== null){
//           User.findOne({
//             attributes: ["id","profile_pic","name"],
//             order: [
//             ["created_at", "DESC"]
//           ],
//           where:{id:data.toUserId}}).then((da)=>{
//             if(fromUserId == da.id){
//               const profile = da.profile_pic !== null ? da.profile_pic : ""
//               data.id = { id: data.fromUserId,name:da.name,profile_pic: profile}
//               userData.push(data);
//               console.log(userData,"kkk");
//             }else{
//             const profile = da.profile_pic !== null ? da.profile_pic : ""
//             data.id = { id: da.id,name:da.name,profile_pic: profile}
//             userData.push(data);
//             }
//           })
//         }
//       });
//     }
//   })
//     const datas= userData.sort(function(x, y){
//     return x.created_at - y.created_at;
// })
// setTimeout(() => {
//   const data = { userData: userData };
//   const sortArray = data["userData"];
//   sortArray.sort((a, b) => {
//     if (a.created_at < b.created_at) return 1;
//     if (a.created_at > b.created_at) return -1;
//     return 0;
//   });
//   console.log(sortArray,"yyyyyyyyyyyyyy");
//   res.status(200).json({ userData: sortArray })

// }, 1000);
// };


// exports.message_view = (req, res) => {
//   const UserId = req.params.fromUserId;

//   var inbox = [];
//   Connection.findAll({
//     attributes: ["id", "user_one", "user_two"]
//   }).then((connect) => {
//     var newArr = connect.map(function (item) {
//       return item.id;
//     });
//     for (var i = 0; i < newArr.length; i++) {
//       Connection.findOne({
//         attributes: ["id", "user_one", "user_two"],
//         where: {
//           id: newArr[i]
//         }
//       }).then((data) => {
//         Message.update({ user_one: data.user_one, user_two: data.user_two },
//           { where: { connectionId: data.id } })

//         if (data.user_one == UserId) {
//           User.hasMany(Message, {
//             foreignKey: "user_two",
//           });
//           Message.belongsTo(User, {
//             foreignKey: "user_two",
//           });

//           Message.findAll({
//             include: {
//               model: User,
//               attributes: ["id", "name", "profile_pic"],
//               required: true,
//             },
//             attributes: ["id", "chat", "toUserId", "fromUserId", "connectionId", "created_at"],
//             order: [
//               ['created_at', 'DESC'],
//             ],
//             limit: 1,
//             where: {
//               user1: 1,
//               connectionId: data.id
//             }
//           }).then((data1) => {
//             if (data1 != "") {
//               inbox.push(data1[0])
//             }
//           })
//         } else if (data.user_two == UserId) {
//           User.hasMany(Message, {
//             foreignKey: "user_one",
//           });
//           Message.belongsTo(User, {
//             foreignKey: "user_one",
//           });
//           Message.findAll({
//             include: {
//               model: User,
//               attributes: ["id", "name", "profile_pic"],
//               required: true,
//             },
//             attributes: ["id", "chat", "toUserId", "fromUserId", "connectionId", "created_at"],
//             order: [
//               ['created_at', 'DESC'],
//             ],
//             limit: 1,
//             where: {
//               user2: 1,
//               connectionId: data.id
//             }
//           }).then((inbox1) => {
//             if (inbox1 != "") {

//               inbox.push(inbox1[0])

//             }
//           })
//         }
//       })
//     }
//   })
//   setTimeout(() => {
//     const data = { inbox: inbox };
//     const sortArray11 = data["inbox"];

//     sortArray11.sort((a, b) => {
//       if (a.created_at < b.created_at) return 1;
//       if (a.created_at > b.created_at) return -1;
//       return 0;
//     });
//     res.status(200).json({ userData: sortArray11 })

//   }, 1000);
// };


//Message Inbox

// exports.message_view = (req, res) => {
//   const fromUserId = req.params.fromUserId;
//   var userData = [];
//   var ConnId = [];
//   var toUsersId = [];
//   var fromUsersId = [];
//   Message.findAll().then((da) => {
//     da.map((dat) => {
//       toUsersId.push(dat.toUserId);
//       fromUsersId.push(dat.fromUserId)
//     })

//   })

//   Message.findAll({
//     attributes: ["toUserId", "connectionId"],
//     where: {
//       fromUserId: fromUserId,
//     },
//   }).then((data) => {
//     var arrayId = [];
//     data.map((data) => {
//       arrayId.push(data.toUserId);
//       ConnId.push(data.connectionId);
//     });
//     uniqueArray = arrayId.filter(function (elem, pos) {
//       return arrayId.indexOf(elem) == pos;
//     });
//     // const userUnique = Array.from(new Set(arrayId));
//     // const toUserUnique = Array.from(new Set(toUsersId));
//     // const fromUserUnique = Array.from(new Set(fromUsersId));
//     const ConnUnique = Array.from(new Set(ConnId));

//     for (var i = 0; i < ConnUnique.length; i++) {

//       User.hasMany(Message, {
//         foreignKey: "toUserId",
//       });
//       Message.belongsTo(User, {
//         foreignKey: "toUserId",
//       });
//       Message.findOne({
//         include: {
//           model: User,
//           attributes: ["id", "name", "profile_pic"],
//           required: true,
//         },
//         order: [
//           ["id", "DESC"]
//         ],
//         attributes: ["chat", "toUserId", "created_at"],
//         where: {
//           connectionId: ConnUnique[i],
//           user1: 1
//         },
//       }).then((data) => {
//         if (data !== null) {
//           userData.push(data);
//         }
//       });
//     }
//   })
//   const datas = userData.sort(function (x, y) {
//     return x.created_at - y.created_at;
//   })
//   setTimeout(() => {
//     res.status(200).json({ userData: userData });
//   }, 1000);
// };


//Message Inbox

// exports.message_view = (req, res) => {
//   const fromUserId = req.params.fromUserId;
//   var userData = [];
//   Message.findAll({
//     attributes: ["toUserId"],
//     where: {
//       fromUserId: fromUserId,
//     },
//   }).then((data) => {

//     var arrayId = [];
//     data.map((data) => {
//       arrayId.push(data.toUserId);
//     });

//     uniqueArray = arrayId.filter(function (elem, pos) {
//       return arrayId.indexOf(elem) == pos;
//     });
//     console.log(uniqueArray, " arrayId");
//     Connection.findOne(
//       {
//         attributes: ["id", "user_one", "user_two"],
//         where: { id: req.body.connectionId }
//       }).then(data => {
//         console.log(data, "data");
//         User.findOne({
//           attributes: ["id", "name"],
//           where: {
//             id: req.body.id,
//           },
//         })
//           .then(datas => {
//             console.log(data.user_one, data.id, "user");

//             if (data.user_one === data.id) {
//               for (var i = 0; i < uniqueArray.length; i++) {
//                 User.hasMany(Message, {
//                   foreignKey: "toUserId",
//                 });

//                 Message.belongsTo(User, {
//                   foreignKey: "toUserId",
//                 });
//                 Message.findOne({
//                   include: {
//                     model: User,
//                     attributes: ["id", "name", "profile_pic"],
//                     required: true,
//                   },
//                   order: [
//                     ["created_at", "DESC"]
//                   ],
//                   attributes: ["chat", "toUserId", "created_at"],
//                   where: {
//                     toUserId: [uniqueArray[i]],
//                     fromUserId: fromUserId,
//                     user1: 1
//                   },
//                 }).then((data) => {

//                   userData.push(data);
//                 });
//               }

//               // const datas = userData.sort(function (x, y) {
//               //   return x.created_at - y.created_at;
//               // })
//               //console.log(userData, "datasdatas")

//               setTimeout(() => {
//                 res.status(200).json({ userData: userData });
//               }, 100 * uniqueArray.length);

//             } else {
//               for (var i = 0; i < uniqueArray.length; i++) {
//                 User.hasMany(Message, {
//                   foreignKey: "toUserId",
//                 });

//                 Message.belongsTo(User, {
//                   foreignKey: "toUserId",
//                 });
//                 Message.findOne({
//                   include: {
//                     model: User,
//                     attributes: ["id", "name", "profile_pic"],
//                     required: true,
//                   },
//                   order: [
//                     ["created_at", "DESC"]
//                   ],
//                   attributes: ["chat", "toUserId", "created_at"],
//                   where: {
//                     toUserId: [uniqueArray[i]],
//                     fromUserId: fromUserId,
//                     user2: 1

//                   },
//                 }).then((data) => {

//                   userData.push(data);
//                 });
//               }

//               // const datas = userData.sort(function (x, y) {
//               //   return x.created_at - y.created_at;
//               // })


//               setTimeout(() => {
//                 res.status(200).json({ userData: userData });
//               }, 100 * uniqueArray.length);
//             }
//           });
//       })
//   })
// };

// exports.message_view = (req, res) => {
//   const fromUserId = req.params.fromUserId;
//   var userData = [];
//   var ConnId = [];
//   var toUsersId = [];
//   var fromUsersId = [];
//   Message.findAll().then((da)=>{
//     da.map((dat)=>{
//       for(var i = 0 ; dat.fromUserId > i ; i++){
//       if(fromUserId == dat.toUserId){
//       toUsersId.push(dat.toUserId);
//       }
//       if(fromUserId == dat.fromUserId){
//       fromUsersId.push(dat.fromUserId)
//       }
//       }
//     })
//   })

//   Message.findAll({where:{toUserId:fromUserId}}).then((data)=>{
//     data.map((da)=>{
//       ConnId.push(da.connectionId);
//     })
//   })
//   Message.findAll({where:{fromUserId:fromUserId}}).then((data)=>{
//     data.map((da)=>{
//       ConnId.push(da.connectionId);
//     })
//   })

//   Message.findAll({
//     attributes: ["toUserId","connectionId"],
//     where: {
//       fromUserId: fromUserId,
//     },
//   }).then((data) => {
//     var arrayId = [];
//     data.map((data) => {
//       arrayId.push(data.toUserId);
//     });
//     uniqueArray = arrayId.filter(function (elem, pos) {
//       return arrayId.indexOf(elem) == pos;
//     });
//     const ConnUnique = Array.from(new Set(ConnId));
//     const ToUserId = Array.from(new Set(toUsersId))

//     for (var i = 0; i < ConnUnique.length; i++) {
//       Message.findOne({
//         attributes: ["chat","toUserId","fromUserId","created_at"],
//         order: [
//           ["created_at", "DESC"]
//         ],
//         where: {
//           connectionId:[ConnUnique[i]],
//           //toid_status:1
//         },
//       }).then((data) => {

//         if(data !== null){
//           User.findOne({order: [
//             ["created_at", "DESC"]
//           ],
//           where:{id:data.toUserId}}).then((da)=>{
//             console.log(da,"lll");
//             if(fromUserId == da.id){
//               const profile = da.profile_pic !== null ? da.profile_pic : ""
//               data.id = { id: data.fromUserId,name:da.name,profile_pic: profile}
//               userData.push(data);
//             }else{
//             const profile = da.profile_pic !== null ? da.profile_pic : ""
//             data.id = { id: da.id,name:da.name,profile_pic: profile}
//             userData.push(data);
//             }
//           })
//         }
//       });
//     }
//   })
//     const datas= userData.sort(function(x, y){
//     return x.created_at - y.created_at;
// })
// setTimeout(() => {
//   const data = { userData: userData };
//   const sortArray = data["userData"];
//   sortArray.sort((a, b) => {
//     if (a.created_at < b.created_at) return 1;
//     if (a.created_at > b.created_at) return -1;
//     return 0;
//   });
//   res.status(200).json({ userData: sortArray });
// }, 1000);
// };






// server ---------------------------------------------------------------------------backup

// exports.message_inbox = (req, res) => {
//   const fromUserId = req.params.fromUserId;
//   var arrayId = [];
//   var messages = [];
//   Connection.findAll({
//     attributes: ["user_one", "user_two", "id"],
//     where: {
//       user_one: fromUserId,
//     },
//   }).then((data) => {
//     arrayId.push(data)
//     Connection.findAll({
//       attributes: ["user_one", "user_two", "id"],
//       where: {
//         user_two: fromUserId,
//       },
//     }).then((data2) => {
//       let array = [...arrayId[0], ...data2]
//       array.map((value, index) => {
//         User.hasMany(Message, {
//           foreignKey: "fromUserId",
//         });
//         Message.belongsTo(User, {
//           foreignKey: "fromUserId",
//         });
//         Message.findAll({
//           include: {
//             model: User,
//             attributes: ["id", "name", "profile_pic"],
//             required: true,
//           },
//           attributes: ["fromUserId", "toUserId", "connectionId", "created_at", "chat"],
//           limit: 1,
//           where: {
//             connectionId: value.id,
//             toUserId: fromUserId,
//             user2: 1
//           },
//           order: [
//             ['id', 'DESC']
//           ],
//         }).then((data3) => {
//           if (data3.length) {
//             messages.push(data3)
//           }
//           User.hasMany(Message, {
//             foreignKey: "toUserId",
//           });
//           Message.belongsTo(User, {
//             foreignKey: "toUserId",
//           });
//           Message.findAll({
//             attributes: ["fromUserId", "toUserId", "connectionId", "created_at", "chat"],
//             include: {
//               model: User,
//               attributes: ["id", "name", "profile_pic"],
//               required: true,
//             },
//             limit: 1,
//             where: {
//               connectionId: value.id,
//               fromUserId: fromUserId,
//               user1: 1
//             },
//             order: [
//               ['id', 'DESC']
//             ],
//           }).then((data4) => {
//             if (data4.length) {
//               messages.push(data4);
//               var merged = [].concat.apply([], messages);
//               res.send({ userData: merged });

//             }
//           })
//         })
//       })

//     })

//   })
// }



// //Message Inbox

exports.message_view = (req, res) => {
  const fromUserId = req.params.fromUserId;
  var userData = [];
  var ConnId = [];
  var toUsersId = [];
  var fromUsersId = [];
  Message.findAll().then((da) => {
    da.map((dat) => {
      toUsersId.push(dat.toUserId);
      fromUsersId.push(dat.fromUserId)
    })
  })

  Message.findAll({
    attributes: ["toUserId", "connectionId"],
    where: {
      fromUserId: fromUserId,
    },
  }).then((data) => {
    var arrayId = [];
    data.map((data) => {
      arrayId.push(data.toUserId);
      ConnId.push(data.connectionId);
    });
    Message.findAll({
      attributes: ["fromUserId", "connectionId"],
      where: {
        toUserId: fromUserId,
      },
    }).then((data) => {
      var arrayId = [];
      data.map((data) => {
        arrayId.push(data.fromUserId);
        ConnId.push(data.connectionId);
      });
      uniqueArray = arrayId.filter(function (elem, pos) {
        return arrayId.indexOf(elem) == pos;
      });
      const userUnique = Array.from(new Set(arrayId));
      const toUserUnique = Array.from(new Set(toUsersId));
      const fromUserUnique = Array.from(new Set(fromUsersId));
      const ConnUnique = Array.from(new Set(ConnId));
      for (var i = 0; i < ConnUnique.length; i++) {
        console.log(uniqueArray.length, 'fsdafsf', userUnique, 'dfsdfsfsd', ConnUnique[i], 'sfsdfsfsfg', toUserUnique, 'ghfghfhfhfg', fromUserUnique);
        User.hasMany(Message, {
          foreignKey: "toUserId",
        });
        Message.belongsTo(User, {
          foreignKey: "toUserId",
        });
        Message.findOne({
          include: {
            model: User,
            attributes: ["id", "name", "profile_pic"],
            required: true,
          },
          order: [
            ["id", "DESC"]
          ],
          attributes: ["chat", "toUserId", "created_at"],
          where: {
            connectionId: ConnUnique[i],
            user1: 1
          },
        }).then((data) => {
          if (data !== null) {
            userData.push(data);
          }
        });
      }
    })
  })
  const datas = userData.sort(function (x, y) {
    return x.created_at - y.created_at;
  })
  setTimeout(() => {
    res.status(200).json({ userData: userData });
  }, 1000);
};













exports.list_inbox = async (req, res) => {
  const fromUserId = req.params.fromUserId;
  var toUserId = [];
  var connectionId = [];
  var Id = [];
  var Connection_Id = [];
  var fromUserIds = [];
  Message.findAll(
    {
      attributes: ["id", "fromUserId", 'connectionId', 'chat'],
      where: { toUserId: fromUserId }
    }).then(FromUser => {
      FromUser.map((f_user) => {
        const datas2 = f_user.fromUserId
        fromUserIds.push(datas2);
      })
    })
  Message.findAll(
    {
      attributes: ["id", "toUserId", 'connectionId', 'chat'],
      where: { fromUserId: fromUserId }
    }).then(ToUser => {
      ToUser.map((datas) => {
        const datas1 = datas.toUserId
        const datass = datas.connectionId
        toUserId.push(datas1)
        connectionId.push(datass)
      })


      const unique_connectionId = [...new Set(connectionId)]
      const unique_toUserId = [...new Set(toUserId)]
      const unique_fromUserIds = [...new Set(fromUserIds)]
      console.log(unique_fromUserIds, '===============================');
      for (i = 0; i < unique_fromUserIds.length; i++) {
        Message.findOne(
          {
            order: [["id", "DESC"]],
            attributes: ["id", "connectionId"],
            where: { fromUserId: unique_fromUserIds[i], toUserId: fromUserId }
          }).then(id => {
            Id.push(id.id)
            Connection_Id.push(id.connectionId)
          })
      }
      Message.findOne(
        {
          order: [["created_at", "DESC"]],
          attributes: ['id', 'chat'],
          where: { connectionId: unique_connectionId }
        }).then(chat => {
          User.hasMany(Message, {
            foreignKey: "fromUserId",
          });
          Message.belongsTo(User, {
            foreignKey: "fromUserId",
          });
          // Messages_inbox.hasMany(Message, {
          //   foreignKey: "connectionId",
          // });
          // Message.belongsTo(Messages_inbox, {
          //   foreignKey: "connectionId",
          // });
          Message.findAll({
            include: [
              {
                model: User,
                attributes: ["id", "name", "profile_pic"],
                required: true
              },
              // {
              //   model: Messages_inbox,
              //   attributes: ["chat"],
              //   required: true,
              // },
            ],
            order: [
              ['created_at', 'DESC']
            ],
            attributes: ["id", "fromUserId", "toUserId", "connectionId", "created_at", "chat"],
            // limit: 1,
            where: {
              id: Id,
              // connectionId: unique_connectionId
            },

          }).then((data4) => {

            console.log(Id, '.....................>>>>>>>>>>>>>>>>>>>>>');
            console.log(Connection_Id, '<<<<<<<<<<<<<<<<<<.................');
            // data4.map((data5) => {
            //   data5 = data5
            // chat.push(data5)
            // console.log(data5,'ooooooooooooooooooooooo');
            // const unique_data = [...new Set(data5)]
            // console.log(unique_data, 'huhuhuhuhuhuhuhuhuh');
            // const ids = data4.map(o => o.toUserId)
            // const filtered = data4.filter(({ toUserId }, index) => !ids.includes(toUserId, index + 1))
            // setTimeout(() => {
            res.status(200).json({ userData: data4 });
            //  }, 1000);
            // })


          })
        })
      // }

    })

}


exports.Inboxing = (req, res) => {
  const from_id = req.params.fromUserId;
  const to_id = req.params.fromUserId;
  const from_ids = parseInt(from_id)
  var connectionIds = [];
  var D = [];
  Messages_inbox.findAll({
    attributes: ["id", "connectionId"],
    where: {
      from_id: from_id,
    },
  })
    .then((data1) => {
      data1.map((datas) => {
        datas = datas.connectionId
        connectionIds.push(datas)
      })
      Messages_inbox.findAll({
        attributes: ["id", "connectionId"],
        where: {
          to_id: from_id,
        },
      })
        .then((data) => {
          data.map((datas) => {
            datas = datas.connectionId
            connectionIds.push(datas)
          })
          var connectionIds1 = [...new Set(connectionIds)];
          Messages_inbox.findAll({
            attributes: ["id", "from_id", "to_id", "chat", "from_profile", "to_profile", "from_name", "to_name", "connectionId", "status1", "status2"],
            where: {
              connectionId: connectionIds,
            },
          })
            .then((T) => {
              const connectionIds = T.map(o => o.connectionId)
              var S = T.filter(({ connectionId }, index) => !connectionIds.includes(connectionId, index + 1))
              const K = S.map((datas) => {
                if (datas.from_id == from_ids) {
                  if (datas.status1 == 1) {
                    datas.chat = datas.chat
                    datas.from_profile = datas.to_profile
                    datas.from_name = datas.to_name
                  } else {
                    datas.chat = "Chat Was Cleared"
                    datas.from_profile = datas.to_profile
                    datas.from_name = datas.to_name
                  }
                } else {
                  if (datas.status2 == 1) {
                    datas.to_id = datas.from_id
                    datas.chat = datas.chat
                    datas.from_profile = datas.from_profile
                    datas.from_name = datas.from_name
                  } else {
                    datas.to_id = datas.from_id
                    datas.chat = "Chat Was Cleared"
                    datas.from_profile = datas.from_profile
                    datas.from_name = datas.from_name
                  }
                }
              })
              res.json({ Inbox: S });
            })
        })
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};


exports.findAll = (req, res) => {
  Message.findAll()
    .then(data => {
      res.send(data);
    })
}