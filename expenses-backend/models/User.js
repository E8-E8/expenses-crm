const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
require('dotenv').config(); 
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 50,
        minlength: 3,
    },
    email: {
        type:String,
        required: [true, "Please provide email"],
        match : [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email address'
        ],
        unique: true
    },
    password: {
        type:String,
        required: [true, "Please provide a password"],
    },
    role: {
        type: String,
        required : [true, "Please provide a role"],
        enum: {
            values: ['admin', 'user'],
            message: '{VALUE} is not supported',
        },
        default: 'user',
    }
})


//before a user is created his password is hashed
UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

//user method to created JWT
UserSchema.methods.createJWT = function(){
    return jwt.sign({userId: this._id, name: this.name}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_LIFETIME
    })
}

//user method to compare user password
UserSchema.methods.comparePassword = async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema)