import Meta from '../models/Meta'
import MetaCities from '../models/Meta_cities'
import MetaSectors from '../models/Meta_sector'
import { success, error } from '../util/constants'

const getMeta = ( req, res ) => {

    let property = req.params.property

    let regEx = getSearchRegEx(req.query.q)

    getCollection(property).distinct( "name",   {"name" : regEx} ).exec().then( data => {

        res.status( 200 ).send( success( data ) )

    } ).catch( err => {
        console.log( err )
        res.status( HttpStatus.BAD_REQUEST ).send( error() )
    } )
}


/**
 * Get the RegEx search object as per the query
 */
const getSearchRegEx = ( query ) => {

    let regExString= ".*" + query + ".*"

    return  new RegExp(regExString, "i");
}


/**
 * Get the collection to be searched as per the property  
 */
const getCollection = ( name ) => {

    console.log(name)
    if ( name === "allcities" ) { 
        return MetaCities
    }
    if ( name === "allsectors" ) { 
        return MetaSectors
    }

 }

export default { getMeta }