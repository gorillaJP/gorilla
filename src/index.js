import config from "config";
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
/* certificate */
const hskey = fs.readFileSync("./src/keys/server.key", "utf8");

const hscert = fs.readFileSync("./src/keys/server.cert", "utf8");

const options = {
  key: hskey,
  cert: hscert,
};

//create instance
const app = express();
app.use(cors());
app.use(compression());
app.use(express.static("public/files"));

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
  //    https.createServer(options, app).listen(443)
  http.createServer(app).listen(443);
  http.globalAgent.keepAlive = true;
  //https.globalAgent.keepAlive = true;

  console.log("HTTPS Server listening on %s:%s", "HOST", 443);
} else {
  http.createServer(app).listen(8080);
  http.globalAgent.keepAlive = true;
  console.log("HTTPS Server listening on %s:%s", "HOST", 8080);
}

http
  .createServer(function (req, res) {
    if (req.url == "/fileupload") {
      var form = new formidable.IncomingForm({
        uploadDir: "/users/dimuthusenanayaka/workspace/gorilla/public/files",
      });
      form.parse(req, function (err, fields, files) {
        res.write("File uploaded");
        res.end();
      });
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(
        '<form action="fileupload" method="post" enctype="multipart/form-data">'
      );
      res.write('<input type="file" name="filetoupload"><br>');
      res.write('<input type="submit">');
      res.write("</form>");
      return res.end();
    }
  })
  .listen(8081);
