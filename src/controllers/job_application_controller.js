import * as HttpStatus from "http-status-codes";
import { mongooseErrorToRes } from "../models/MongoUtil";
import _ from "lodash";
import logger from "../util/logger";
import JobApplication from "../models/JobApplication";
import JobAdd from "../models/JobAdd";
import { success, error } from "../util/constants";

/**
 * get called when a candidate click on apply or eazy apply buttons of a job
 */

const candidate_apply_for_a_job = (req, res) => {
  //fetch the jobAdd
  JobAdd.findById(req.body.jobId)
    .lean()
    .then((jobAdd) => {
      const applicationIn = req.body;
      applicationIn.jobAdd = jobAdd;
      applicationIn.jobAdd.hasApplied = true;
      applicationIn.jobAdd.jobId = req.body.jobId;

      var jobApplication = new JobApplication(applicationIn);

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
    })
    .catch((err) => {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send(error(mongooseErrorToRes("", err)));
    });

  //copy values from jobAdd to jobapplication
};

const get_jobs_applied_by_candidate = (req, res) => {
  console.log(req.body.email);
  JobApplication.find({ email: req.body.email }).then((candidateDB) => {
    res.send(success(candidateDB));
  });
};

const get_jobs_applied_by_candidate_job_add = (req, res) => {
  console.log(req.body.email);
  JobApplication.find({ email: req.body.email }).then((candidateDB) => {
    const jobAdds = candidateDB.map((rec) => {
      return rec.jobAdd;
    });
    res.send(success(jobAdds));
  });
};

export default {
  candidate_apply_for_a_job,
  get_jobs_applied_by_candidate,
  get_jobs_applied_by_candidate_job_add,
};
