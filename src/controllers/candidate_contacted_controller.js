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

const create_contacted_candidate = (req, res) => {
  //read the job

  var candidatePromise = CandidateProfile.findById(req.body.candidateId);

  var jobAddPromise = JobAdd.findById(req.body.jobId);

  Promise.all([candidatePromise, jobAddPromise])
    .then((dtaDB) => {
      var candidateDB = dtaDB[0];
      var jobAdd = dtaDB[1];

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

      res.send(contactedCadidate);
    })
    .catch((err) => {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send(error(mongooseErrorToRes("", err)));
    });
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
};
