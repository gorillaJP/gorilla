import mongoose from "mongoose";
import config from "config";

const connection = new Promise((resolve, reject) => {
  mongoose.connect(config.mongourl, { useNewUrlParser: true });
  //    mongoose.set('debug', true);
  var db = mongoose.connection;

  //db connection fails. This is just to endure, the DB connection is up at the appliaiton startup
  db.on("error", err => {
    console.log(err);
    reject(err);
  });

  //successful connect to mongo
  db.once("open", () => {
    console.log("success");
    resolve(mongoose);
  });
});

export default connection;
