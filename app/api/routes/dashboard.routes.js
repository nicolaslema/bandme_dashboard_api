const express = require('express');
const {likeCount,likePost, testErrors, getFriendsPostController, findUserByName, findUsersByType, findPosteosByType, getPostDetails, findPosteByType, findUserByWord } = require('../controllers/dashboard.controller')

const router = express.Router();



router.post('/likePost', likePost);
router.post('/testError', testErrors);
router.post('/getLikes', likeCount);

router.post('/get-post-list', getFriendsPostController);
router.post('/find-user', findUserByName);
router.post('/find-users-type', findUsersByType);
router.post('/find-posteos-type', findPosteosByType);

router.get('/get-post-details', getPostDetails);

router.post('/find-post-by-type', findPosteByType);
router.post('/find-user-by-word', findUserByWord);

module.exports = router;