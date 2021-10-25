//creating user model

//bringing in mongoose
const mongoose = require('mongoose')

//creating a new schema, here we pass in an object with the user fields
const UserSchema = new mongoose.Schema({
    //these are the details that we will get back from google 
    googleId:{
        type: String,
        required: true
    },

    displayName:{
        type: String,
        required: true
    },

    firstName:{
        type: String,
        required: true
    },

    lastName:{
        type: String,
        required: true
    },

    image:{
        type: String,
    },

    createdAt:{
        type: Date,
        default: Date.now
    } 
})

//this is how we export the model that we just created
module.exports = mongoose.model('User', UserSchema)