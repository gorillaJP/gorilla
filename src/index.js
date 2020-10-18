import { app as appConf } from "./config";
import path from "path";
import formidable from "formidable";
import express from "express";
import cors from "cors";
import router from "./router";
import bodyParser from "body-parser";
import "./filters/auth";
import favicon from "serve-favicon";
import compression from "compression";
import passport from "passport";
require("./initresources");

const fs = require("fs");
var http = require("http");
var https = require("https");

/* certificate 
const hskey = fs.readFileSync("./src/keys/server.key", "utf8");
const hscert = fs.readFileSync("./src/keys/server.cert", "utf8");
*/

//create instance
const app = express();
app.use(cors());
app.use(compression());
app.use(express.static(appConf.uploadDir));

/*
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["asfwoeuroweurowrpweipuriquwqerqwereruwoeir"],
    name: "session",
  })
);
*/

app.use(passport.initialize());
//app.use(passport.session());

//enable gzip for prod env

console.log("process.env.NODE_ENV : " + process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  app.get("*.js", function (req, res, next) {
    req.url = req.url + ".gz";
    res.set("Content-Encoding", "gzip");
    res.set("Content-Type", "text/javascript");
    next();
  });
}

app.use(bodyParser.json());

app.disable("etag");

app.use("/api", router);

//app.use(frontFilter) //frontFilter
app.use("/health", (req, res) => {
  res.send({ status: "OK" });
}); //directing to global router(dispatcher)

//app.use( '/api', router )
if (process.env.NODE_ENV === "production") {
  const hskey = fs.readFileSync(
    "/apps/certs/gorilla.lk/gorilla_lk_key.key",
    "utf8"
  );
  const hscert = fs.readFileSync(
    "/apps/certs/gorilla.lk/gorilla.lk.crt",
    "utf8"
  );

  const ca = fs.readFileSync(
    "/apps/certs/gorilla.lk/gorilla_lk.ca-bundle",
    "utf8"
  );

  const options = {
    key: hskey,
    cert: hscert,
    ca: ca,
  };
  https.createServer(options, app).listen(444);
  //  http.createServer(app).listen(443);
  // http.globalAgent.keepAlive = true;
  https.globalAgent.keepAlive = true;

  console.log("HTTPS Server listening on %s:%s", "HOST", 444);
} else {
  http.createServer(app).listen(8080);
  http.globalAgent.keepAlive = true;
  console.log("HTTPS Server listening on %s:%s", "HOST", 8080);
}
