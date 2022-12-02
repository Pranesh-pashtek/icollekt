
const database = require("../config/db.sequalize");
const Product_Comment = database.product_comments;
const User = database.user;
const Product_Like_comments = database.product_like_comments
const { admin } = require('../config/firebase.config')
// const Conversation = database.conversations;
const Product = database.products;
//comment create
exports.comment = (req, res) => {
    const notification_options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };
    if (req.body.comment != "") {
        Product_Comment.create({
            user_id: req.body.user_id,
            // group_id: req.body.group_id,
            product_id: req.body.product_id,
            comment: req.body.comment,
            status: 1
        }).then((data) => {
            Product.findOne({
                attributes: ["user_id", "thumbnail_img"],
                where: {
                    id: req.body.product_id
                }
            }).then((from) => {
                User.findOne({
                    attributes: ["device_token"],
                    where: {
                        id: from.user_id
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
                                'image': `${from.thumbnail_img}`,
                                'body': `${data.comment}`
                            },
                            'data': {
                                'value': `${data.group_id}`,
                                'key_value': 'Comment Product',
                                'status': '1',
                            }
                        };
                        admin.messaging().sendToDevice(registrationToken, message, options)
                            .then(function (response) {
                                console.log("Successfully sent Comment:", response);
                            })
                            .catch(function (error) {
                                console.log("Error sending Comment:", error);
                            })
                    })
                })
            })
            res.status(200).send({
                result: true,
                message: "success",
            })

        }).catch((err) => {
            res.status(200).json(err);
        })
    } else {
        res.status(200).send({
            result: false,
            message: "You need to type something",
        })
    }
};


//Delete comment

exports.delete = (req, res) => {
    const id = req.body.id
    if (id != null) {
        Product_Comment.destroy({
            where: {
                id: id,
            },
        }).then((data) => {
            Product_Like_comments.destroy({
                where: {
                    comment_id: id,
                },
            })
            return res.status(200).send({
                result: true,
                message: "Your comment is deleted",
            })
        })
    } else {
        return res.status(200).send({
            result: false,
            message: "Failed",
        })
    }
};

// List Comment

exports.comment_view = (req, res) => {
    const product_id = req.params.product_id;
    var userData = [];
    Product_Comment.findAll({
        attributes: ["user_id"],
        where: {
            product_id: product_id,
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
            User.hasMany(Product_Comment, {
                foreignKey: "user_id",
            });
            Product_Comment.hasMany(Product_Like_comments, {
                foreignKey: "comment_id",
            });
            Product_Like_comments.belongsTo(Product_Comment, {
                foreignKey: "comment_id",
            });
            Product_Comment.belongsTo(User, {
                foreignKey: "user_id",
            });
            Product_Comment.findAll({
                include: [
                    {
                        model: Product_Like_comments,
                        attributes: ["id", "comment_id", "user_id", "product_id", "status", "likecount",],
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
                    // "group_id",
                    "product_id",
                    "comment",
                    "status",
                    "created_at"
                ],
                where: {
                    user_id: [uniqueArray[i]],
                    product_id: product_id,
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
    const product_id = req.body.product_id;
    // const group_id = req.body.group_id;
    const comment_id = req.body.comment_id;
    Product_Like_comments.findOne({
        where: { user_id: user_id, product_id: product_id, comment_id: comment_id },
    }).then((Exist) => {
        if (Exist !== null) {
            Product_Like_comments.update(
                { status: 1 },
                { where: { user_id: user_id, product_id: product_id, comment_id: comment_id } }
            )
                .then(() => {
                    Product_Like_comments.findAll({ where: { comment_id: comment_id } }).then((data) => {
                        dataCount = data;
                        count = data.length;
                        Product_Like_comments.update({
                            likecount: count
                        }, { where: { comment_id: comment_id } })
                        const Result = [];
                        dataCount.map((data) => {
                            data.likecount = count;
                            Result.push(data);
                        });
                        res.json({ Like_Data: Result });
                    });
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
        } else {
            Product_Like_comments.create({
                user_id: user_id,
                product_id: product_id,
                // group_id: group_id,
                comment_id: comment_id,
                status: 1,
            }).then((output) => {
                Product_Like_comments.findAll({ where: { comment_id: comment_id } })
                    .then((data) => {
                        dataCount = data;
                        count = data.length;
                        Product_Like_comments.update({
                            likecount: count
                        }, { where: { comment_id: comment_id } })
                        const Result = [];
                        dataCount.map((data) => {
                            data.likecount = count;
                            Result.push(data);
                        });
                        Product.findOne({
                            attributes: ["name", "thumbnail_img"],
                            where: {
                                id: product_id
                            }
                        }).then((photo) => {
                            Product_Comment.findOne({
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
                                                'image': `${photo.thumbnail_img}`
                                            },

                                            'data': {
                                                'value': `${photo.name}`,
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
    const product_id = req.body.product_id;
    const comment_id = req.body.comment_id;
    Product_Like_comments.findOne({
        where: { user_id: user_id, product_id: product_id, comment_id: comment_id, status: 0 },
    }).then((Exist) => {
        if (Exist !== null) {
            Product_Like_comments.findAll({ where: { comment_id: comment_id } })
                .then((data) => {
                    dataCount = data;
                    count = data.length - 1;
                    Product_Like_comments.update({
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
            Product_Like_comments.update(
                {
                    status: 0,
                },
                {
                    where: { user_id: user_id, product_id: product_id, comment_id: comment_id },
                }
            ).then(() => {
                Product_Like_comments.findAll({ where: { comment_id: comment_id } })
                    .then((data) => {
                        dataCount = data;
                        count = data.length - 1;
                        const Result = [];
                        Product_Like_comments.update({
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