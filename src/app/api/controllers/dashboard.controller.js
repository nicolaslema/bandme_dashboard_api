const {response} = require('express');
const Api400Error = require('../../helpers/httpErrors/api400Error');
const Api404Error = require('../../helpers/httpErrors/api404Error');
const dashboardService = require('../../services/dashboard.service');

const likePost = async(req, res = resposne)=>{
    //user_id = id del usuario que realiza el LIKE al post
    //id = id del post al que el usuario dio LIKE
    const token = req.headers['auth-token'];
   
    if(token != undefined) { //if the token comes in the request
    try{ 
    const {uid} = await dashboardService.decodeToken(token);
    if(uid != '' && uid != undefined && uid != null){
    const likedPost = await dashboardService.likePost(id, uid);
    let response;
      if(likePost.exist){
        response = res.status(200).json({
            exist: likedPost.exist,
            data: likedPost.data,
            message: likedPost.message
        });
      }  

    }
    else{

    }

    try {
        res.status(200).json({likedPost});
        
    } catch (error) {
        console.error(error);
    }

} catch(error){
    console.log('No se pudo autenticar la identidad: ', error);
    return res.status(500).json({
        message: 'No se pudo autenticar la identidad'
    });
}
} else {
    return res.status(400).json({
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
    console.log('token recibido desde el body controller: '+token);
    if(token != undefined) { //if the token comes in the request
        try{
        const {uid} = await dashboardService.decodeToken(token);
        console.log('RESULTADO DESDE CONTROLLER: ' + JSON.stringify(uid));
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
        console.log('No se pudo autenticar la identidad por que el token es incorrecto ');
        return res.status(500).json({
            message: 'No se pudo autenticar la identidad'
        });
    }
        return response;
    } catch(error){
        console.log('No se pudo autenticar la identidad: ', error);
        return res.status(500).json({
            message: 'No se pudo autenticar la identidad'
        });
    }
    } else {
        return res.status(400).json({
            message: 'Error request by bad token'
        });
    }
}

const findUserByName = async(req, res = response) => {
    const token = req.headers['auth-token'];
    const {username, lastName} = req.body;
    console.log('token recibido desde el body controller: '+token);
    if(token != undefined) {
        try{
            const {uid} = await dashboardService.decodeToken(token);
            console.log('RESULTADO DESDE CONTROLLER: ' + JSON.stringify(uid));
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
                console.log('No se pudo autenticar la identidad por que el token es incorrecto ');
                return res.status(500).json({
                    message: 'No se pudo autenticar la identidad'
                });
            }
            return response;
        } catch(error){
            console.log('No se pudo autenticar la identidad: ', error);
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
    console.log('token recibido desde el body controller: '+token);
    if(token != undefined) {
        try{ 
            const {uid} = await dashboardService.decodeToken(token);
            console.log('RESULTADO DESDE CONTROLLER: ' + JSON.stringify(uid));
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
                console.log('No se pudo autenticar la identidad por que el token es incorrecto ');
                return res.status(500).json({
                    message: 'No se pudo autenticar la identidad'
                });
            }
            return response;
        } catch(error){
            console.log('No se pudo autenticar la identidad: ', error);
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

const findPosteosByType = async(req, res = response) => {
    const token = req.headers['auth-token'];
    const {type, userType} = req.body;
    console.log('token recibido desde el body controller: '+token);
    console.log('USERTYPE recibido desde el body controller: '+userType);
    if(token != undefined) {
        try{
            const {uid} = await dashboardService.decodeToken(token);
            console.log('RESULTADO DESDE CONTROLLER: ' + JSON.stringify(uid));
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
                console.log('No se pudo autenticar la identidad por que el token es incorrecto ');
                return res.status(500).json({
                    message: 'No se pudo autenticar la identidad'
                });
            }
            return response;
        } catch(error){
            console.log('No se pudo autenticar la identidad: ', error);
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
    getPosts,
    createPost,
    getPost,
    updatePost,
    deletePost,
    likePost,
    testErrors,
    likeCount,
    getFriendsPostController,
    findUserByName,
    findUsersByType,
    findPosteosByType
}