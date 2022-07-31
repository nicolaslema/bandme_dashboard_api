const express = require('express');
const {likeCount,likePost, testErrors, getFriendsPostController, findUserByName, findUsersByType, findPosteosByType } = require('../controllers/dashboard.controller')


const router = express.Router();



router.patch('/likePost', likePost);
router.post('/testError', testErrors);
router.post('/getLikes', likeCount);

router.post('/get-post-list', getFriendsPostController);
router.post('/find-user', findUserByName);
router.post('/find-users-type', findUsersByType);
router.post('/find-posteos-type', findPosteosByType);

module.exports = router;