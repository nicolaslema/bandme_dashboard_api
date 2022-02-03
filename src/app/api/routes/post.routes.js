const express = require('express');
const {getPosts, createPost} = require('../controllers/post.controller')


const router = express.Router();


router.get('/', getPosts);
router.post('/createPost', createPost);


module.exports = router;