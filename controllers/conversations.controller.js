const database = require("../config/db.sequalize");
const Conversation = database.conversations;
const Like = database.likes;
const Group_image = database.group_image;
const User = database.user;
var sequelize = require("sequelize");
const fs = require('fs');
const { users } = require("../config/db.sequalize");
const { admin } = require('../config/firebase.config')
const path = require('path');
const Comment = database.comments;
const Like_comments = database.like_comments

//Upload Images In Group

exports.upload = (req, res) => {
  const fromUserId = req.params.fromUserId;
  const group_id = req.params.group_id;

  const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };

  const data3 = `http://i-collekt.jksoftec.com:3001/group_upload/${req.file.filename}`;

  Conversation.create({

    fromUserId: fromUserId,
    group_id: group_id,
    message: req.body.message,
    photos: data3,
    status: req.body.status
  })
    .then((user) => {

      Group_image.findOne({
        attributes: ["user_list", "subject", "user_id"],
        where: {
          id: group_id
        }
      }).then((data1) => {

        data = data1.user_list;
        data = data.split(",");
        var data = data.filter((value) => value != fromUserId);

        for (var i = 0; i < data.length; i++) {

          User.findOne({
            attributes: ["id", "device_token"],
            where: {
              id: data[i]
            }
          }).then((data2) => {

            const registrationToken = data2.device_token
            const options = notification_options;
            const message = {
              'notification': {
                'title': `new post on ${data1.subject} group`,
                'image': `${user.photos}`
              },

              'data': {
                'value': `${user.id}`,
                'key_value': 'Group Post',
                'status': '1',
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
        }

        res.json({
          uploaded_by: fromUserId,
          commends: user.message,
          image: data3,
          status: true
        });

      })

    }).catch((err) => {
      res.status(200).json(err);
    });
};

// group_posts

exports.group_photos = (req, res) => {
  Conversation.findAll({
    order: [["id", "DESC"]],
    attributes: ["id", "photos"],
    where: {
      group_id: req.params.group_id,
    },
  })
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};

// Delete

exports.delete = (req, res) => {
  const id = req.body.id;
  Conversation.findOne({
    attributes: ["photos"],
    where: {
      id: id
    }
  }).then((data) => {
    let url = data.photos;
    let filename = url.split('/').pop();
    let photo = filename.replace(/['"]+/g, '')

    fs.unlink(`./upload/group_upload/${photo}`, function (err) {
      if (err) throw err;
      console.log('File deleted!');
    });
    Conversation.destroy({
      where: {
        id: id,
      },
    }).then(() => {
      Like.destroy({
        where: {
          post_id: id,
        },
      });
      res.send({ Status: "Your Post Deleted" });
    })
  });
};

// Like Post

exports.likePost = (req, res) => {
  var right = "";
  id = req.params.id;
  Conversation.findOne({
    attributes: [
      "id",
      "group_id",
      "photos",
      "created_at",
      "like_users",
      "like_post",
    ],
    where: {
      id: id,
    },
  }).then((data) => {
    var users = [];
    data.dataValues.like_users == ""
      ? null
      : users.push([data.dataValues.like_users]);
    users.push(req.body.user);
    Conversation.findOne({
      attributes: ["id", "group_id", "photos", "like_post", "like_users"],
      where: {
        id: id,
      },
    }).then((data) => {
      data1 = data.like_users.split(",");
      for (var i = 0; data1.length > i; i++) {
        right = data1[i] !== req.body.user ? true : false;
      }

      if (right == true) {
        console.log(data1[i], "sdfsafsafsafsad");
        Conversation.update(
          {
            status: 1,
            like_users: users,
            like_post: sequelize.literal("like_post + 1"),
          },

          {
            where: { id: id },
          }
        )
          .then((data) => {
            Conversation.findOne({
              attributes: [
                "id",
                "group_id",
                "photos",
                "like_post",
                "like_users",
                "status",
              ],
              where: {
                id: id,
              },
            }).then((data) => {
              res.send(data);
            });
          });
      } else {
        Conversation.findOne({
          attributes: [
            "id",
            "group_id",
            "photos",
            "like_post",
            "like_users",
            "status",
          ],
          where: {
            id: id,
          },
        }).then((data) => {
          res.send(data);
        });
      }
    });
  });
};

//Unlike post

exports.unlikePost = (req, res) => {
  const id = req.params.id;
  const user = req.body.user;
  var right = "";
  Conversation.findOne({
    attributes: [
      "id",
      "group_id",
      "photos",
      "created_at",
      "like_users",
      "like_post",
    ],
    where: {
      id: id,
    },
  }).then((data) => {
    data = data.like_users;
    data = data.split(",");
    for (var i = 0; data.length > i; i++) {
      console.log(data, "dfdsfsafsafsadfsdfsafsadfsad");
      right = data[i] == req.body.user ? true : "";
      console.log(right, "ghfhjfhjfhhgfhgfhj");
    }

    if (right == true) {
      var data = data.filter((value) => value !== user);
      data = data.toString();

      Conversation.update(
        {
          status: 0,
          like_post: sequelize.literal("like_post - 1"),
          like_users: data,
        },
        {
          where: { id: id },
        }
      ).then((data) => {
        Conversation.findOne({
          attributes: [
            "id",
            "group_id",
            "photos",
            "like_post",
            "like_users",
            "status",
          ],
          where: {
            id: id,
          },
        })
          .then((data) => {
            res.send(data);
          })
          .catch(function () {
            console.log("Promise Rejected");
          });
      });
    } else {
      Conversation.findOne({
        attributes: [
          "id",
          "group_id",
          "photos",
          "like_post",
          "like_users",
          "status",
        ],
        where: {
          id: id,
        },
      })
        .then((data) => {
          res.send(data);
        })
        .catch(function () {
          console.log("Promise Rejected");
        });
    }
  });
};

// Like_Post

// exports.like_create = (req, res) => {
//   var dataCount = {};
//   const user_id = req.body.user_id;
//   const post_id = req.body.post_id;
//   Like.findOne({
//     where: { user_id: user_id, post_id: post_id },
//   }).then((Exist) => {
//     if (Exist !== null) {
//       Like.update(
//         { status: 1 },
//         { where: { user_id: user_id, post_id: post_id } }
//       )
//         .then(() => {
//           Like.findAll({ where: { post_id: post_id } }).then((data) => {
//             dataCount = data;
//             count = data.length;
//             const Result = [];
//             dataCount.map((data) => {
//               data.like_count = count;
//               Result.push(data);
//             });
//             res.json({ Like_Data: Result });
//           });
//         })
//         .catch((err) => {
//           res.status(500).json(err);
//         });
//     } else {
//       Like.create({
//         user_id: user_id,
//         post_id: post_id,
//         status: 1,
//       }).then(() => {
//         Like.findAll({ where: { post_id: post_id } })
//           .then((data) => {
//             dataCount = data;
//             count = data.length;
//             const Result = [];
//             // console.log(data.like_count, 'countsss')
//             dataCount.map((data) => {
//               data.like_count = count;
//               Result.push(data);
//             });
//             res.json({ Like_Data: Result });
//           })
//           .catch((err) => {
//             res.status(500).json(err);
//           });
//       });
//     }
//   });
// };

// // Dislike_Post
// exports.unlike_update = (req, res) => {
//   const user_id = req.body.user_id;
//   const post_id = req.body.post_id;
//   Like.findOne({
//     where: { user_id: user_id, post_id: post_id, status: 0 },
//   }).then((Exist) => {
//     if (Exist !== null) {
//       Like.findAll({ where: { post_id: post_id } })
//         .then((data) => {
//           dataCount = data;
//           count = data.length - 1;
//           const Result = [];
//           // console.log(data.like_count, 'countsss')
//           dataCount.map((data) => {
//             data.like_count = count;
//             Result.push(data);
//           });
//           res.json({ Like_Data: Result });
//         })
//         .catch((err) => {
//           res.status(500).json(err);
//         });
//     } else {
//       Like.update(
//         {
//           status: 0,
//         },
//         {
//           where: { user_id: user_id, post_id: post_id },
//         }
//       ).then(() => {
//         Like.findAll({ where: { post_id: post_id } })
//           .then((data) => {
//             dataCount = data;
//             count = data.length - 1;
//             const Result = [];
//             // console.log(data.like_count, 'countsss')
//             dataCount.map((data) => {
//               data.like_count = count;
//               Result.push(data);
//             });
//             res.json({ Like_Data: Result });
//           })
//           .catch((err) => {
//             res.status(500).json(err);
//           });
//       });
//     }
//   });
// };


exports.conservation_view = (req, res) => {
  const group_id = req.params.group_id;
  const arrayId = [];
  const userData = [];
  Conversation.findAll({
    attributes: ["fromUserId"],
    where: {
      group_id: group_id,
    },
  }).then((data) => {    
    data.map((data) => {
      arrayId.push(data.fromUserId);
    });
      User.hasMany(Conversation, {
        foreignKey: "fromUserId",
      });
      Conversation.hasMany(Like, {
        foreignKey: "post_id",
      });
      Like.belongsTo(Conversation, {
        foreignKey: "post_id",
      });
      Conversation.belongsTo(User, {
        foreignKey: "fromUserId",
      });
      Conversation.hasMany(Comment, {
        foreignKey: "post_id",
      });
      Comment.belongsTo(Conversation, {
        foreignKey: "post_id",
      });
      User.hasMany(Comment, {
        foreignKey: "user_id",
      });
      Comment.belongsTo(User, {
        foreignKey: "user_id",
      });
      Comment.hasMany(Like_comments, {
        foreignKey: "comment_id",
      });
      Like_comments.belongsTo(Comment, {
        foreignKey: "comment_id",
      });
      Conversation.findAll({
        include: [
          {
            model: Like,
            attributes: ["id", "user_id", "post_id", "status", "like_count",],
          },
          {
            model: User,
            order: [["id", "DESC"]],
            attributes: ["id", "name", "profile_pic"],
            required: true,
          },
          {
            model: Comment,
            include: [
              {
                model: User,
                attributes: ["id", "name", "profile_pic"],
                required: true,
              },
              {
                model: Like_comments,
                attributes: ["id", "comment_id", "user_id", "post_id", "status", "likecount",],
              },
            ],
            attributes: ["id", "user_id", "group_id", "post_id", "comment", "status", "createdAt"],
            order: [["id", "DESC"]],
            limit: 2
          },
        ],
        order: [["id", "DESC"]],
        attributes: [
          "id",
          "fromUserId",
          "group_id",
          "created_at",
          "photos",
          "message",
          "status"
        ],
        where: {
          fromUserId: arrayId,
          group_id: group_id,
        },
      }).then((data) => {
        userData.push(...data);
        res.status(200).json({ userData });
      });
  });
};


// ---------------------------------------------------------------------------------------------------------------------

// -------------------Server Backup----------------------------------------//

exports.conservation_view = (req, res) => {
  const group_id = req.params.group_id;

  var dataCount = {};
  var userData = [];
  Conversation.findAll({
    attributes: ["fromUserId"],
    where: {
      group_id: group_id,
    },
  }).then((data) => {

    var arrayId = [];
    data.map((data) => {
      arrayId.push(data.fromUserId);
    });
    uniqueArray = arrayId.filter(function (elem, pos) {
      return arrayId.indexOf(elem) == pos;
    });


    for (var i = 0; i < uniqueArray.length; i++) {
      User.hasMany(Conversation, {
        foreignKey: "fromUserId",
      });
      Conversation.hasMany(Like, {
        foreignKey: "post_id",
      });
      Like.belongsTo(Conversation, {
        foreignKey: "post_id",
      });
      Conversation.belongsTo(User, {
        foreignKey: "fromUserId",
      });
      Conversation.hasMany(Comment, {
        foreignKey: "post_id",
      });
      Comment.belongsTo(Conversation, {
        foreignKey: "post_id",
      });
      User.hasMany(Comment, {
        foreignKey: "user_id",
      });
      Comment.belongsTo(User, {
        foreignKey: "user_id",
      });
      Comment.hasMany(Like_comments, {
        foreignKey: "comment_id",
      });
      Like_comments.belongsTo(Comment, {
        foreignKey: "comment_id",
      });
      Conversation.findAll({
        include: [
          {
            model: Like,
            attributes: ["id", "user_id", "post_id", "status", "like_count",],
          },
          {
            model: User,
            order: [["id", "DESC"]],
            attributes: ["id", "name", "profile_pic"],
            required: true,
          },
          {
            model: Comment,
            include: [
              {
                model: User,
                attributes: ["id", "name", "profile_pic"],
                required: true,
              },
              {
                model: Like_comments,
                attributes: ["id", "comment_id", "user_id", "post_id", "status", "likecount",],
              },
            ],
            attributes: ["id", "user_id", "group_id", "post_id", "comment", "status", "createdAt"],
            order: [["id", "DESC"]],
            limit: 2
          },
        ],
        order: [["id", "DESC"]],
        attributes: [
          "id",
          "fromUserId",
          "group_id",
          "created_at",
          "photos",
          "message",
          "status"
        ],
        where: {
          fromUserId: [uniqueArray[i]],
          group_id: group_id,
        },
      }).then((data) => {
        userData.push(...data);
      });
    }

    setTimeout(() => {

      const data = { userData: userData };
      const sortArray = data["userData"];
      sortArray.sort((a, b) => {
        if (a.id < b.id) return 1;
        if (a.id > b.id) return -1;
        return 0;

      });
      res.status(200).json({ userData: sortArray });

    }, 500 * data.length);

  });
}


// -------------------------------------------------------------------------------------------------------------------------




///

exports.like_create = (req, res) => {
  const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };
  var dataCount = {};
  const user_id = req.body.user_id;
  const post_id = req.body.post_id;
  const group_id = req.body.group_id;
  Like.findOne({
    where: { user_id: user_id, post_id: post_id },
  }).then((Exist) => {
    console.log(Exist, "kkk");
    if (Exist !== null) {

      Like.update(
        { status: 1 },
        { where: { user_id: user_id, post_id: post_id } }
      )
        .then(() => {
          Like.findAll({ where: { post_id: post_id } }).then((data) => {
            dataCount = data;
            count = data.length;
            console.log(count, "count");
            Like.update({
              like_count: count
            }, { where: { post_id: post_id } })
            const Result = [];
            dataCount.map((data) => {
              data.like_count = count;
              Result.push(data);
              console.log(Result, "result");
            });
            res.json({ Like_Data: Result });
          });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } else {
      Like.create({
        user_id: user_id,
        post_id: post_id,
        group_id: group_id,
        status: 1,
      }).then(() => {
        Like.findAll({ where: { post_id: post_id } })
          .then((data) => {
            dataCount = data;
            count = data.length;
            Like.update({
              like_count: count
            }, { where: { post_id: post_id } })
            const Result = [];

            dataCount.map((data) => {
              data.like_count = count;
              Result.push(data);
            });
            User.findOne({
              attributes: ["name"],
              where: {
                id: user_id
              }
            }).then((user) => {

              Conversation.findOne({
                attributes: ["fromUserId", "photos"],
                where: {
                  id: post_id
                }
              }).then((data) => {

                User.findOne({
                  attributes: ["device_token"],
                  where: {
                    id: data.fromUserId
                  }
                }).then((devicetoken) => {
                  const registrationToken = devicetoken.device_token
                  const options = notification_options;
                  const message = {
                    'notification': {
                      'title': `${user.name} likes your post`,
                      'image': `${data.photos}`
                    },
                    'data': {
                      'value': `${group_id}`,
                      'key_value': 'like Post',
                      'status': '1'
                    }
                  };

                  admin.messaging().sendToDevice(registrationToken, message, options)
                    .then(function (response) {
                      console.log("Successfully sent message:", response);
                    })
                    .catch(function (error) {
                      console.log("Error sending message:", error);
                    })
                  res.json({ Like_Data: Result });
                })
                  .catch((err) => {
                    res.status(500).json(err);
                  });
              })
            })
          })
      })
    }
  });
};

// Dislike_Post
exports.unlike_update = (req, res) => {
  const user_id = req.body.user_id;
  const post_id = req.body.post_id;
  const group_id = req.body.group_id;
  Like.findOne({
    where: { user_id: user_id, post_id: post_id, status: 0 },
  }).then((Exist) => {
    if (Exist !== null) {
      Like.findAll({ where: { post_id: post_id } })
        .then((data) => {
          dataCount = data;
          count = data.length - 1;
          Like.update({
            like_count: count
          }, { where: { post_id: post_id } })
          const Result = [];
          // console.log(data.like_count, 'countsss')
          dataCount.map((data) => {
            data.like_count = count;
            Result.push(data);
          });
          res.json({ Like_Data: Result });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } else {
      Like.update(
        {
          status: 0,
        },
        {
          where: { user_id: user_id, post_id: post_id },
        }
      ).then(() => {
        Like.findAll({ where: { post_id: post_id } })
          .then((data) => {
            dataCount = data;
            count = data.length - 1;
            const Result = [];
            Like.update({
              like_count: count
            }, { where: { post_id: post_id } })
            // console.log(data.like_count, 'countsss')
            dataCount.map((data) => {
              data.like_count = count;
              Result.push(data);
            });
            res.json({ Like_Data: Result });
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      });
    }
  });
};


exports.conservation_view1 = (req, res) => {
  const group_id = req.params.group_id;
  console.log(group_id, "group_id111");
  var dataCount = {};
  var userData = [];
  Conversation.findAll({
    attributes: ["fromUserId"],
    where: {
      group_id: group_id,
    },
  }).then((data) => {
    var arrayId = [];
    data.map((data) => {
      arrayId.push(data.fromUserId);
    });
    uniqueArray = arrayId.filter(function (elem, pos) {
      return arrayId.indexOf(elem) == pos;
    });
    console.log(uniqueArray, "uniqueArray1111");

    for (var i = 0; i < uniqueArray.length; i++) {
      User.hasMany(Conversation, {
        foreignKey: "fromUserId",
      });
      Conversation.belongsTo(User, {
        foreignKey: "fromUserId",
      });

      Conversation.hasMany(Like, {
        foreignKey: "post_id",
      });

      Like.belongsTo(Conversation, {
        foreignKey: "post_id",
      });

      

      Conversation.findAll({
        include: [
          {
            model: Like,
            attributes: ["id", "user_id", "post_id", "status", "like_count"],
          },
          {
            model: User,
            order: [["id", "DESC"]],
            attributes: ["id", "name", "profile_pic"],
            required: true,
          },
        ],

        order: [["id", "DESC"]],
        attributes: [
          "id",
          "fromUserId",
          "group_id",
          "created_at",
          "photos",
          "message",
          "status"
        ],
        where: {
          fromUserId: [uniqueArray[i]],
          group_id: group_id,
        },
      }).then((data) => {
        userData.push(...data);
      });
    }

    const datas = userData.sort(function (x, y) {
      return x.created_at - y.created_at;
    });
    console.log(datas, "datas");

    setTimeout(() => {
      const data = { userData: userData };
      const sortArray = data["userData"];
      sortArray.sort((a, b) => {
        if (a.id < b.id) return 1;
        if (a.id > b.id) return -1;
        return 0;
      });
      res.status(200).json({ userData: sortArray });
    }, 500 * uniqueArray.length);
  });
};









exports.groupImages = (req, res) => {
  Conversation.findAll({
    order: [["id", "DESC"]],
    attributes: ["id", "photos", "status"],
    where: {
      group_id: req.params.group_id,
      status: 0
    },
  })
    .then((image) => {
      res.json({ image });
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};








