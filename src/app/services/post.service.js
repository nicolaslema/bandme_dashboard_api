const postModel = require('../models/post.model');
const Post = require('../models/post.model');
const mongoose = require('mongoose');
const res = require('express/lib/response');


class PostService {
    
    constructor(){}

    async createPost(title, message, selectedFile, creator ){
        // const createdAt = new Date()
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
            const allPosts = postModel.find({});
            return allPosts;
        } catch (error) {
            console.error(error);
        }
    }

    async getPost(_id){

        try {
            const post = await postModel.findById(_id);

            return post;
        } catch (error) {
            console.log(error);
        }
    }

    async updatePost(id, title, message, selectedFile){
        if(!mongoose.Types.ObjectId.isValid(id)) return `No post with id: ${id}`;
        try {
            
            const updatedPost = {title, message, selectedFile, _id: id};
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



}
module.exports = new PostService();