module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const followController = require('../controllers/follower.controller')

    router
        .post('/:user_id/follow-user', followController.followingUser)
        .get('/:to_id/follower', followController.putFollowerData)
        .get('/:from_id/following', followController.putFollowingData)
        .post('/:from_id/unfollow', followController.unfollow)
        .post('/count/all', followController.Counts)
        .post('/explore/users/', followController.Explore)

    app.use('/api/follow', router)
}