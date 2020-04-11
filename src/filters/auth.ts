/**
 * this file is called at the applicaiton start up.
 * There all authnticaton related set up happens
 */

const passport = require("passport");
const passportJWT = require("passport-jwt");
import AuthUser from "../models/AuthUser";
import Employer from "../models/EmployerProfile";
import Candidate from "../models/CandidateProfile";

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;

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

export { Domain, Role };
