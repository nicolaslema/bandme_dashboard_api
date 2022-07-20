const postModel = require('../models/post_old.model');
//const PostOld = require('../models/post_old.model');
const mongoose = require('mongoose');
const res = require('express/lib/response');
const Api404Error = require('../helpers/httpErrors/api404Error');
const Api400Error = require('../helpers/httpErrors/api400Error');
const BaseError = require('../helpers/baseError');
const httpStatusCodes = require('../../utils/httpErrors.model');
const axios = require('axios').default;
const User = require('../models/user.model');
const Post = require('../models/post.model');



class DashboardService {
    
    
    constructor(){}

    async decodeToken(userToken){
        try{
            const {data:response} = await axios.post('http://localhost:5001/api/v1/login/validate/user-identity', {
            token:userToken
        });
            return response;
        }catch(error){
            console.log("Error catch: " + error);
        }
    }
    
    async createPost(title, message, selectedFile, author ){

        try {
            //TODO: Verificaciones
            const newPost = new PostOld({title, message, selectedFile, author, createdAt: new Date()})
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


    async likePost(id, user_id){
        if(!mongoose.Types.ObjectId.isValid(id)) return `No post with id: ${id}`;

        try {
            const post = await postModel.findById(id);
            //const index = post.likes.findByIndex((id) => id === String(creator));
            const index = post.likes.indexOf(user_id);
        
            if(index === -1){
                post.likes.push(user_id)
            }else{
                post.likes = post.likes.filter((id)=> id !== String(user_id));
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

    async getFriendsPostList(userUid){
        let postList = {
            exist: false,
            data: {}
        };

        try{
            const userProfileDb = await User.findById(userUid);
            const {friend_list} = userProfileDb;
            const listadoGeneralPosteosPromesa = [];
            
            for( const friend of friend_list) {
                for( const idPosteo of friend.post_list ) {
                    const userPostDb = await Post.findById(idPosteo);
                    const {image_url, id_owner} = userPostDb;
                    
                    const posteo = {
                        uid_posteo: idPosteo,
                        uid_owner: id_owner,
                        first_name: friend.first_name,
                        last_name: friend.last_name,
                        isPremium: friend.isPremium,
                        post_image_url: image_url
                    };
                    listadoGeneralPosteosPromesa.push(posteo);
                }
            }
            const posteosDashboard = await Promise.all(listadoGeneralPosteosPromesa);

            const trueFirst = posteosDashboard.sort((a, b) => Number(b.bool) - Number(a.bool));
            console.log('LISTA ORDENADA BY TRUE VALUES: ', trueFirst);
            postList = {
                exist: true,
                data: {trueFirst}
            };
        }catch(error){
            console.log('Error al obtener datos del usuario desde la db: ', error);
            postList = {
                exist: false,
                data: {}
            };
        }

        return postList;
    }

    async findUsersByType(userUid, type) {
        let userList = {
            exist: false,
            data: {},
            message: '',
            size: 0
        };
        try{
            //evitar traerte a vos mismo
            const {_id} = await User.findById(userUid);
            const users = await User.find({user_type: type});
            console.log('USUARIOS QUE COINCIDEN CON EL MISMO TIPO: ', users);
            if(users != undefined && users.length > 0){
                const userListCleaned = users.filter(user => JSON.stringify(user._id) != JSON.stringify(_id));
                console.log('USUARIOS QUE COINCIDEN CON EL MISMO TIPO CLEANED: ', userListCleaned);
                userList = {
                    exist: true,
                    data: {userListCleaned},
                    size: userListCleaned.length,
                    message: 'successful search'
                };
            }else{
                console.log('Error al obtener usuarios ');    
                userList = {
                    exist: false,
                    data: {},
                    size: 0,
                    message: 'Error al obtener usuarios'
                };
            }
        }catch(error){
            console.log('Error al buscar los usuarios: ', error);
            userList = {
                exist: false,
                data: {},
                size: 0,
                message: 'Error al buscar los usuarios'
            };

        }
        return userList;
    }


    async findUserByName(name, lastName, userUid){
        let user = {
            exist: false,
            data: {},
            message: ''
        };
        //evitar que uno se auto busque
        if(name != null && name != undefined && name.length > 0){
            try{
                const {_id} = await User.findById(userUid);
                const userWanted = await User.findOne({first_name: name, last_name: lastName});
                if(userWanted != undefined && userWanted != null){
                    if(JSON.stringify(_id) != JSON.stringify(userWanted._id)){
                        user = {
                            exist: true,
                            data: {userWanted},
                            message: 'successful search'
                        };
                    }else {
                        user = {
                            exist: false,
                            data: {},
                            message: 'Failure search 404'
                        };
                    }
                    
                } else {
                    user = {
                        exist: false,
                        data: {},
                        message: 'Failure search'
                    };
                }
            }catch(error){
                console.log('Error no se encontro un usuario con ese nombre: ', error);
                user = {
                    exist: false,
                    data: {},
                    message: 'Error no se encontro un usuario con ese nombre'
                };
            }        
        } else {
            console.log('Error nombre de usuario incorrecto: ', error);
            user = {
                exist: false,
                data: {},
                message: 'Error nombre de usuario incorrecto'
            };
        }
        return user;
    }

//con el token del usuario lo mando a desencriptar obtengo uid del usuario para ir a buscar a la base de datos su info

//para dashboard , crear una lista de 10 posteos y 10 posteos premium.
//sortearlo por fecha de creacion
//mostrar en dashboard feed. 
//Agregar paginacion
//Agregar diferenciacion de posteos [banda, artista, establecimiento]
//
//Agregar campo bool PREMIUM al modelo de usuario.




}
module.exports = new DashboardService();