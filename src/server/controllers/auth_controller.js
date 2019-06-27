const express = require( 'express' );
const router = express.Router();

const jwt = require( 'jsonwebtoken' );
const passport = require( 'passport' );


const login = ( '/login', ( req, res, next ) => {

    passport.authenticate( 'local', { session: false }, ( err, user, info ) => {

        if ( err || !user ) {
            return res.status( 400 ).json( {
                message: info ? info.message : 'Login failed',
                user: user
            } );
        }

        req.login( user, { session: false }, ( err ) => {
            if ( err ) {
                res.send( err );
            }

            const token = jwt.sign( user, 'your_jwt_secret' );

            return res.json( { token } );
        } );
    } )
        ( req, res, next );

} );

export default { login }