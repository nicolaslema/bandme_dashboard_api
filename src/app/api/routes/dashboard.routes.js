const express = require('express');
const {getPosts,likeCount, createPost, getPost, updatePost, deletePost,likePost, testErrors, getFriendsPostController, findUserByName } = require('../controllers/dashboard.controller')


const router = express.Router();


router.get('/', getPosts);
router.post('/postById', getPost);
router.post('/createPost', createPost);
router.patch('/updatePost', updatePost);
router.delete('/deletePost',deletePost);
router.patch('/likePost', likePost);
router.post('/testError', testErrors);
router.post('/getLikes', likeCount);

router.post('/get-post-list', getFriendsPostController);
router.post('/find-user', findUserByName);

module.exports = router;