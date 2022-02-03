const express = require('express');
const {getPosts, createPost, getPost, updatePost, deletePost } = require('../controllers/post.controller')


const router = express.Router();


router.get('/', getPosts);
router.get('/postById', getPost);
router.post('/createPost', createPost);
router.patch('/updatePost', updatePost);
router.delete('/deletePost',deletePost);



module.exports = router;