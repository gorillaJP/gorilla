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
import fileupload_controller from "./controllers/filupload_controller";
import matrix_controller from "./controllers/matrixe_controller";
import passport from "passport";
import { logFilter } from "./filters/filter";
import job_add_controller from "./controllers/job_add_controller";
import job_add_search_controller from "./controllers/job_add_search_controller";
import job_application_controller from "./controllers/job_application_controller";
import job_summary_controller from "./controllers/job_add_sumary_controller";
import { Domain, Role } from "./filters/auth";
import { app, uiLoginRedirect } from "./config";
import Candidate from "./models/CandidateProfile";

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
    method: "get",
    auth: true,
    domain: [Domain.CANDIDATE, Domain.EMPLOYER],
    path: "/logout",
    controller: auth_controller.logout,
  },
  {
    method: "post",
    auth: false,
    path: "/login",
    controller: auth_controller.login,
  },
  {
    method: "get",
    auth: true,
    path: "/candidate/profile",
    controller: candidate_profile_controller.candidateprofile,
    domain: Domain.CANDIDATE,
  },
  {
    method: "get",
    auth: true,
    path: "/loginwithtoken",
    controller: auth_controller.loginWithToken,
    description:
      "once the token is know, this API return user object and token, same way how they are return just after login",
    domain: Domain.CANDIDATE,
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
    path: "/jobsummary/industry",
    controller: job_summary_controller.sumaryByIndustry,
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
    method: "get",
    auth: false,
    path: "/matrix/tophiringcompanies",
    controller: matrix_controller.topHieringCompanies,
  },
  {
    method: "get",
    auth: false,
    path: "/matrix/industry",
    controller: matrix_controller.industry,
  },
  {
    method: "get",
    auth: false,
    path: "/matrix/category",
    controller: matrix_controller.category,
  },
  {
    method: "post",
    auth: false,
    path: "/candidate/profile",
    domain: Domain.CANDIDATE,
    controller: candidate_profile_controller.createCandidate,
  },
  /*
  {
    method: "get",
    auth: true,
    path: "/candidate/education/:email",
    domain: Domain.CANDIDATE,
    controller: candidate_profile_controller.getCandidateEducation,
  },
  */
  {
    method: "post",
    auth: true,
    path: "/candidate/:property",
    domain: Domain.CANDIDATE,
    controller: candidate_profile_controller.createOnProfile,
  },
  {
    method: "delete",
    auth: true,
    path: "/candidate/:property/:id",
    domain: Domain.CANDIDATE,
    controller: candidate_profile_controller.deleteOnProfile,
  },
  /*
  {
    method: "get",
    auth: true,
    path: "/candidate/experience/:email",
    domain: Domain.CANDIDATE,
    controller: candidate_profile_controller.getCandidateExperience,
  },
  {
    method: "post",
    auth: true,
    path: "/candidate/experience",
    domain: Domain.CANDIDATE,
    controller: candidate_profile_controller.createCandidateExperience,
  },
  {
    method: "delete",
    auth: true,
    path: "/candidate/experience/:id",
    domain: Domain.CANDIDATE,
    controller: candidate_profile_controller.deleteCandidateExperience,
  },
  */
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
  {
    method: "post",
    auth: false,
    path: "/file",
    controller: fileupload_controller.fileUpload,
  },
  {
    method: "post",
    auth: false,
    path: "/file/:category", //catagory can be image/resume
    controller: fileupload_controller.fileUpload,
  },
  {
    method: "get",
    auth: false,
    path: "/auth/google/success",
    controller: (req, res) => {
      res.send("SUCCESS LAA");
    },
  },
  //apply for job
  {
    method: "get",
    domain: [Domain.CANDIDATE],
    auth: true,
    path: "/application",
    controller: job_application_controller.get_jobs_applied_by_candidate,
  },
  {
    method: "post",
    domain: [Domain.CANDIDATE],
    auth: true,
    path: "/application",
    controller: job_application_controller.candidate_apply_for_a_job,
  },
];

//This is an special route. with the redirect from google, route to front end URL with jwt as a qury param
router.get(
  "/auth/google/callback",
  //passport.authenticate("google", { failureRedirect: "/login" }),
  passport.authenticate("google", undefined),
  (req, res) => {
    return res.redirect(
      app.uiAppURL +
        uiLoginRedirect +
        "?jwt=" +
        jwt.sign(
          { email: req.user.email, domain: req.user.domain },
          "your_jwt_secret"
        )
    );
  }
);

router.use("/", requestId());
router.use("/", logFilter);

const authFilter = passport.authenticate("jwt", { session: false }); //call JWT stratergy (this validates the token and decode it. check that on auth.js)

//domain is hoisted
//domain to which API is opend
const getDomainVerificatonFilter = (allowedDomain) => {
  //return filter functons to verify the input domain
  /** Check if the toekn has the required role to access the url */
  return (req, res, next) => {
    //if the domain in JWT payload (req.user.domain) is not the domain of this API => reject

    if (
      (Array.isArray(allowedDomain) &&
        allowedDomain.includes(req.user.domain)) ||
      allowedDomain == req.user.domain
    ) {
      next();
    } else {
      res
        .status(401)
        .send(
          "Authorization failure. not allowed to acces this api for domain" +
            req.user.domain
        );
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
    router[route.method](route.path, authFilter); //middleware to check the JWT token and, decode JWT stratergy. this filter append req.user from decoded jwt

    //the email in the request body is not trusted => becaue of that => replace it with what is found from JWT token
    router[route.method](route.path, (req, res, next) => {
      req.body.email = req.user.email; //
      console.log("^^^");
      console.log(req.body);
      console.log("^^^");
      next();
    }); //middleware to check the JWT token and, decode JWT stratergy

    //verify the domain
    router[route.method](
      route.path,
      getDomainVerificatonFilter(route.domain) //check if the the token is issued for a use in corrrect domain (employer or candidate)
    );

    //verify method
    router[route.method](
      route.path,
      getRoleVerificationFilter(route.roles), //check if the the loggin user has the reqired dole ( authorizention)
      route.controller
    );
  }

  //non protected filters
  router[route.method](route.path, route.controller);
});

export default router;
