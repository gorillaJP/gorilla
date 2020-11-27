import * as HttpStatus from "http-status-codes";
import { mongooseErrorToRes } from "../models/MongoUtil";
import _ from "lodash";
import * as esb from "elastic-builder";
import logger from "../util/logger";
import JobAdd from "../models/JobAdd";
import JobApplication from "../models/JobApplications";
import { success, error } from "../util/constants";
import { readdir } from "fs";

/**
 * get called when a candidate click on apply or eazy apply buttons of a job
 */

const candidate_apply_for_a_job = (req, res) => {
  const jobApplication = new JobApplication(req.body);

  jobApplication
    .save()
    .then((resp) => {
      res.status(HttpStatus.OK).send(success(resp));
    })
    .catch((err) => {
      logger.error(err);
      res
        .status(HttpStatus.BAD_REQUEST)
        .send(error(mongooseErrorToRes("", err)));
    });
};

const get_jobs_applied_by_candidate = (req, res) => {
  console.log(req.body.email);
  JobApplication.find({ email: req.body.email }).then((candidateDB) => {
    res.json({
      user: candidateDB,
    }); //here the req.user is set by the auth filter ( read from the token itself)
  });
};

export default { candidate_apply_for_a_job, get_jobs_applied_by_candidate };
