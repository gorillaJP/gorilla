import express from 'express'
import auth_controller from './controllers/auth_controller'
import user_controller from './controllers/seeker_controller'
import passport from 'passport'
import { logFilter } from './filters/filter'

const router = express.Router()

const routes = [
    {
        'method': 'post',
        'auth': false,
        'path': '/login',
        'controller': auth_controller.login
    },
    {
        'method': 'get',
        'path': '/seeker/:id',
        'auth': true,
        'controller': user_controller.getSeeker
    },
    {
        'method': 'get',
        'auth': true,
        'path': '/exist/seeker/username/:username',
        'controller': user_controller.isUserNameTaken
    },
    {
        'method': 'post',
        'auth': true,
        'path': '/seeker',
        'controller': user_controller.addSeeker
    }

]

router.use( '/', logFilter )

//router.use( '/', passport.authenticate( 'jwt', { session: false } ) );
const authFilter = passport.authenticate( 'jwt', { session: false } )

/** loading all routes */
routes.forEach( route => {

    if ( route.auth )
        router[ route.method ]( route.path, authFilter, route.controller )

    router[ route.method ]( route.path, route.controller )

} )

export default router