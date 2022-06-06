const postModel = require('../models/post.model');
const Post = require('../models/post.model');
const mongoose = require('mongoose');
const res = require('express/lib/response');
const Api404Error = require('../helpers/httpErrors/api404Error');
const Api400Error = require('../helpers/httpErrors/api400Error');
const BaseError = require('../helpers/baseError');
const httpStatusCodes = require('../../utils/httpErrors.model');



class PostService {
    
    
    constructor(){}
    
    async createPost(title, message, selectedFile, creator ){

        try {
            //TODO: Verificaciones
            const newPost = new Post({title, message, selectedFile, creator, createdAt: new Date()})
            const savedPost = await newPost.save();
            return savedPost;
            
        } catch (error) {
           console.log(error)
        }
    }

    async getPosts (){
        try {
            return await postModel.find({});;
        } catch (error) {
            console.error(error);
        }
    }




    
    async getPost(id){
        try {
            const post = await postModel.findById(id);
                if(post === null){
                    throw new Api404Error('User not found', "getPost")
                }
            return post;
        } catch (error) {
            throw error  
        }
    }






    async updatePost(id, title, message, selectedFile){
        if(!mongoose.Types.ObjectId.isValid(id)) return `No post with id: ${id}`;
        try {

            const updatedPost = {title, message, selectedFile, id};
            const postUpdateResult = await postModel.findByIdAndUpdate(id, updatedPost, {new: true});
            return postUpdateResult;
            
        } catch (error) {
            console.log(error);
            
        }
    }

    async deletePost(id){
        if(!mongoose.Types.ObjectId.isValid(id)) return `No post with id: ${id}`;
        try {
            await postModel.findByIdAndRemove(id);
            return "POST DELETED"
        } catch (error) {
            console.log(error);
        }
    }


    async likePost(id, creator){
        if(!mongoose.Types.ObjectId.isValid(id)) return `No post with id: ${id}`;

        try {
            const post = await postModel.findById(id);
            //const index = post.likes.findByIndex((id) => id === String(creator));
            const index = post.likes.indexOf(creator);
        
            if(index === -1){
                post.likes.push(creator)
            }else{
                post.likes = post.likes.filter((id)=> id !== String(creator));
            }
            const updatedPost = await postModel.findByIdAndUpdate(id, post, {new: true})
            return updatedPost;
        } catch (error) {
            console.error(error);
        }

    }


    async countLikes(id){
        if(!mongoose.Types.ObjectId.isValid(id)) return `No post with id: ${id}`;

        try { 
            const post = await postModel.findById(id);
            console.log(post.likes.length)
            return post.likes.length
        
        }catch(error){
            console.error(error);
        }



    }

    //TEST PARA ERROR HANDLER
    //TODO: DELETE AFTER TEST
    async testError(){
        const isValid = true;

        if(isValid){
            throw new Api404Error("is valid is true", "testError");
        }

        return 'hellow';

    

    }

//para dashboard , crear una lista de 10 posteos y 10 posteos premium.
//sortearlo por fecha de creacion
//mostrar en dashboard feed. 
//Agregar paginacion
//Agregar diferenciacion de posteos [banda, artista, establecimiento]
//
//Agregar campo bool PREMIUM al modelo de usuario.




}
module.exports = new PostService();