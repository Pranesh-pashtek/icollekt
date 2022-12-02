
const database = require("../config/db.sequalize");
const Comment = database.comments;
const User = database.user;
const Like_comments = database.like_comments
const { admin } = require('../config/firebase.config')
const Conversation = database.conversations;
//comment create
exports.comment = (req, res) => {
  const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };

  if (req.body.comment != "") {
    Comment.create({
      user_id: req.body.user_id,
      group_id: req.body.group_id,
      post_id: req.body.post_id,
      comment: req.body.comment,
      status: 1
    }).then((data) => {

      Conversation.findOne({
        attributes: ["fromUserId", "photos"],
        where: {
          id: req.body.post_id
        }
      }).then((from) => {
        User.findOne({
          attributes: ["device_token"],
          where: {
            id: from.fromUserId
          }
        }).then((user) => {
          User.findOne({
            attributes: ["name"],
            where: {
              id: req.body.user_id
            }
          }).then((data2) => {

            const registrationToken = user.device_token
            const options = notification_options;
            const message = {
              'notification': {
                'title': `${data2.name} commented on your post`,
                'image': `${from.photos}`,
                'body': `${data.comment}`
              },

              'data': {
                'value': `${data.group_id}`,
                'key_value': 'Comment Post',
                'status': '1',
              }
            };
      
            admin.messaging().sendToDevice(registrationToken, message, options)
              .then(function (response) {
                console.log("Successfully sent message:", response);
              })
              .catch(function (error) {
                console.log("Error sending message:", error);
              })
          })
        })
      })

      res.status(200).send({
        result: false,
        message: "success",
      })

    }).catch((err) => {
      res.status(200).json(err);
    })
  } else {
    res.status(200).send({
      result: true,
      message: "You need to type something",
    })
  }
};


//Delete comment

exports.delete = (req, res) => {
  const id = req.body.id
  if (id != null) {
    Comment.destroy({
      where: {
        id: id,
      },
    }).then((data) => {
      Like_comments.destroy({
        where: {
          comment_id: id,
        },
      })
      return res.status(200).send({
        result: false,
        message: "Your comment is deleted",
      })
    })
  } else {
    return res.status(200).send({
      result: true,
      message: "Failed",
    })
  }
};

// List Comment

exports.comment_view = (req, res) => {
  const post_id = req.params.post_id;
  var userData = [];
  Comment.findAll({
    attributes: ["user_id"],
    where: {
      post_id: post_id,
    },
  }).then((data) => {
    var arrayId = [];
    data.map((data) => {
      arrayId.push(data.user_id);
    });
    uniqueArray = arrayId.filter(function (elem, pos) {
      return arrayId.indexOf(elem) == pos;
    });

    for (var i = 0; i < uniqueArray.length; i++) {
      User.hasMany(Comment, {
        foreignKey: "user_id",
      });
      Comment.hasMany(Like_comments, {
        foreignKey: "comment_id",
      });
      Like_comments.belongsTo(Comment, {
        foreignKey: "comment_id",
      });
      Comment.belongsTo(User, {
        foreignKey: "user_id",
      });
      Comment.findAll({
        include: [
          {
            model: Like_comments,
            attributes: ["id", "comment_id", "user_id", "post_id", "status", "likecount",],
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
          "user_id",
          "group_id",
          "post_id",
          "comment",
          "status",
          "createdAt"
        ],
        where: {
          user_id: [uniqueArray[i]],
          post_id: post_id,
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
    }, 100 * uniqueArray.length);
  });
};


//like comment
exports.like_comment = (req, res) => {
  const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };

  var dataCount = {};
  const user_id = req.body.user_id;
  const post_id = req.body.post_id;
  const group_id = req.body.group_id;
  const comment_id = req.body.comment_id;
  Like_comments.findOne({
    where: { user_id: user_id, post_id: post_id, comment_id: comment_id },
  }).then((Exist) => {

    if (Exist !== null) {

      Like_comments.update(
        { status: 1 },
        { where: { user_id: user_id, post_id: post_id, comment_id: comment_id } }
      )
        .then(() => {
          Like_comments.findAll({ where: { comment_id: comment_id } }).then((data) => {
            dataCount = data;
            count = data.length;
            console.log(count, "count");
            Like_comments.update({
              likecount: count
            }, { where: { comment_id: comment_id } })
            const Result = [];
            dataCount.map((data) => {
              data.likecount = count;
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

      Like_comments.create({
        user_id: user_id,
        post_id: post_id,
        group_id: group_id,
        comment_id: comment_id,
        status: 1,
      }).then((output) => {

        Like_comments.findAll({ where: { comment_id: comment_id } })
          .then((data) => {
            dataCount = data;
            count = data.length;

            Like_comments.update({
              likecount: count
            }, { where: { comment_id: comment_id } })
            const Result = [];

            dataCount.map((data) => {
              data.likecount = count;
              Result.push(data);
            });
            Conversation.findOne({
              attributes: ["photos"],
              where: {
                id: post_id
              }
            }).then((photo) => {


              Comment.findOne({
                attributes: ["user_id", "comment"],
                where: {
                  id: comment_id
                }
              }).then((dataa) => {
                User.findOne({
                  attributes: ["device_token"],
                  where: {
                    id: dataa.user_id
                  }
                }).then((user) => {

                  User.findOne({
                    attributes: ["name"],
                    where: {
                      id: user_id
                    }
                  }).then((data2) => {

                    const registrationToken = user.device_token
                    const options = notification_options;
                    const message = {
                      'notification': {
                        'title': `${data2.name} liked your comment:"${dataa.comment}" `,
                        // 'body': `"${dataa.comment}"`,
                        'image':`${photo.photos}`
                      },

                      'data': {
                        'value': `${group_id}`,
                        'key_value': 'Like comment',
                        'status': '1',
                      }
                    };
                
                    admin.messaging().sendToDevice(registrationToken, message, options)
                      .then(function (response) {
                        console.log("Successfully sent message:", response);
                      })
                      .catch(function (error) {
                        console.log("Error sending message:", error);
                      })
                  })
                })
              })
            })
            res.json({ Like_Data: Result });
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      });
    }
  });
};

// Dislike_comment
exports.unlike_comment = (req, res) => {
  const user_id = req.body.user_id;
  const post_id = req.body.post_id;
  const comment_id = req.body.comment_id;
  Like_comments.findOne({
    where: { user_id: user_id, post_id: post_id, comment_id: comment_id, status: 0 },
  }).then((Exist) => {

    if (Exist !== null) {
      Like_comments.findAll({ where: { comment_id: comment_id } })
        .then((data) => {
          dataCount = data;
          count = data.length - 1;
          Like_comments.update({
            likecount: count
          }, { where: { comment_id: comment_id } })
          const Result = [];

          dataCount.map((data) => {
            data.likecount = count;
            Result.push(data);
          });
          res.json({ Like_Data: Result });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } else {
      Like_comments.update(
        {
          status: 0,
        },
        {
          where: { user_id: user_id, post_id: post_id, comment_id: comment_id },
        }
      ).then(() => {
        Like_comments.findAll({ where: { comment_id: comment_id } })
          .then((data) => {
            dataCount = data;
            count = data.length - 1;
            const Result = [];
            Like_comments.update({
              likecount: count
            }, { where: { comment_id: comment_id } })

            dataCount.map((data) => {
              data.likecount = count;
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