import config from 'config';
import path from 'path'
import express from "express"
import cors from 'cors'
import router from './router'
import bodyParser from 'body-parser'
import auth from './filters/auth'
import favicon from 'serve-favicon'

const fs = require('fs');
var http = require('http');
var https = require('https')
/* certificate */
const hskey = fs.readFileSync('./src/keys/server.key', 'utf8')

const hscert = fs.readFileSync('./src/keys/server.cert', 'utf8')

const options = {
    key: hskey,
    cert: hscert
};

//create instance
const app = express();
app.use(cors())


//enable gzip for prod env

console.log('process.env.NODE_ENV : ' + process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
    app.get('*.js', function (req, res, next) {
        req.url = req.url + '.gz';
        res.set('Content-Encoding', 'gzip');
        res.set('Content-Type', 'text/javascript');
        next();
    });
}

app.use(bodyParser.json());

app.disable('etag');

app.use('/api', router)

//app.use(frontFilter) //frontFilter
app.use('/health', (req, res) => { res.send({ status: "OK" }) }) //directing to global router(dispatcher)

//app.use( '/api', router )
if (process.env.NODE_ENV === 'production') {
    https.createServer(options, app).listen(443)
    https.globalAgent.keepAlive = true;

    console.log('HTTPS Server listening on %s:%s', 'HOST', 443)
}
else {
    http.createServer(app).listen(8080)
    http.globalAgent.keepAlive = true;
    console.log('HTTPS Server listening on %s:%s', 'HOST', 8080)
}