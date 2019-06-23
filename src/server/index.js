import path from 'path'
import express from "express"
import router from './router'
import bodyParser from 'body-parser'
import { logFilter } from './filters/filter'
const fs = require( 'fs' );
var http = require( 'http' );
var https = require( 'https' )


var hskey = fs.readFileSync( './src/server/keys/server.key', 'utf8' )

console.log( hskey )

var hscert = fs.readFileSync( './src/server/keys/server.cert', 'utf8' )

console.log( hscert )


var options = {
    key: hskey,
    cert: hscert
};



const htmlPath = path.join( __dirname, 'public' );

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
//app.listen( 8080, () => console.log( "Listening onn portt 8080    !" ) );


var server = https.createServer( options, app ).listen( 8080 );
console.log( 'HTTPS Server listening on %s:%s', 'HOST', 8080 );