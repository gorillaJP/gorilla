import express from "express";
const jwt = require("jsonwebtoken");
import requestId from "express-request-id";
import auth_controller from "./controllers/auth_controller";
import company_profile_controller from "./controllers/company_profile_controller";
import employer_profile_controller from "./controllers/employer_profile_controller";
import candidate_profile_controller from "./controllers/candidate_profile_controller";
import hello_controller from "./controllers/hello_controller";
import seeker_controller from "./controllers/seeker_controller";
import register_controller from "./controllers/register_controller";
import meta_controller from "./controllers/meta_controller";
import autocomplete_controller from "./controllers/autocomplete_controller";
import passport from "passport";
import { logFilter } from "./filters/filter";
import job_add_controller from "./controllers/job_add_controller";
import job_add_search_controller from "./controllers/job_add_search_controller";
import { Domain, Role } from "./filters/auth";
import { app, uiLoginRedirect } from "./config";

const router = express.Router();

const routes = [
  {
    method: "get",
    auth: false,
    path: "/hello",
    controller: hello_controller.hello,
  },
  {
    method: "get",
    auth: true,
    domain: Domain.EMPLOYER,
    roles: [],
    path: "/hellosecure",
    controller: hello_controller.helloSecure,
  },
  {
    method: "post",
    auth: false,
    path: "/login",
    controller: auth_controller.login,
  },
  {
    method: "get",
    path: "/seeker/:id",
    auth: false,
    controller: seeker_controller.getSeeker,
  },
  {
    method: "get",
    auth: false,
    path: "/exist/seeker/:prop/:value",
    controller: register_controller.isValueTaken,
  },
  {
    method: "post",
    auth: true,
    path: "/seeker",
    controller: seeker_controller.addSeeker,
  },
  {
    method: "get",
    auth: false,
    path: "/meta/:property",
    controller: meta_controller.getMeta,
  },
  {
    method: "post",
    auth: false,
    path: "/jobadds",
    controller: job_add_controller.postJobs,
  },
  {
    method: "get",
    auth: false,
    path: "/jobadds",
    controller: job_add_search_controller.getJobsPaginated,
  },
  {
    method: "get",
    auth: false,
    path: "/jobaddspaginated",
    controller: job_add_controller.getJobsPaginatedOld,
  },
  {
    method: "get",
    auth: false,
    path: "/autocomplete",
    controller: autocomplete_controller.autoComplete,
  },
  {
    method: "post",
    auth: false,
    path: "/employerprofile",
    controller: employer_profile_controller.registerEmployer,
  },
  {
    method: "get",
    auth: false,
    path: "/company",
    controller: company_profile_controller.getCompanyList,
  },
  {
    method: "post",
    auth: false,
    path: "/candidateprofile",
    controller: candidate_profile_controller.registerCandidate,
  },
  {
    method: "get",
    auth: false,
    path: "/verifycandidateemail",
    controller: candidate_profile_controller.verifyEmail,
  },
  {
    method: "get",
    auth: false,
    path: "/auth/google",
    controller: auth_controller.authGoogle,
  },
  /*
  {
    method: "get",
    auth: false,
    path: "/auth/google/callback",
    controller: auth_controller.authGoogleCallBack,
  },
  */
  {
    method: "get",
    auth: false,
    path: "/auth/google/success",
    controller: (req, res) => {
      res.send("SUCCESS LAA");
    },
  },
];

//This is an special route. with the redirect from google, route to front end URL with jwt as a qury param
router.get(
  "/auth/google/callback",
  //passport.authenticate("google", { failureRedirect: "/login" }),
  passport.authenticate("google", undefined),
  (req, res) => {
    return res
      .status(200)
      .redirect(
        app.uiAppURL +
          uiLoginRedirect +
          "?jwt=" +
          jwt.sign(req.user, "your_jwt_secret")
      );
  }
);

router.use("/", requestId());
router.use("/", logFilter);

const authFilter = passport.authenticate("jwt", { session: false }); //call JWT stratergy (this validates the token and decode it. check that on auth.js)

//domain is hoisted
//domain to which API is opend
const getDomainVerificatonFilter = (allowedDomain: Domain) => {
  //return filter functons to verify the input domain
  /** Check if the toekn has the required role to access the url */
  return (req, res, next) => {
    //if the domain in JWT payload (req.user.domain) is not the domain of this API => reject
    if (allowedDomain != req.user.domain) {
      res
        .status(401)
        .send(
          "Authorization failure. not allowed to acces this api for domain" +
            req.user.domain
        );
    } else {
      next();
    }
  };
};

//roles are hoisted. Not tested yet. Should be tested once Roles are introduced (for employer logins)
const getRoleVerificationFilter = (allowedRoles: Array<Role>) => {
  //return filter functons to verify the input roles
  /** Check if the toekn has the required role to access the url */
  return (req, res, next) => {
    //if this API expectes any roles
    if (allowedRoles && allowedRoles.length > 0) {
      if (
        //if the user does not have any roles or
        !req.user.roles ||
        //if the user does not have any allowedRoles(to which this API is open) => reject request
        !allowedRoles.some((role) => req.user.roles.include(role))
      ) {
        res
          .status(401)
          .send(
            "Authorization failure. not allowed to acces this api for roles"
          );
      } else {
        next();
      }
    } else {
      next();
    }
  };
};

/*** loading all routes
 *
 * The domain for which JWT is issued (employer or candidate), is on the JWT payload (set and decode back by JWT stratergy, written on auth.js file)
 *
 */
routes.forEach((route) => {
  console.log("adding a rout to :", route.method, route.path, route.domain);

  if (route.auth) {
    //JWT extraction
    router[route.method](route.path, authFilter); //middleware to check the JWT token and, decode JWT stratergy

    //verify the domain
    router[route.method](
      route.path,
      getDomainVerificatonFilter(route.domain) //check if the the token is issued for a use in corrrect domain (employer or candidate)
    );

    //verify method
    router[route.method](
      route.path,
      getRoleVerificationFilter(route.roles), //check if the the token is issued for a use in corrrect domain (employer or candidate)
      route.controller
    );
  }

  //non protected filters
  router[route.method](route.path, route.controller);
});

export default router;
