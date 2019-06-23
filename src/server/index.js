import path from 'path'
import express from "express"
import router from './router'
import bodyParser from 'body-parser'
import { logFilter } from './filters/filter'
const fs = require( 'fs' );
var http = require( 'http' );
var https = require( 'https' )


/* certificate */

const hskey = fs.readFileSync( './src/server/keys/server.key', 'utf8' )

const hscert = fs.readFileSync( './src/server/keys/server.cert', 'utf8' )

const options = {
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

https.createServer( options, app ).listen( 443 );
console.log( 'HTTPS Server listening on %s:%s', 'HOST', 443 );