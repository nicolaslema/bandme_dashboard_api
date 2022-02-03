const express = require('express');
const {response} = require('express');
const indexService = require('./index.services')


const getIndex = async(req, res= response) =>{
    
    const data = await indexService.getIndex();
    res.status(200).json({
        messsage: data
    });
}

module.exports = {getIndex};