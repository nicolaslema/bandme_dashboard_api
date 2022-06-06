const {Schema, model} = require('mongoose');

const PostSchema = Schema({

    title: { 
        type: String,
        reqired:[true, 'Title is required'],
        unique: true
},
    message: { 
        type: String,
        reqired:[true, 'Message is required'],
        
},
    creator: { 
        type: String,
        
},

    likes: { 
        type: [String],
        default: []
        
},

    likeCount:{
        type: Number
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

module.exports = model('Post', PostSchema);