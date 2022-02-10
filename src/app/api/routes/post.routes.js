const express = require('express');
const {getPosts, createPost, getPost, updatePost, deletePost,likePost, testErrors } = require('../controllers/post.controller')

const router = express.Router();


router.get('/', getPosts);
router.post('/postById', getPost);
router.post('/createPost',  createPost);
router.patch('/updatePost', updatePost);
router.delete('/deletePost',deletePost);
router.patch('/:id/likePost', likePost);
router.get('/testError', testErrors);


module.exports = router;
