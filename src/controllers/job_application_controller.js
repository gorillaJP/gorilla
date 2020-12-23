import * as HttpStatus from "http-status-codes";
import { mongooseErrorToRes } from "../models/MongoUtil";
import _ from "lodash";
import logger from "../util/logger";
import JobApplication from "../models/JobApplication";
import JobSaved from "../models/JobSaved";
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
  //jobApplications = JobApplication.find({ email: req.body.email });
  let jobSavedsPromise = JobSaved.find({ email: req.body.email });

  let jobApplicationsPromise = JobApplication.find({ email: req.body.email });

  Promise.all([jobSavedsPromise, jobApplicationsPromise])
    .then((vals) => {
      let jobSaves = vals[0];
      let jobApplications = vals[1];

      const apiResp = jobApplications.map((rec) => {
        //chec if the applied job is available in savedJob list
        var matchingJobSave = jobSaves.find((jobSave) => {
          return (
            jobSave.jobAdd && rec.jobAdd && jobSave.jobAdd._id == rec.jobAdd._id
          );
        });

        rec.jobAdd.hasSaved = matchingJobSave ? true : false;

        return rec.jobAdd;
      });

      res.send(success(apiResp));
    })
    .catch((err) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

export default {
  candidate_apply_for_a_job,
  get_jobs_applied_by_candidate,
  get_jobs_applied_by_candidate_job_add,
};
