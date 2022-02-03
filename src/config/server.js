require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');


//TODO: constants file

const rootPath = '/api/v1';
const app = express();

class Server{

    constructor(){
        this.app = express();
        this. port = 8089;
        this.rootPath = rootPath;
        this.initMiddlewares();
        this.routes();
        //TODO: connectDB
    }


    initMiddlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(helmet());
        
    }

    routes(){
        this.app.use(this.rootPath, require('../api/components/index/index.routes'));
    }


    listen(){
        this.app.listen(this.port, ()=>{
            
        })
        console.log("🚀 ~ file: server.js ~ line 40 ~ Server ~ this.app.listen ~ port", this.port)
        
    }

}

module.exports = Server;


