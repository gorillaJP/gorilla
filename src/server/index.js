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


//create instance
const app = express();

app.get( '*.js', function ( req, res, next ) {
    req.url = req.url + '.gz';
    res.set( 'Content-Encoding', 'gzip' );
    res.set( 'Content-Type', 'text/javascript' );
    next();
} );

const htmlPath = path.join( __dirname, 'public' );

app.use( bodyParser.json() );


app.disable( 'etag' );
app.use( express.static( htmlPath ) ) //static route

app.use( '/api', logFilter )


//app.use(frontFilter) //frontFilter
app.use( '/health', ( req, res ) => { res.send( { status: "OK" } ) } ) //directing to global router(dispatcher)

app.use( '/api', router )

https.createServer( options, app ).listen( 443 );
console.log( 'HTTPS Server listening on %s:%s', 'HOST', 443 );