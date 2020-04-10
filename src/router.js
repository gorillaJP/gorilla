import express from "express";
import requestId from "express-request-id";
import auth_controller from "./controllers/auth_controller";
import company_profile_controller from "./controllers/company_profile_controller";
import employer_profile_controller from "./controllers/employer_profile_controller";
import candidate_profile_controller from "./controllers/candidate_profile_controller";
import seeker_controller from "./controllers/seeker_controller";
import register_controller from "./controllers/register_controller";
import meta_controller from "./controllers/meta_controller";
import autocomplete_controller from "./controllers/autocomplete_controller";
import passport from "passport";
import { logFilter } from "./filters/filter";
import job_add_controller from "./controllers/job_add_controller";
import job_add_search_controller from "./controllers/job_add_search_controller";

const router = express.Router();

const routes = [
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
];

router.use("/", requestId());
router.use("/", logFilter);

const authFilter = passport.authenticate("jwt", { session: false });

/*** loading all routes */
routes.forEach((route) => {
  console.log("adding a rout to ", route.method, route.path);

  if (route.auth) {
    router[route.method](route.path, authFilter, route.controller);
  }

  router[route.method](route.path, route.controller);
});

export default router;
