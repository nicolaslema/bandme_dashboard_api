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
        unique: true
},
    creator: { 
        type: String,
        reqired:[true, 'Creator is required'],
        unique: true
},

    likes: { 
        type: [String],
        default: []
        
},
    selectedFile: { 
        type: String,
        
        
},


})

module.exports = model('Post', PostSchema);