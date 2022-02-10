const {response} = require('express');
const Api400Error = require('../../helpers/httpErrors/api400Error');
const Api404Error = require('../../helpers/httpErrors/api404Error');
const postService = require('../../services/post.service');

//TODO:Agregar Verificacion

const getPosts = async(req,res = response)=>{
    const allPosts = await postService.getPosts();
    try {
        res.status(200).json({allPosts});
    } catch (error) {
        console.error(error);
    }

}







const getPost = async(req, res = response, next) => {
    const {id} = req.body;
    try {   
        
        const post = await postService.getPost(id);
        res.status(200).json({post});
    } catch (error) {
        const message = error instanceof Api404Error ? error.message : 'Generic Error'
        const statusCode = error.statusCode;
        //res.status(statusCode).send({message: message, statusCode: statusCode, originalUrl: originalUrl});
        next(error);
    }
}






const createPost = async(req, res = resposne)=>{
    const {title, message, selectedFile, creator } = req.body;
    //Creator = id del usuario creador del post.
    const createdPost = await postService.createPost(title, message, selectedFile, creator)
    try {
        res.status(200).json(createdPost);
    } catch (error) {
        console.error(error);
    }
}

const updatePost = async(req, res = response)=>{
    const {title, message, selectedFile, id} = req.body
    const postUpdateResult = await postService.updatePost(id, title, message, selectedFile);
    try {
        res.status(200).json({postUpdateResult});
    } catch (error) {
        console.error(error);   
    }
}

const deletePost = async(req, res = response)=>{
    const {id} = req.body;
    const postDeletedResult = await postService.deletePost(id);
    try {  
        res.status(200).json({message: postDeletedResult});
    } catch (error) {
        console.error(error);
    }
}

const likePost = async(req, res = resposne)=>{
    //Creator = id del usuario que realiza el LIKE al post
    //ID = id del post al que el usuario dio LIKE
    const {creator, id} = req.body;

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


//@DESC TEST ERROR
//TODO: DELETE AFTER TEST
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