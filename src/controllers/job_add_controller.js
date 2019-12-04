
import JobAdd from '../models/JobAdd'
import { success, error } from '../util/constants'


const getJobs = ( req, res ) => {

    JobAdd.find( {} ).exec().then( data => {

        res.status( 200 ).send( success( data ) )

    } ).catch( err => {
        console.log( err )
        res.status( HttpStatus.BAD_REQUEST ).send( error() )

    } )

}


export default { getJobs }