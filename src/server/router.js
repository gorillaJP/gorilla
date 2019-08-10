import express from 'express'
import auth_controller from './controllers/auth_controller'
import seeker_controller from './controllers/seeker_controller'
import register_controller from './controllers/register_controller'

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
        'auth': false,
        'controller': seeker_controller.getSeeker
    },
    {
        'method': 'get',
        'auth': false,
        'path': '/exist/seeker/:prop/:value',
        'controller': register_controller.isValueTaken
    },
    {
        'method': 'post',
        'auth': true,
        'path': '/seeker',
        'controller': seeker_controller.addSeeker
    },
    {
        'method': 'post',
        'auth': false,
        'path': '/register',
        'controller': register_controller.registerSeeker
    }

]

router.use('/', logFilter)

const authFilter = passport.authenticate('jwt', { session: false })

/** loading all routes */
routes.forEach(route => {

    if (route.auth)
        router[route.method](route.path, authFilter, route.controller)

    router[route.method](route.path, route.controller)

})

export default router