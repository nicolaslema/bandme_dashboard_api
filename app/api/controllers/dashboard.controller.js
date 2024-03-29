const {response} = require('express');
const Api400Error = require('../../helpers/httpErrors/api400Error');
const Api404Error = require('../../helpers/httpErrors/api404Error');
const dashboardService = require('../../services/dashboard.service');


const likePost = async(req, res = resposne)=>{
    const token = req.headers['auth-token'];
    const {posteoId} = req.body;
    if(token != undefined) { 
        try{ 
            const {uid} = await dashboardService.decodeToken(token);
            if(uid != '' && uid != undefined && uid != null){
                const likedPost = await dashboardService.likePost(posteoId, uid);
                let response;
                if(likedPost.exist){
                    response = res.status(200).json({
                        exist: likedPost.exist,
                        data: likedPost.data,
                        message: likedPost.message
                    });
                }  
            }
            else{
                response = res.status(400).json({
                    exist: likedPost.exist,
                    data: likedPost.data,
                    message: likedPost.message
                });
            }
        } catch(error){
            return res.status(500).json({
                message: 'No se pudo autenticar la identidad'
            });
        }
    } else {
        return res.status(401).json({
            message: 'Error request by bad token'
        });
    }
}


const likeCount =  async(req, res  =  resposne)=>{
    const {id} =  req.body;
    const likes = await dashboardService.countLikes(id);
    try{
        res.status(200).json({likes})
    }catch(error){
        console.error(error);
    }
}



const getFriendsPostController = async(req, res = response) => {
    const token = req.headers['auth-token'];
    if(token != undefined) { 
        try{
        const {uid} = await dashboardService.decodeToken(token);
        if(uid != '' && uid != undefined && uid != null){
        const getFriendPosteosList = await dashboardService.getFriendsPostList(uid);
        let response;
        if(getFriendPosteosList.exist){
            response = res.status(200).json({
                exist: getFriendPosteosList.exist,
                posteos_data: getFriendPosteosList.data,
                message: 'Posteos for dashboard success'
            });
        } else {
            response = res.status(400).json({
                exist: getFriendPosteosList.exist,
                posteos_data: getFriendPosteosList.data,
                message: 'Posteos for dashboard failure'
            });
        }
    }else{
        return res.status(500).json({
            message: 'No se pudo autenticar la identidad'
        });
    }
        return response;
    } catch(error){
        return res.status(500).json({
            message: 'No se pudo autenticar la identidad'
        });
    }
    } else {
        return res.status(401).json({
            message: 'Error request by bad token'
        });
    }
}

const findUserByName = async(req, res = response) => {
    const token = req.headers['auth-token'];
    const {username, lastName} = req.body;
    if(token != undefined) {
        try{
            const {uid} = await dashboardService.decodeToken(token);
            if(uid != '' && uid != undefined && uid != null){
                const userWanted = await dashboardService.findUserByName(username, lastName, uid);
                let response;
                if(userWanted.exist){
                    response = res.status(200).json({
                        exist: userWanted.exist,
                        data: userWanted.data,
                        message: userWanted.message
                    });
                } else {
                    response = res.status(400).json({
                        exist: userWanted.exist,
                        data: userWanted.data,
                        message: userWanted.message
                    });
                }
            }else{
                return res.status(500).json({
                    message: 'No se pudo autenticar la identidad'
                });
            }
            return response;
        } catch(error){
            return res.status(500).json({
                message: 'No se pudo autenticar la identidad'
            });
        }
    } else {
        return res.status(500).json({
            message: 'Error request by bad token'
        });
    }
}

const findUsersByType = async(req, res = response) => {
    const token = req.headers['auth-token'];
    const {type} = req.body;
    if(token != undefined) {
        try{ 
            const {uid} = await dashboardService.decodeToken(token);
            if(uid != '' && uid != undefined && uid != null){ 
                const usersList = await dashboardService.findUsersByType(uid, type);
                let response;
                if(usersList.exist){
                    response = res.status(200).json({
                        exist: usersList.exist,
                        data: usersList.data,
                        size: usersList.size,
                        message: usersList.message
                    });
                } else {
                    response = res.status(400).json({
                        exist: usersList.exist,
                        data: usersList.data,
                        size: usersList.size,
                        message: usersList.message
                    });
                }
            }else{
                return res.status(500).json({
                    message: 'No se pudo autenticar la identidad'
                });
            }
            return response;
        } catch(error){
            return res.status(500).json({
                message: 'No se pudo autenticar la identidad'
            });
        }
    } else {
        return res.status(401).json({
            message: 'Error request by bad token'
        });
    }
}

const findPosteosByType = async(req, res = response) => {
    const token = req.headers['auth-token'];
    const {type, userType} = req.body;
    if(token != undefined) {
        try{
            const {uid} = await dashboardService.decodeToken(token);
            if(uid != '' && uid != undefined && uid != null){ 
                const posteosList = await dashboardService.findPosteosByType(uid, type, userType);
                let response;
                if(posteosList.exist){
                    response = res.status(200).json({
                        exist: posteosList.exist,
                        data: posteosList.data,
                        size: posteosList.size,
                        message: posteosList.message
                    });
                } else {
                    response = res.status(400).json({
                        exist: posteosList.exist,
                        data: posteosList.data,
                        size: posteosList.size,
                        message: posteosList.message
                    });
                }
            }else{
                return res.status(500).json({
                    message: 'No se pudo autenticar la identidad'
                });
            }
            return response;
        } catch(error){
            return res.status(500).json({
                message: 'No se pudo autenticar la identidad'
            });
        }
    } else {
        return res.status(401).json({
            message: 'Error request by bad token'
        });
    }
}

const getPostDetails = async(req, res = response) => {
    const posteoId = req.query.posteoId;

    if(posteoId != null && posteoId != undefined && posteoId != ""){
        try{
            const posteo = await dashboardService.getPosteoById(posteoId);
            let response;
            if(posteo.exist){
                response = res.status(200).json({
                    exist: posteo.exist,
                    data: posteo.data,
                    message: posteo.message
                });
            } else {
                response = res.status(400).json({
                    exist: posteo.exist,
                    data: posteo.data,
                    message: posteo.message
                });
            }
        return response;
        } catch(error){
            return res.status(500).json({
                message: 'No se pudo encontrar el posteo'
            });
        }
    }else{
        return res.status(404).json({
            message: 'No se pudo encontrar el posteo, verifique la url'
        });
    }
}

const validateFriend = async(req, res = response) => {
    const token = req.headers['auth-token'];
    const {id_friend} = req.body;
    if(token != undefined) {
        try{
            const {uid} = await dashboardService.decodeToken(token);
            if(uid != '' && uid != undefined && uid != null){ 
                const validateUserFriend = await dashboardService.validateFriend(uid, id_friend);
                let response;
                if(validateUserFriend.exist){
                    response = res.status(200).json({
                        exist: validateUserFriend.exist,
                        data: validateUserFriend.data,
                        message: validateUserFriend.message
                    });
                } else {
                    response = res.status(200).json({
                        exist: validateUserFriend.exist,
                        data: validateUserFriend.data,
                        message: validateUserFriend.message
                    });
                }
            }else{
                return res.status(500).json({
                    message: 'No se pudo autenticar la identidad'
                });
            }
            return response;
        } catch(error){
            return res.status(500).json({
                message: 'No se pudo autenticar la identidad'
            });
        }
    } else {
        return res.status(401).json({
            message: 'Error request by bad token'
        });
    }
}

const findUserByWord = async(req, res = response) => {
    const token = req.headers['auth-token'];
    const {first_name, last_name, user_type, email} = req.body;

    if(token != undefined) {
        try{
            const {uid} = await dashboardService.decodeToken(token);
            if(uid != '' && uid != undefined && uid != null){ 
                const usersMatchesList = await dashboardService.findUserByWord(uid, first_name, last_name, user_type, email);
                let response;
                if(usersMatchesList.exist){
                    response = res.status(200).json({
                        exist: usersMatchesList.exist,
                        data: usersMatchesList.data,
                        message: usersMatchesList.message
                    });
                } else {
                    response = res.status(400).json({
                        exist: usersMatchesList.exist,
                        data: usersMatchesList.data,
                        message: usersMatchesList.message
                    });
                }
            }else{
                return res.status(500).json({
                    message: 'No se pudo autenticar la identidad'
                });
            }
            return response;
        } catch(error){
            return res.status(500).json({
                message: 'No se pudo autenticar la identidad'
            });
        }
    } else {
        return res.status(401).json({
            message: 'Error request by bad token'
        });
    }
}


const findPosteByType = async(req, res = response) => {
    const token = req.headers['auth-token'];
    const {type} = req.body;

    if(type != null && type != undefined && type != ""){
        if(token != undefined) {
            try{
                const {uid} = await dashboardService.decodeToken(token);
                if(uid != '' && uid != undefined && uid != null){ 
                    const posteosList = await dashboardService.findPosteByType(uid, type);
                    let response;
                    if(posteosList.exist){
                        response = res.status(200).json({
                            exist: posteosList.exist,
                            data: posteosList.data,
                            size: posteosList.size,
                            message: posteosList.message
                        });
                    } else {
                        response = res.status(400).json({
                            exist: posteosList.exist,
                            data: posteosList.data,
                            size: posteosList.size,
                            message: posteosList.message
                        });
                    }
                }else{
                    return res.status(500).json({
                        message: 'No se pudo autenticar la identidad'
                    });
                }
                return response;
            } catch(error){
                return res.status(500).json({
                    message: 'No se pudo autenticar la identidad'
                });
            }
        } else {
            return res.status(401).json({
                message: 'Error request by bad token'
            });
        }
    }else{
        return res.status(404).json({
            message: 'No se pudo encontrar el posteo, verifique la url'
        });
    }
}



//@DESC TEST ERROR
//TODO: DELETE AFTER TEST
const testErrors = async(req, res = response, next) =>{
    try {
        let data = await dashboardService.testError();
        res.status(200).json({message: data});
    } catch (error) {
        const message = error instanceof Api404Error ? error.message : 'Error en el TestError endpoint';
        res.status(error.statusCode).json({error, message: message});
        next(error);
        
    }
}





module.exports = {

    likePost,
    testErrors,
    likeCount,
    getFriendsPostController,
    findUserByName,
    findUsersByType,
    findPosteosByType,
    getPostDetails,
    findPosteByType,
    findUserByWord,
    validateFriend
}