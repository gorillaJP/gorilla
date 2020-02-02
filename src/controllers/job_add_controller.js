
import HttpStatus from 'http-status-codes'

import JobAdd from '../models/JobAdd'
import { success, error } from '../util/constants'

const maxNumberOfResults = 100 //max number of results to return in one api call

const getJobById = ( req, res ) => {

    JobAdd.findById( req.params.id ).exec().then( data => {

        res.status( 200 ).send( success( data ) )

    } ).catch( err => {
        console.log( err )
        res.status( HttpStatus.BAD_REQUEST ).send( error() )
    } )
}


const getJobsPaginated = ( req, res ) => {

    let offset= Math.max(req.query.offset , 0)
    let limit =  Math.max(maxNumberOfResults, req.query.limit)

    offset = 0
    limit = 2000

    JobAdd.aggregate( [
  { "$facet": {
    "data": [
      { "$match": formQueryObjec(req.query)},
      { "$skip": offset },
      { "$limit": limit }
    ],
    "meta": [
      { "$group": {
        "_id": null,
        "count": { "$sum": 1 }
      }}
    ]
  }}

    ]).then( data => {

        res.status( 200 ).send( success( data ) )

    } ).catch( err =>   {
        console.log( err )
        res.status( HttpStatus.BAD_REQUEST ).send( error() )
    } )
}


const getJobs = ( req, res ) => {

    const offset= Math.max(req.query.offset , 0)
    const limit =  Math.max(maxNumberOfResults, req.query.limit)

    JobAdd.find(formQueryObjec(req.query)).skip(offset).limit(limit).exec().then( data => {

        res.status( 200 ).send( success( data ) )

    } ).catch( err =>   {
        console.log( err )
        res.status( HttpStatus.BAD_REQUEST ).send( error() )
    } )
}

/**
 * remove offset and limit 
 * 
 * create query : AND of like queries
 * 
 */
const formQueryObjec = ( queryObject )=>{ 

    if ( queryObject ) { 
        delete queryObject.offset
        delete queryObject.limit
    }

    //skip skills since it is an array
    for (var key in queryObject) {

        if ( key == 'skills' ) {
            queryObject[ key ] = { $elemMatch: { $regex :  '.*' + queryObject[key], $options: "i"}}  
        }
        else { 
            queryObject[key] =  {$regex: ".*"+queryObject[key], $options:"i"}
        }

    }
    console.log(queryObject)
    return queryObject
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
export default { getJobs, postJobs , getJobsPaginated}