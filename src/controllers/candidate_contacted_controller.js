import * as HttpStatus from "http-status-codes";
import { mongooseErrorToRes } from "../models/MongoUtil";
import _ from "lodash";
import logger from "../util/logger";
import CompanyProfile from "../models/CompanyProfile";
import { success, error } from "../util/constants";
import logger from "../util/logger";
import CandidateContacted from "../models/CanddidateContacted";
import CandidateProfile from "../models/CandidateProfile";
import Company from "../models/CompanyProfile";
import JobAdd from "../models/JobAdd";
import JobAdd from "../models/";
import JobApplication from "../models/JobApplication";
import JobSaved from "../models/JobSaved";

const create_contacted_candidate = (req, res) => {
  //read the job

  var candidatePromise = CandidateProfile.findById(req.body.candidateId);

  var jobAddPromise = JobAdd.findById(req.body.jobId);

  Promise.all([candidatePromise, jobAddPromise])
    .then((dtaDB) => {
      var candidateDB = dtaDB[0];
      var jobAdd = dtaDB[1];

      //create object to save to DB
      var contactedCondidateObj = req.body;

      contactedCondidateObj.jobAdd = jobAdd;

      contactedCondidateObj.candidateEmail = candidateDB.email; //comming from DB

      contactedCondidateObj.employerEmail = req.body.email; //comming from req

      var contactedCadidate = new CandidateContacted(contactedCondidateObj);

      contactedCadidate
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
};

const get_contacted_candidate = (req, res) => {
  console.log(req.body.email);

  //saved jobs
  let jobSavedsPromise = JobSaved.find({ email: req.body.email });

  //applied jobs
  let jobApplicationsPromise = JobApplication.find({ email: req.body.email });

  //contacteds
  let candidateContactedsPromise = CandidateContacted.find({
    candidateEmail: req.body.email,
  });

  Promise.all([
    jobSavedsPromise,
    jobApplicationsPromise,
    candidateContactedsPromise,
  ])
    .then((mongoDBResp) => {
      var jobSaveds = mongoDBResp[0];
      var jobAppliactions = mongoDBResp[1];
      var candidateContacteds = mongoDBResp[2];

      console.log(candidateContacteds.length);
      console.log(jobAppliactions);

      //iterat all the candidateContacteds
      candidateContacteds = candidateContacteds.map((rec) => {
        //check if the candidate has already applied to this job
        var matchingJobApplication = jobAppliactions.find((jobApplication) => {
          return (
            jobApplication.jobAdd &&
            rec.jobAdd &&
            jobApplication.jobAdd._id == rec.jobAdd._id
          );
        });
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
        return rec;
      });
      res.status(HttpStatus.OK).send(candidateContacteds);
    })
    .catch((err) => {
      logger.error(err);
      res
        .status(HttpStatus.BAD_REQUEST)
        .send(error(mongooseErrorToRes("", err)));
    });

  /*
  CandidateContacted.find({ candidateEmail: req.body.email })
    //CandidateContacted.find({})
    .then((dta) => {
      res.status(HttpStatus.OK).send(dta);
    })
    .catch((err) => {
      logger.error(err);
      res
        .status(HttpStatus.BAD_REQUEST)
        .send(error(mongooseErrorToRes("", err)));
    });
    */
};

/*
  JobAdd.findById(req.body.jobId)
    .then((jobAdd) => {
      const contactedCadidate = {};
      contactedCadidate.jobAdd = jobAdd;
      contactedCadidate.employerEmail = req.body.email;
      contactedCadidate.candidateEmail = saveJobIn.jobAdd = jobAdd;
      saveJobIn.jobAdd.hasSaved = true;
      saveJobIn.jobAdd.jobId = req.body.jobId;
      const CanddidateContacted = new CandidateContacted(jobAdd);
      jobSaved
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
      console.log(err);
    });
};
*/

/*
  JobAdd.findById(req.body.jobId)
    .lean()
    .then((jobAdd) => {
      const saveJobIn = req.body;
      saveJobIn.jobAdd = jobAdd;
      saveJobIn.jobAdd.hasSaved = true;
      saveJobIn.jobAdd.jobId = req.body.jobId;

      const jobSaved = new JobSaved(saveJobIn);
      jobSaved
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
*/

/*
const get_candidate_contacted = (req, res) => {
  console.log(req.body.email);
  CandidateContacted.find({ email: req.body.email }).then((candidateDB) => {
    res.send(success(candidateDB));
  });
};
*/

/*
const get_jobs_saved_by_candidate_jobadd = (req, res) => {
  JobSaved.find({ email: req.body.email }).then((candidateDB) => {
    const jobAdds = candidateDB.map((rec) => {
      return rec.jobAdd;
    });

    res.send(success(jobAdds));
  });
};
*/
/*
const get_candidate_contacted_company = (req, res) => {
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

*/

export default {
  create_contacted_candidate,
  get_contacted_candidate,
};
