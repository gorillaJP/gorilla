
import Meta from '../models/Meta'
import { success, error } from '../util/constants'



const getMeta = ( req, res ) => {

    Meta.findOne( { "property": req.params.property } ).exec().then( data => {

        res.status( 200 ).send( success( data ) )

    } ).catch( err => {
        console.log( err )
        res.status( HttpStatus.BAD_REQUEST ).send( error() )

    } )

}


export default { getMeta }