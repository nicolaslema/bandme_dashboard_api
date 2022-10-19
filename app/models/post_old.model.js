/* const {Schema, model} = require('mongoose');

const PostOldSchema = Schema({

    title: { 
        type: String,
        reqired:[true, 'Title is required'],
        unique: true
},
    message: { 
        type: String,
        reqired:[true, 'Message is required'],
        
},
    author: { 
        type: String,
        
},

    likes: { 
        type: [String],
        default: []
        
},

    likeCount:{
        type: Number,
        default: 0
},

    selectedFile: { 
        type: String,
        default: ''
        
        
},
    createdAt: {
        type: Date,
        default: new Date()
    },

})

module.exports = model('PostOld', PostOldSchema); */