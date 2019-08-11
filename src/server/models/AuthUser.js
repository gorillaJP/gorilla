import mongoose from 'mongoose'
var uniqueValidator = require('mongoose-unique-validator');

var authUser = {
    name: {
        type: String
    },
    username: {
        type: String,
        index: true,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String
}

var authUserSchema = new mongoose.Schema(authUser)

authUserSchema.plugin(uniqueValidator);

var AuthUser = mongoose.model('AuthUser', authUserSchema);

export default AuthUser