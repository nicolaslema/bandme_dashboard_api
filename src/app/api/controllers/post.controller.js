const {response} = require('express');
const postService = require('../../services/post.service');
const PostService = require('../../services/post.service')

//TODO:Agregar Verificacion

const getPosts = async(req,res = response)=>{
    const allPosts = await postService.getPosts();
    try {
        res.status(200).json({allPosts});
    } catch (error) {
        console.error(error);
    }

}

const getPost = async(req,res = response)=>{
    const {_id} = req.query;
    const post = await postService.getPost(_id);
    try {
        res.status(200).json({post});
    } catch (error) {
        console.error(error);
    }
}

const createPost = async(req, res = resposne)=>{
    //TODO: capturar ID de usuario para asignar creador al post
    const {title, message, selectedFile, userId } = req.body;
    const creator = userId;
    const createdPost = await postService.createPost(title, message, selectedFile, creator)
    try {
        res.status(200).json(createdPost);
    } catch (error) {
        console.error(error);
    }
}

const updatePost = async(req, res = response)=>{
    const {id} = req.query;
    const {title, message, selectedFile} = req.body
    const postUpdateResult = await postService.updatePost(id, title, message, selectedFile);
    try {
        res.status(200).json({postUpdateResult});
    } catch (error) {
        console.error(error);   
    }
}

const deletePost = async(req, res = response)=>{
    const {id} = req.query;
    const postDeletedResult = await postService.deletePost(id);
    try {  
        res.status(200).json({message: postDeletedResult});
    } catch (error) {
        console.error(error);
    }
}





module.exports = {getPosts, createPost, getPost, updatePost,deletePost}