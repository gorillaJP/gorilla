const express = require("express");
import CandidateProfile from "../models/CandidateProfile";
import HttpStatus from "http-status-codes";

const router = express.Router();

const jwt = require("jsonwebtoken");
const passport = require("passport");

const login =
  ("/login",
  (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(204).json({
          message: info ? info.message : "Login failed",
          user: user,
        });
      }

      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }
        delete user.password;
        delete user.username;

        const token = jwt.sign(user, "your_jwt_secret"); //this sign is just to ensure the content has not been chnage. but it dows not do any encription

        return res.json({ token, user });
      });
    })(req, res, next);
  });

//passport.authenticate("google",  { here in the first passport.authnticate => the request will  go to google to get the token
/*
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/plus.login",
      ,
      "https://www.googleapis.com/auth/plus.profile.emails.read",
    ],
  })
);
*/
const authGoogle = passport.authenticate("google", {
  /*
  scope: [
    "https://www.googleapis.com/auth/plus.login",
    ,
    "https://www.googleapis.com/auth/plus.profile.emails.read",
  ],
  */
  scope: ["profile", "email"],
});

//passport.authenticate("google",  here, the token is already in scope => so app will go to google to get the profile information
const authGoogleCallBack = passport.authenticate("google", {
  successRedirect: "/api/auth/google/success",
  failureRedirect: "/api/auth/google/failure",
});

const loginWithToken = (req, res) => {
  //validate the request to see if the JWT token is proper

  console.log(req.headers.authorization);
  if (!req.headers.authorization || req.headers.authorization.split(" ") < 2) {
    res.send(HttpStatus.BAD_REQUEST);
    return;
  }

  CandidateProfile.findOne({ email: req.body.email }).then((candidateDB) => {
    res.json({
      token: req.headers.authorization.split(" ")[1],
      user: candidateDB,
    }); //here the req.user is set by the auth filter ( read from the token itself)
  });
};

export default { login, authGoogle, authGoogleCallBack, loginWithToken };
