/**
 * this file is called at the applicaiton start up.
 * There all authnticaton related set up happens
 */

const passport = require("passport");
const passportJWT = require("passport-jwt");
import AuthUser from "../models/AuthUser";
import Employer from "../models/EmployerProfile";
import Candidate from "../models/CandidateProfile";
var GoogleStrategy = require("passport-google-oauth2").Strategy;

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;
import { app } from "../config";

// authentication configuration file
// this is used at the time of sign in

enum Domain {
  EMPLOYER = "employer",
  CANDIDATE = "candidate",
}

//COMPANYOWNER,
//COMPANY HR,
//HR Head Etc
enum Role {}

//it comes to this method when done is called from the Google stratergy(above)
passport.serializeUser(function (user, done) {
  done(null, user.id); //first parameter is the error`. this id goes to the cookie
});

/*
//get the user back from userid
passport.deserializeUser(function (id, done) {
  console.log("HERE 2");
  console.log("fun fun funton 2");
  //find user in mongodb
  done(null, { name: "hahaa" });
});
*/

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, email, password, cb) => {
      let ProfileDomain;

      if (req.body.domain == Domain.EMPLOYER) {
        ProfileDomain = Employer;
      } else {
        ProfileDomain = Candidate;
      }
      console.log(ProfileDomain);

      return ProfileDomain.findOne({ email, password })
        .then((user) => {
          if (!user) {
            return cb(null, false, {
              message: "Incorrect email or password.",
            });
          }

          user._doc.domain = req.body.domain;

          return cb(null, user.toJSON(), {
            message: "Logged is successfully",
          });
        })
        .catch((err) => {
          console.log("here 2");
          return cb(err);
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret",
    },
    (jwtPayload, cb) => {
      return cb(null, jwtPayload); //here the decoded jwt token is appended to the request)(req.user). and subsequent filters can access it
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "716051861983-r02npcv49qrt8salc57kbechej8tmoln.apps.googleusercontent.com",
      clientSecret: "4aYCYyoxRxXv2jrdiGtySvpx",
      callbackURL: app.rootUrl + "/api/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      //      User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //return done(err, user);
      return done(null, profile);
      //      });
    }
  )
);

export { Domain, Role };
