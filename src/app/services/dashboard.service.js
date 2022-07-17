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
        //console.log("desde el service se obtiene el user uid: ", userUid);
        let postList = {
            exist: false,
            data: {
                //aca es un array de objetos
            }
        };

        try{
            //1 obtengo mediante userUid los datos del usuario principal
            const userProfileDb = await User.findById(userUid);
            //console.log('datos obtenidos de la db del usuario: '+userProfileDb);
            //2 recorro su lista de amigos que es una lista de uid de cada amigo agregado y traigo los datos de cada amigo
            const {friend_list} = userProfileDb;
            //console.log('lista de amigos obtenidos: ', friend_list);
            //3 recorrer la lista de datos de mis amigos y obtener el nombre y apellido de cada amigo, si isPremium y su lista de posteos
            const listadoGeneralPosteosPromesa = [];
            
            for( const friend of friend_list) {
            //4 recorro la lista de amigos y luego recorro su lista de uid de posteos que tiene cada amigo y traigo los datos de cada posteo (image_url, uid)
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
            //5 Tener todos los posteos en una unica lista para despues dividirla en dos premium y no premium
            //console.log('lista terminada: ', posteosDashboard);

            //6 finalmente recorro esta lista que contiene toda la data recolectada, y filtro por el campo isPremium de cada objeto, los true van a una lista premium y los falses a otra lista
            //7 luego que tengo dos listas separadas las concateno poniendo en primer lugar todos los premiums y en segundo los No premium
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