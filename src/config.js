const mongo = {
  url: "mongodb://appadmin:appadmingorilla@206.189.133.87:27017/gorilla",
};

const mailerConf = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  user: "gorillajobslk@gmail.com", // generated ethereal user
  pass: "1234!@#$", // generated ethereal password
  from: "gorillajobslk@gmail.com", // generated ethereal password
};

const appDev = {
  rootUrl: "http://localhost:8080/",
  verifyEmailRedirect: "http://localhost:3000/",
};

const appProd = {
  rootUrl: "http://159.89.161.233:443/",
  verifyEmailRedirect: "http://159.89.161.233:3000/",
};

let app;

if (process.env.NODE_ENV === "development") {
  app = appDev;
} else if (process.env.NODE_ENV === "production") {
  app = appProd;
}

export { mongo, mailerConf, app };
