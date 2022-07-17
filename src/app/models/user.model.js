const { Schema, model, mongoose } = require('mongoose');

const UserSchema = Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    /* _id: {
        type: String
    }, */
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String
    },
    user_type: {
        type: String
    },
    provider: {
        type: String
    },
    profile_photo: {
        type: String,
    },
    isPremium: {
        type: Boolean
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    description: {
        type: String
    },
    social_media: {
        type: Array
    },
    post_list: {
        type: Array
    },
    friend_list: {
        type: Array
        /* _id: mongoose.SchemaTypes.ObjectId,
        first_name: String,
        last_name: String,
        profile_photo: String */
    },
    account_status: {
        type: String,
        default: 'enable'
    }
});

const User = model( 'User', UserSchema );

module.exports = User;