import mongoose from 'mongoose'
import { mongo } from '../config'


const connection = new Promise( ( resolve, reject ) => {

    mongoose.connect( mongo.url, { useNewUrlParser: true } )

    var db = mongoose.connection;

    //db connection fails
    db.on( 'error', ( err ) => {
        console.log( err )
        reject( err )
    } );

    //successful connect to mongo
    db.once( 'open', () => {
        console.log( 'success' )
        resolve( mongoose )
    } );

} )



export default connection