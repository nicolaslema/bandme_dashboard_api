const {response} = require('express');
const PostService = require('../../services/post.service')


const getPosts = async(req,res = response)=>{
    const postService = PostService;
    const allPosts = await postService.getPosts();
    try {
        res.status(200).json({allPosts});
    } catch (error) {
        console.error(error);
    }

}


const createPost = async(req, res = resposne)=>{
    //TODO: capturar ID de usuario para asignar creador al post
    const {title, message, selectedFile, userId } = req.body;
    const creator = userId;
    console.log(creator);
    const postService = PostService;
    const createdPost = await postService.createPost(title, message, selectedFile, creator)
    try {
        res.status(200).json(createPost);
    } catch (error) {
        console.error(error);
    }
    
}


module.exports = {getPosts, createPost}