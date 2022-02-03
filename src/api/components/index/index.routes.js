const express = require('express');
const {Router} = require('express');
const router = express.Router();
const {getIndex} = require('./index.controller')



router.get('/index', getIndex)
    


module.exports = router;