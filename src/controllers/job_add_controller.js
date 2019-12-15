
import HttpStatus from 'http-status-codes'
import JobAdd from '../models/JobAdd'
import { success, error } from '../util/constants'

const getJobById = ( req, res ) => {

    JobAdd.findById( req.params.id ).exec().then( data => {

        res.status( 200 ).send( success( data ) )

    } ).catch( err => {
        console.log( err )
        res.status( HttpStatus.BAD_REQUEST ).send( error() )
    } )
}

const getJobs = ( req, res ) => {

    JobAdd.find( {} ).exec().then( data => {

        res.status( 200 ).send( success( data ) )

    } ).catch( err => {
        console.log( err )
        res.status( HttpStatus.BAD_REQUEST ).send( error() )
    } )
}

const postJobs = ( req, res ) => {

    var jobAdd = new JobAdd( req.body )

    jobAdd.save().then( (resp, resp1) => {

        jobAdd.id =resp.id

        res.status( HttpStatus.OK ).send( success(jobAdd) )

    } ).catch( err => {
        console.log( err )
        res.status( HttpStatus.BAD_REQUEST ).send( error() )
    } )
}
export default { getJobs, postJobs }