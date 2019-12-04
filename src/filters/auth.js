const passport = require( 'passport' );
const passportJWT = require( "passport-jwt" );
import AuthUser from '../models/AuthUser'

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require( 'passport-local' ).Strategy;
const JWTStrategy = passportJWT.Strategy;

// authentication configuration file

passport.use( new LocalStrategy( {
    usernameField: 'username',
    passwordField: 'password'
},
    ( username, password, cb ) => {

        return AuthUser.findOne( { username, password } )
            .then( user => {
                if ( !user ) {
                    return cb( null, false, { message: 'Incorrect email or password.' } );
                }
                return cb( null, user.toJSON(), {
                    message: 'Logged In Successfully'
                } );
            } )
            .catch( err => {
                return cb( err );
            } );
    }
) );

passport.use( new JWTStrategy( {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
},
    ( jwtPayload, cb ) => {
        return cb( null, jwtPayload );
    }
) );