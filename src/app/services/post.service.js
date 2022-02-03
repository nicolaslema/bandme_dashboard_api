const { response } = require('express');
const postModel = require('../models/post.model');
const {httpError} = require('../helpers/handleError');
const Post = require('../models/post.model');

class PostService {
    constructor(){}


    async createPost(title, message, selectedFile, creator ){
        const postResponse ={ postData: {}}
        const createdAt = new Date()
        try {
            //TODO: Verificaciones
            const newPost = new Post({title, message, selectedFile, creator, createdAt})
            const savedPost = await newPost.save();
            console.log(savedPost);
            return savedPost;
            
        } catch (error) {
           console.log(error)
        }
    }


    async getPosts (){
        try {
            let allPosts = postModel.find({});
            return allPosts;
        } catch (error) {
            httpError(error);
        }
    }
}

module.exports = new PostService();