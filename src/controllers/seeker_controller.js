
import mongoConnect from '../util/mongoClient'
import mongoose from 'mongoose'
import Seeker from '../models/Seeker'
import { success, error } from '../util/constants'
import HttpStatus from 'http-status-codes'

/*** 
 * query a seeker by Id
*/
const getSeeker = (req, res) => {

    console.log('received')

    Seeker.findById(req.params.id).exec().then(data => {
        console.log("dadasfda")
        console.log(data)
        res.status(200).send(success(data))

    }).catch(err => {
        console.log(err)
        res.status(HttpStatus.BAD_REQUEST).send(error())
    })

}

/***
 * Register a seeker 
 */

const addSeeker = (req, res) => {

    var seeker = new Seeker(req.body)

    seeker.save().then(resp => {

        res.status(HttpStatus.OK).send(success())

    }).catch(err => {

        console.log(err)

        res.status(HttpStatus.BAD_REQUEST).send(error())

    })

}

export default { getSeeker, addSeeker }