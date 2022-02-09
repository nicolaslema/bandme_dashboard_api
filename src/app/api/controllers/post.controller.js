const {response} = require('express');
const Api404Error = require('../../helpers/httpErrors/api404Error');
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
    //ID DEL USUARIO CREADOR DEL POST
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

const likePost = async(req, res = resposne)=>{
    const {id} = req.query;
    //ID DEL USUARIO
    const {creator} = req.body;

    if(!creator){
        return res.json({message: "Authenticate to like a post"})
    }
    
    const likedPost = await postService.likePost(id, creator);

    try {
        res.status(200).json({likedPost});
        
    } catch (error) {
        console.error(error);
    }
}



const testErrors = async(req, res = response, next) =>{
    try {
        let data = await postService.testError();
        res.status(200).json({message: data});
    } catch (error) {
        const message = error instanceof Api404Error ? error.message : 'Error en el TestError endpoint';
        res.status(error.statusCode).json({error, message: message});
        next(error);
        
    }
}




module.exports = {getPosts, createPost, getPost, updatePost,deletePost, likePost, testErrors}