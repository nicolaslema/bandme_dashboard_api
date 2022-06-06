const express = require('express');
const {getPosts,likeCount, createPost, getPost, updatePost, deletePost,likePost, testErrors } = require('../controllers/post.controller')


const router = express.Router();


router.get('/', getPosts);
router.post('/postById', getPost);
router.post('/createPost', createPost);
router.patch('/updatePost', updatePost);
router.delete('/deletePost',deletePost);
router.patch('/likePost', likePost);
router.post('/testError', testErrors);


router.post('/getLikes', likeCount);

module.exports = router;