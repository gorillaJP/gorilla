import mongoose from 'mongoose'
var uniqueValidator = require( 'mongoose-unique-validator' );

var authUser = {
    username: {
        type: String,
        index: true
    },
    email: {
        type: String
    },
    password: String
}

var authUserSchema = new mongoose.Schema( authUser )

authUserSchema.plugin( uniqueValidator );

var AuthUser = mongoose.model( 'AuthUser', authUserSchema );

export default AuthUser