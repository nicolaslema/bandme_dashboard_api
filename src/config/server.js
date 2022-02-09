require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const {connectDB} = require('../config/db');
const {errorMiddleWare} = require('../app/middlewares/errorHandler.middleware');


//TODO: constants file

const rootPath = '/api/v1/dashboard';
const app = express();

class Server{

    constructor(){
        this.app = express();
        this. port = process.env.PORT;
        this.rootPath = rootPath;
        this.initMiddlewares();
        this.routes();
        connectDB()
    }


    initMiddlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({limit:'30mb', extended: true}));
        this.app.use(helmet());
        this.app.use(errorMiddleWare);
       
        
    }

    routes(){
        this.app.use(this.rootPath, require('../app/api/routes/post.routes'));
    }


    listen(){
        this.app.listen(this.port, ()=>{
            
        })
        console.log("🚀 ~ file: server.js ~ line 42 ~ Server ~ App listen ~ port", this.port)
        
    }

}

module.exports = Server;


