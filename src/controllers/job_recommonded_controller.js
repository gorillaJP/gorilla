import * as HttpStatus from "http-status-codes";
import { mongooseErrorToRes } from "../models/MongoUtil";
import _ from "lodash";
import logger from "../util/logger";
import JobRecommended from "../models/JobRecommended";
import JobSaved from "../models/JobSaved";
import JobApplication from "../models/JobApplication";
import JobAdd from "../models/JobAdd";
import JobApplication from "../models/JobApplication";
import JobSaved from "../models/JobSaved";
import { success, error } from "../util/constants";

/**
 * get called when a candidate click on apply or eazy apply buttons of a job
 */

const create_job_recommonded = (req, res) => {
  //read the jobadd first
  JobAdd.findById(req.body.jobId)
    .lean()
    .then((jobAdd) => {
      const jobRecommendedIn = req.body;
      jobRecommendedIn.jobAdd = jobAdd;

      jobRecommendedIn.jobAdd.jobId = req.body.jobId;

      const jobRecommendedSaved = new JobRecommended(jobRecommendedIn);
      jobRecommendedSaved
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
      logger.error(err);
      res
        .status(HttpStatus.BAD_REQUEST)
        .send(error(mongooseErrorToRes("", err)));
    });
};

const get_jobsRecommended_by_candidate = (req, res) => {
  //job Recommonded
  let jobRecommendedPromise = JobRecommended.find({
    candidateEmail: req.body.email,
  });

  //saved jobs
  let jobSavedsPromise = JobSaved.find({ email: req.body.email });

  //applied jobs
  let jobApplicationsPromise = JobApplication.find({ email: req.body.email });

  Promise.all([
    jobSavedsPromise,
    jobApplicationsPromise,
    jobRecommendedPromise,
  ]).then((mongoDBResp) => {
    var jobSaveds = mongoDBResp[0];
    var jobAppliactions = mongoDBResp[1];
    var jobsRecommonded = mongoDBResp[2];

    jobsRecommonded = jobsRecommonded
      .map((rec) => {
        //iterat all the jobsRecommonded
        jobsRecommonded = jobsRecommonded.map((rec) => {
          //check if the candidate has already applied to this job
          var matchingJobApplication = jobAppliactions.find(
            (jobApplication) => {
              return (
                jobApplication.jobAdd &&
                rec.jobAdd &&
                jobApplication.jobAdd._id == rec.jobAdd._id
              );
            }
          );
          rec.jobAdd.hasApplied = matchingJobApplication ? true : false;

          //check if the candidate has already saved this job
          var matchingSavedJob = jobSaveds.find((jobSaved) => {
            return (
              jobSaved.jobAdd &&
              rec.jobAdd &&
              jobSaved.jobAdd._id == rec.jobAdd._id
            );
          });

          rec.jobAdd.hasSaved = matchingSavedJob ? true : false;

          return rec.jobAdd;
        });
        res.send(jobsRecommonded);
      })
      .catch((err) => {
        logger.error(err);
        res
          .status(HttpStatus.BAD_REQUEST)
          .send(error(mongooseErrorToRes("", err)));
      });
  });
};
/*
const get_jobs_jobadd = (req, res) => {
  let jobSavedsPromise = JobSaved.find({ email: req.body.email });

  let jobApplicationsPromise = JobApplication.find({ email: req.body.email });

  Promise.all([jobSavedsPromise, jobApplicationsPromise])
    .then((vals) => {
      let jobSaves = vals[0];
      let jobApplications = vals[1];

      const apiResp = jobSaves.map((rec) => {
        //chec if the applied job is available in savedJob list
        var matchingJobApplication = jobApplications.find((jobApplication) => {
          return (
            jobApplication.jobAdd &&
            rec.jobAdd &&
            jobApplication.jobAdd._id == rec.jobAdd._id
          );
        });

        rec.jobAdd.hasApplied = matchingJobApplication ? true : false;

        return rec.jobAdd;
      });

      res.send(success(apiResp));
    })
    .catch((err) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};
const delete_jobs_saved_by_candidate = (req, res) => {
  const idToRemove = req.params.id;

  JobSaved.deleteMany({
    "jobAdd._id": idToRemove,
    email: req.body.email,
  }).then((x) => {
    res.status(HttpStatus.OK).send();
  });
};
*/

export default {
  /*
  get_jobs_saved_by_candidate,
  get_jobs_saved_by_candidate_jobadd,
  create_job_recommonded,
  delete_jobs_saved_by_candidate,
  */
  create_job_recommonded,
  get_jobsRecommended_by_candidate,
};
