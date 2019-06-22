import path from 'path'
import express from "express"
import router from './router'
import bodyParser from 'body-parser'
import { logFilter } from './filters/filter'
//import router from './router'
//import frontFilter from './middleware/frontFilter'
//import startUps from './utils/startUps'

/**
 * 
 * At production webpack copy frontend build to 'server > public' folder.
 * At dev mode -> front, back ends runs on their own ports(3000, 8080)
 * 
 */
const htmlPath = path.join( __dirname, '../client' );

//create instance
const app = express();

app.use( bodyParser.json() );


app.disable( 'etag' );
app.use( express.static( htmlPath ) ) //static route


app.use( '/api', logFilter )


//app.use(frontFilter) //frontFilter
app.use( '/health', ( req, res ) => { res.send( { status: "OK" } ) } ) //directing to global router(dispatcher)

app.use( '/api', router )

//listen oon 8080
app.listen( 8080, () => console.log( "Listening onn portt 8080    !" ) );
