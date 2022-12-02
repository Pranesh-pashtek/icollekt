const database = require('../config/db.sequalize');
const followers = database.follower;
const User = database.user;
const Product = database.products;
const { admin } = require('../config/firebase.config')
/**
 * Create a follow to user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */

const followingUser = async (req, res) => {
    const notification_options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };
    var userBody = await req.body
    try {
        const id = req.params.user_id;
        const userId = userBody.to_id;
        userBody.status = 1;
        userBody.from_id = id;
        if (id == userId) {
            return res.status(200).json({ code: false, message: "you cannot follow yourSelf" })
        }
        var getData = await followers.findAll({ where: { from_id: id, to_id: userId } })
        function getFilterValue(value) {
            return value.status == 1
        }
        const filt = await getData.find(getFilterValue)
        if (filt) {
            return res.status(200).json({ code: false, message: "you already follow that user" }), getData, followers;
        } else {
            User.findOne({
                attributes: ["id", "device_token", "profile_pic", "name"],
                where: { id: userId },
            }).then((To) => {
                User.findOne({
                    attributes: ["id", "device_token", "profile_pic", "name"],
                    where: { id: id },
                }).then((From) => {
                    const registrationToken = To.device_token;
                    const options = notification_options;
                    const message = {
                        'notification': {
                            'title': `${From.name} Following You`,
                            'image': `${From.profile_pic}`
                            // 'body': req.body.chat,
                        },
                        'data': {
                            'value': `${userId}`,
                            'key_value': 'Following',
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
            });
            return followers.create(userBody), res.json({
                code: true,
                message: 'user follower Successfully'
            })
        }
    } catch (error) {
        console.log(error);
    }
}

// const followingUser = async (req, res) => {
//     var userBody = await req.body
//     try {
//         const id = req.params.user_id;
//         const userId = userBody.to_id;
//         userBody.status = 1;
//         userBody.from_id = id;
//         if (id == userId) {
//             return res.status(200).json({ code: false, message: "you cannot follow yourSelf" })
//         }
//         var getData = await followers.findAll({ where: { from_id: id, to_id: userId } })
//         function getFilterValue(value) {
//             return value.status == 1
//         }
//         const filt = await getData.find(getFilterValue)
//         if (filt) {
//             return res.status(200).json({ code: false, message: "you already follow that user" }), getData, followers;
//         } else {
//             return followers.create(userBody), res.json({
//                 code: true,
//                 message: 'user follower Successfully'
//             })
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }




/**
* Get follower details by from_id
* @param {ObjectId} from_id
* @returns {Promise<User>}
*/

const putFollowerData = async (req, res) => {
    try {
        const id = await req.params.to_id
        var finalFollower = [];
        var followerId;
        const getValue = await followers.findAll({ where: { to_id: id, status: 1 } }).then((val) => Promise.resolve(val).then((data) => {
            followerId = []
            data.filter((filt) => {
                let toId = filt.to_id
                followerId.push(toId)
            })
            User.findAll({ attributes: ['id', "name", 'email', 'profile_pic'], where: { id: followerId } }).then(val => Promise.resolve(val).then((dataCollect) => {
                let count = data.length
                finalFollower.push({ counts: count, followers: dataCollect })
            }))
            setTimeout(() => {
                res.send({ finalFollower })
            }, 100)
            return data
        }))
        return getValue, finalFollower
    } catch (error) {
        res.status(error.statusCode).json({
            code: error.statusCode,
            message: error.message || 'internal server error'
        })
    }
}

/**
* Get following details by to_id
* @param {ObjectId} to_id
* @returns {Promise<User>}
*/
const putFollowingData = async (req, res) => {
    try {
        const id = await req.params.from_id;
        var finalFollowing = []
        const getFollowing = await followers.findAll({ where: { from_id: id, status: 1 } }).then(ele => Promise.resolve(ele).then((data) => {
            var followingId = []
            data.filter((fil) => {
                let fromId = fil.from_id
                followingId.push(fromId)
                return fil
            })

            User.findAll({ attributes: ['id', "name", 'email', 'profile_pic'], where: { id: followingId } }).then(val => Promise.resolve(val).then((dataCollect) => {
                let count = data.length;
                finalFollowing.push({ counts: count, followingData: dataCollect })
            }))
            setTimeout(() => {
                res.send({ finalFollowing })
            }, 100)
            return data
        }))
        return finalFollowing, getFollowing
    } catch (error) {
        res.status(error.statusCode).json({
            code: error.statusCode,
            message: error.message || 'internal server error'
        })
    }
}

/**
* Get unfollow details by to_id
* @param {ObjectId} from_id
* @returns {Promise<User>}
*/

const getUnfollow = async (paramID, userBody, res) => {
    const id = await paramID.from_id;
    const toId = await userBody.to_id;
    userBody.status = 0;
    var getData = await followers.findAll({ where: { from_id: id, to_id: toId, status: 1 } })
    function getDatavalue(val) {
        return val.status == 1;
    }
    const collectValue = await getData.find(getDatavalue);

    if (!collectValue) {
        return res.status(200).json({ code: false, message: 'This Id already unfollow' }), collectValue;
    } else {
        // return res.status(200).json({ code: true, message: 'You Are unfollow This User' }), collectValue;
        Object.assign(collectValue, userBody)
        await collectValue.save()
    }
    return res.status(200).json({ code: true, message: 'You Are unfollow This User' }), collectValue;
}

const unfollow = async (req, res) => {
    try {
        const unfollowed = await getUnfollow(req.params, req.body, res)
        res.send(unfollowed)
    } catch (error) {
        res.status(error.statusCode).json({
            code: error.statusCode,
            message: error.message || 'internal server error'
        })
    }
}

/// Counts

const Counts = (req, res) => {
    const from_id = req.body.from_id;
    const to_id = req.body.to_id;
    followers.findAll({
        attributes: ["id", "from_id", "to_id", "status"],
        where: { from_id: from_id, status: 1 }
    }).then(Following_count => {
        followers.findAll({
            attributes: ["id", "from_id", "to_id", "status"],
            where: { to_id: from_id, status: 1 }
        }).then(Followers_count => {
            Product.findAll({
                where: { user_id: from_id },
                attributes: ["id", "name"],
            }).then((Product_count) => {
                followers.findOne({
                    attributes: ["status"],
                    order: [["id", "DESC"]],
                    where: { to_id: from_id, from_id: to_id }
                }).then(FollowStatus => {
                    console.log(FollowStatus, "ishaioudhoaishdou");
                    var data = [];
                    var Status = [];
                    if (FollowStatus == null) {
                        let FollowStatuss = 0;
                        let Status_false = false
                        data.push(FollowStatuss);
                        Status.push(Status_false)
                    }
                    else {
                        let Status_true = true
                        data.push(FollowStatus.status);
                        Status.push(Status_true)
                    }
                    res.status(200).json({
                        Following_count: Following_count.length,
                        Followers_count: Followers_count.length,
                        Product_count: Product_count.length,
                        FollowStatus: data[0],
                        Message: Status[0]
                    });
                })
            })
        })
    })
}



/// Explore By Following

const Explore = (req, res) => {
    const from_id = req.body.from_id;
    var following_id = [];
    followers.findAll({
        attributes: ["to_id"],
        where: { from_id: from_id, status: 1 }
    }).then(Following_count => {
        Following_count.map((Following_count) => {
            Following_count = Following_count.to_id
            following_id.push(Following_count)
        })
        User.hasMany(Product, {
            foreignKey: "id",
        });
        Product.belongsTo(User, {
            foreignKey: "user_id",
        });
        Product.findAll({
            include: {
                model: User,
                attributes: ["id", "name", "profile_pic"],
            },
            attributes: ["id", "name", "thumbnail_img", "user_id", "hashtags", "unit_price", "product_type"],
            where: { user_id: following_id, approved: 1 }
        }).then(Explore => {
            res.status(200).send({ Explore })
        })
    })
}

module.exports = {
    followingUser,
    putFollowerData,
    putFollowingData,
    unfollow,
    Counts,
    Explore
}