const express = require('express');
const {response} = require('express');

class IndexService{

    
    async getIndex(){
        return "hello world"
    }
}

module.exports = new IndexService()