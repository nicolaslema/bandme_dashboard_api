const express = require('express');
const {getPosts, createPost, getPost, updatePost, deletePost,likePost } = require('../controllers/post.controller')


const router = express.Router();


router.get('/', getPosts);
router.get('/postById', getPost);
router.post('/createPost', createPost);
router.patch('/updatePost:id', updatePost);
router.delete('/deletePost:id',deletePost);
router.patch('/:id/likePost', likePost);


module.exports = router;