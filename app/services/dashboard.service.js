//const Post = require('../models/post.model');
//const PostOld = require('../models/post_old.model');
const mongoose = require('mongoose');
const res = require('express/lib/response');
const Api404Error = require('../helpers/httpErrors/api404Error');
const Api400Error = require('../helpers/httpErrors/api400Error');
const BaseError = require('../helpers/baseError');
const httpStatusCodes = require('../utils/httpErrors.model');
const axios = require('axios').default;
const User = require('../models/user.model');
const Post = require('../models/post.model');



class DashboardService {
    
    constructor(){}

    async decodeToken(userToken){
        try{
            const {data:response} = await axios.post('https://bandme-login-api.herokuapp.com/api/v1/login/validate/user-identity', {
            token:userToken
        });
            return response;
        }catch(error){
            console.log("Error catch: " + error);
        }
    }
    

    //GET POSTEO BY ID
    async getPosteoById(posteoId){
        let response = {
            exist: false,
            data: {},
            message: {}
        }
        try{
            console.log("POSTEO ID --> " +posteoId)
            const posteoDb = await Post.findById(posteoId);
            console.log("datos del posteo --> " + posteoDb);
            const { id_owner, title, image_url, date, time, street, street_number, description, like_count } = posteoDb;
            const ownerProfile = await User.findById(id_owner);
            console.log("datos del owner --> " + ownerProfile);
            const { profile_photo, first_name, last_name, email } = ownerProfile;

            const posteoDetails = {
                id_owner: id_owner,
                title: title,
                image_url: image_url, // puede ir null
                date: date,
                time: time,
                street: street, // puede ir null
                street_number: street_number, // puede ir null
                description: description,
                like_count: like_count,
                profile_photo: profile_photo, // puede ir null
                first_name: first_name, // puede ir null
                last_name: last_name, //puede ir null
                email: email 
            };

            response = {
                exist: true,
                data: posteoDetails,
                message: "Detalles del posteo encontrado"
            }

        }catch(error){
            console.error(error);
            response = {
                exist: false,
                data: null,
                message: 'El servicio falló, verifique el id del posteo',
            };
        }
        return response;
    }
 

//LIKES
    async likePost(posteoId, userUid){
        let response = {
            exist: false,
            data: {},
            message: '',
            isLike: false
        };
        //if(!mongoose.Types.ObjectId.isValid(posteoId)) return `No post with id: ${posteoId}`;
        let isLike = false;
        try {
            //obtengo el posteo by id
            const posteoDb = await Post.findById(posteoId);
            console.log("datos del posteo --> " + posteoDb);
            //verificar si en la lista de likes del posteo se encuentra el uid del usuario y si esta vacia
            const isUserIdInclude = posteoDb.likes.includes(userUid);
            console.log("incluye el user id? " + isUserIdInclude);
            if(!isUserIdInclude){
                console.log("EL ID NO ESTA INCLUIDO, entonces lo agregamos");
                posteoDb.likes.push(userUid);
                console.log("contador de like antes: "+ posteoDb.like_count)
                posteoDb.like_count = posteoDb.like_count+1
                console.log("contador de like despues: "+ posteoDb.like_count)
                isLike = true;
            }else{
                console.log("EL ID ESTA INCLUIDO, entonces lo quitamos")
                posteoDb.likes = posteoDb.likes.filter(function(e) { return e !== userUid });
                console.log("contador de like antes: "+ posteoDb.like_count)
                if(posteoDb.like_count > 0){
                    posteoDb.like_count = posteoDb.like_count-1
                    console.log("contador de like despues: "+ posteoDb.like_count)
                    isLike = false;
                }
            }
            await Post.findOneAndUpdate({ _id: posteoId }, {likes: posteoDb.likes, like_count:posteoDb.like_count});
            //una vez que ya actualizo, hago un findbyid y traigo los nuevos datos del posteo, envio el id del posteo, la lista de likes y el contador de likes como respuesta
            const posteoUpdatedDb = await Post.findById(posteoId);


            response = {
                exist: true,
                data: {
                    posteo: posteoUpdatedDb,
                    isLike: isLike
                },
                message: 'Se agrego o quito el like',
            };
        } catch (error) {
            console.error(error);
            response = {
                exist: false,
                data: null,
                message: 'El servicio falló',
            };
        }
        return response;
    }

//COUNT LIKES
    async countLikes(id){
        if(!mongoose.Types.ObjectId.isValid(id)) return `No post with id: ${id}`;

        try { 
            const post = await Post.findById(id);
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
                    const {image_url, id_owner, likes, like_count} = userPostDb;
                    //buscar profile photo del owner y agregar, de esta forma se mantiene la imagen del perfil actualizada, y no la guardada cuando se agrego a la lista de amigos, por que puede que la haya actualizado
                    const ownerProfile = await User.findById(id_owner);
                    const { profile_photo } = ownerProfile

                    const isLikeByUser = likes.includes(userUid);

                    const posteo = {
                        uid_posteo: idPosteo,
                        uid_owner: id_owner,
                        first_name: friend.first_name,
                        last_name: friend.last_name,
                        isPremium: friend.isPremium,
                        post_image_url: image_url,
                        owner_profile_photo: profile_photo,
                        likes: likes,
                        like_count: like_count,
                        is_like_by_user: isLikeByUser
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

    async findPosteosByType(userUid, type, userType){ //type --> advertising/search/event : true/false 
        let posteosList = {
            exist: false,
            data: {},
            message: '',
            size: 0
        };
        try{
            const {_id} = await User.findById(userUid);
            switch (type) {
                case 'advertising':
                    const posteosAdvertising = await Post.find({'checkbox.advertising': 'true'});
                    const posteosAdvertisingCleaned = posteosAdvertising.filter(posteo => JSON.stringify(posteo.id_owner) != JSON.stringify(_id));
                    console.log(posteosAdvertisingCleaned)
                    posteosList = {
                        exist: true,
                        data: {posteosAdvertisingCleaned},
                        message: 'Lista de posteos de publicidad exitoso',
                        size: posteosAdvertisingCleaned.length
                    };
                    break;
                case 'search':
                    const posteosSearch = await Post.find({'checkbox.search': 'true'});
                    switch (userType) {
                        case 'ARTIST':
                            const artistList = posteosSearch.filter(posteo => posteo.checkbox.owner_user_type == userType);
                            const artistListCleaned = artistList.filter(posteo => JSON.stringify(posteo.id_owner) != JSON.stringify(_id));
                            posteosList = {
                                exist: true,
                                data: {artistListCleaned},
                                message: 'Lista de posteos de artistas que estan haciendo una busquedad exitoso',
                                size: artistListCleaned.length
                            };
                            break;
                        case 'BAND':
                            const bandList = posteosSearch.filter(posteo => posteo.checkbox.owner_user_type == userType);
                            const bandListCleaned = bandList.filter(posteo => JSON.stringify(posteo.id_owner) != JSON.stringify(_id));
                            posteosList = {
                                exist: true,
                                data: {bandListCleaned},
                                message: 'Lista de posteos de bandas que estan haciendo una busquedad exitoso',
                                size: bandListCleaned.length
                            };
                             break;
                        case 'PLACE':
                            const placeList = posteosSearch.filter(posteo => posteo.checkbox.owner_user_type == userType);
                            const placeListCleaned = placeList.filter(posteo => JSON.stringify(posteo.id_owner) != JSON.stringify(_id));
                            posteosList = {
                                exist: true,
                                data: {placeListCleaned},
                                message: 'Lista de posteos de lugares que estan haciendo una busquedad exitoso',
                                size: placeListCleaned.length
                            };
                            break;
                        default:
                            break;
                    }
                    break;
                case 'event':
                    const posteosEvents = await Post.find({'checkbox.event': 'true'});
                    const posteosEventsCleaned = posteosEvents.filter(posteo => JSON.stringify(posteo.id_owner) != JSON.stringify(_id));
                    posteosList = {
                        exist: true,
                        data: {posteosEventsCleaned},
                        message: 'Lista de posteos de eventos exitoso',
                        size: posteosEventsCleaned.length
                    };
                    break;
            
                default:
                    posteosList = {
                        exist: false,
                        data: {},
                        message: 'Error default al buscar los posteos',
                        size: 0
                    };
                    break;
            }
        }catch(error){
            console.log('Error al buscar los posteos: ', error);
            posteosList = {
                exist: false,
                data: {},
                message: 'Error al buscar los posteos',
                size: 0
            };
        }
        return posteosList;
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






}
module.exports = new DashboardService();