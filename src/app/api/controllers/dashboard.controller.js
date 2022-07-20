const {response} = require('express');
const Api400Error = require('../../helpers/httpErrors/api400Error');
const Api404Error = require('../../helpers/httpErrors/api404Error');
const dashboardService = require('../../services/dashboard.service');

//TODO:Agregar Verificacion

const getPosts = async(req,res = response)=>{
    const allPosts = await dashboardService.getPosts();
    try {
        res.status(200).json({allPosts});
    } catch (error) {
        console.error(error);
    }

}







const getPost = async(req, res = response, next) => {
    const {id} = req.body;
    try {   
        
        const post = await dashboardService.getPost(id);
        res.status(200).json({post});
    } catch (error) {
        const message = error instanceof Api404Error ? error.message : 'Generic Error'
        const statusCode = error.statusCode;
        //res.status(statusCode).send({message: message, statusCode: statusCode, originalUrl: originalUrl});
        next(error);
    }
}






const createPost = async(req, res = resposne)=>{
    const {title, message, selectedFile, author } = req.body;
    //Creator = id del usuario creador del post.
    const createdPost = await dashboardService.createPost(title, message, selectedFile, author)
    try {
        res.status(200).json(createdPost);
    } catch (error) {
        console.error(error);
    }
}

const updatePost = async(req, res = response)=>{
    const {title, message, selectedFile, id} = req.body
    const postUpdateResult = await dashboardService.updatePost(id, title, message, selectedFile);
    try {
        res.status(200).json({postUpdateResult});
    } catch (error) {
        console.error(error);   
    }
}

const deletePost = async(req, res = response)=>{
    const {id} = req.body;
    const postDeletedResult = await dashboardService.deletePost(id);
    try {  
        res.status(200).json({message: postDeletedResult});
    } catch (error) {
        console.error(error);
    }
}

const likePost = async(req, res = resposne)=>{
    //user_id = id del usuario que realiza el LIKE al post
    //id = id del post al que el usuario dio LIKE
    const {id, user_id} = req.body;

    if(!user_id){
        return res.json({message: "Authenticate to like a post"})
    }
    
    const likedPost = await dashboardService.likePost(id, user_id);

    try {
        res.status(200).json({likedPost});
        
    } catch (error) {
        console.error(error);
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
        const {uid} = await dashboardService.decodeToken(token);
        console.log('RESULTADO DESDE CONTROLLER: ' + JSON.stringify(uid));
        const getFriendPosteosList = await dashboardService.getFriendsPostList(uid);
        let response;
        if(getFriendPosteosList.exist){
            response = res.status(200).json({
                exist: getFriendPosteosList.exist,
                posteos_data: getFriendPosteosList.data,
                message: 'Posteos for dashboard success'
            });
        } else {
            response = res.status(200).json({
                exist: getFriendPosteosList.exist,
                posteos_data: getFriendPosteosList.data,
                message: 'Posteos for dashboard failure'
            });
        }
        return response;
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
        try{ //----> AGREGAR ESTA VALIDACION
            const {uid} = await dashboardService.decodeToken(token);
            console.log('RESULTADO DESDE CONTROLLER: ' + JSON.stringify(uid));
            if(uid != '' && uid != undefined && uid != null){ //----> AGREGAR ESTA VALIDACION
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
        try{ //----> AGREGAR ESTA VALIDACION
            const {uid} = await dashboardService.decodeToken(token);
            console.log('RESULTADO DESDE CONTROLLER: ' + JSON.stringify(uid));
            if(uid != '' && uid != undefined && uid != null){ //----> AGREGAR ESTA VALIDACION
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
    findUsersByType
}