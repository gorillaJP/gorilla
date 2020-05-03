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

const uiLoginRedirect = "redirectToPageWhichReadsFromCookieAndWriteToStore";

const appDev = {
  rootUrl: "http://localhost:8080/",
  uiAppURL: "http://localhost:3000/",
  verifyEmailRedirect: "http://localhost:3000?login=initial",
};

const appProd = {
  rootUrl: "http://159.89.161.233:443/",
  uiAppURL: "http://159.89.161.233:3000/",
  verifyEmailRedirect: "http://159.89.161.233:3000?login=initial",
};

let app;

if (
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "localhost"
) {
  app = appDev;
} else if (process.env.NODE_ENV === "production") {
  app = appProd;
}

export { mongo, mailerConf, app, uiLoginRedirect };
