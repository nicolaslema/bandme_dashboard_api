require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const {connectDB} = require('./db');
require('dotenv').config();

const rootPath = '/api/v1/dashboard';

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.app = express();
        this.rootPath = rootPath;
        this.initMiddlewares();
        this.routes();
        connectDB();
    }


    initMiddlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(helmet());
        
    }

    routes(){
        this.app.use(this.rootPath, require('../app/api/routes/dashboard.routes'));
    }


    listen(){
        this.app.listen(this.port, ()=>{
            
        })
        console.log("🚀 ~ file: server.js ~ line 40 ~ Server ~ this.app.listen ~ port", this.port)
        
    }

}

module.exports = Server;


