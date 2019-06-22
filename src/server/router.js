import express from 'express'
import user_controller from './controllers/seeker_controller'

const router = express.Router()

const routes = [
    {
        'method': 'get',
        'path': '/seeker/:id',
        'controller': user_controller.getSeeker
    },
    {
        'method': 'get',
        'path': '/exist/seeker/username/:username',
        'controller': user_controller.isUserNameTaken
    },
    {
        'method': 'post',
        'path': '/seeker',
        'controller': user_controller.addSeeker
    }

]



/** loading all routes */
routes.forEach( route => {
    router[ route.method ]( route.path, route.controller )
} )

export default router