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

export { mongo, mailerConf };
