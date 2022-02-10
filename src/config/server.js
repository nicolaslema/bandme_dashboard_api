require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const {connectDB} = require('../config/db');
const {errorHandler} = require('../app/middlewares/errors.middleware')



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
        this.initErrorMiddleware();
        connectDB()
    }


    initMiddlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({limit:'30mb', extended: true}));
        this.app.use(helmet());    
    }

    initErrorMiddleware(){
        this.app.use(errorHandler)
    }
    
    routes(){
        this.app.use(this.rootPath, require('../app/api/routes/post.routes'));
    }


    listen(){
        this.app.listen(this.port, ()=>{
            
        })
        console.log('\x1b[32m%s\x1b[0m', "🚀 ~ file: server.js ~ line 49 ~ Server ~ App listen on port", this.port)
        
    }

}

module.exports = Server;


