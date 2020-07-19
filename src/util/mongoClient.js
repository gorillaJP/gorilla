import mongoose from "mongoose";
import config from "config";

const connection = new Promise((resolve, reject) => {
  mongoose.connect(config.mongourl, {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectInterval: 10000,
  });
  //    mongoose.set('debug', true);
  var db = mongoose.connection;

  //successful connect to mongo
  db.once("open", () => {
    console.log("success");
    resolve(mongoose);
  });

  db.on("connecting", function () {
    console.log("connecting to MongoDB...");
  });

  //db connection fails. This is just to endure, the DB connection is up at the appliaiton startup
  db.on("error", function (error) {
    console.error("Error in MongoDb connection: " + error);
    mongoose.disconnect();
  });

  db.on("connected", function () {
    console.log("MongoDB connected!");
  });
  db.once("open", function () {
    console.log("MongoDB connection opened!");
  });
  db.on("reconnected", function () {
    console.log("MongoDB reconnected!");
  });
  /*
  db.on("disconnected", function () {
    console.log("MongoDB disconnected!");
    setTimeout(() => {
      mongoose.connect(config.mongourl, { server: { auto_reconnect: true } });
    }, 10000);
  });
  */
});

export default connection;
