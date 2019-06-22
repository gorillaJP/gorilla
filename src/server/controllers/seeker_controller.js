
import mongoConnect from '../util/mongo_connect'
import Seeker from '../models/Seeker'
import { success, error } from '../util/constants'
import HttpStatus from 'http-status-codes'


const getSeeker = ( req, res ) => {

    Seeker.findOne( { '_id': req.params.id } ).exec().then( data => {

        res.status( 200 ).send( success( data ) )

    } ).catch( err => {
        res.status( HttpStatus.BAD_REQUEST ).send( error() )

    } )

}

const isUserNameTaken = ( req, res ) => {

    Seeker.countDocuments( { 'username': req.params.username } ).exec().then( data => {

        res.send( success( { 'count': data } ) )

    } ).catch( err => {
        console.log( err )
        res.status( HttpStatus.BAD_REQUEST ).send( resp_error )

    } )

}


const addSeeker = ( req, res ) => {

    var seeker = new Seeker( req.body )

    seeker.save().then( resp => {

        res.status( HttpStatus.OK ).send( success() )

    } ).catch( err => {

        console.log( err )

        res.status( HttpStatus.BAD_REQUEST ).send( error() )

    } )

}


export default { getSeeker, addSeeker, isUserNameTaken }