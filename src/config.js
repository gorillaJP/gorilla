//https://www.dynu.com/  .. DNSs are configured here

const mongo = {
  url: "mongodb://appadmin:appadmingorilla@206.189.133.87:27017/gorilla",
};

const mailerConf = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  user: "gorillajobslk@gmail.com", // generated ethereal user
  pass: "7890&*()", // generated ethereal password
  from: "gorillajobslk@gmail.com", // generated ethereal password
};

const uiLoginRedirect = "signinoauth2";

const appDev = {
  rootUrl: "http://localhost:8080/",
  uiAppURL: "http://localhost:3000/",
  verifyEmailRedirect: "http://localhost:3000/signin?login=initial",
};

const appProd = {
  rootUrl: "https://gorilla.lk/", //this is beause IPs are not accepted by google redirect URL
  uiAppURL: "https://gorilla.lk/",
  verifyEmailRedirect: "https://gorilla.lk/signin?login=initial",
};

let app;

if (process.env.NODE_ENV === "localhost") {
  app = appDev;
} else if (process.env.NODE_ENV === "development") {
  app = appProd;
} else if (process.env.NODE_ENV === "production") {
  app = appProd;
}

export { mongo, mailerConf, app, uiLoginRedirect };
