import * as HttpStatus from "http-status-codes";
import { mongooseErrorToRes } from "../models/MongoUtil";
import _ from "lodash";
import logger from "../util/logger";
import JobSaved from "../models/JobSaved";
import JobAdd from "../models/JobAdd";
import { success, error } from "../util/constants";

/**
 * get called when a candidate click on apply or eazy apply buttons of a job
 */

const candidate_apply_for_a_job = (req, res) => {
  //read the jobadd first
  JobAdd.findById(req.body.jobId)
    .lean()
    .then((jobAdd) => {
      const saveJobIn = req.body;
      saveJobIn.jobAdd = jobAdd;
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

const get_jobs_saved_by_candidate = (req, res) => {
  console.log(req.body.email);
  JobSaved.find({ email: req.body.email }).then((candidateDB) => {
    res.send(success(candidateDB));
  });
};

const get_jobs_saved_by_candidate_jobadd = (req, res) => {
  JobSaved.find({ email: req.body.email }).then((candidateDB) => {
    const jobAdds = candidateDB.map((rec) => {
      return rec.jobAdd;
    });

    res.send(success(jobAdds));
  });
};

const delete_jobs_saved_by_candidate = (req, res) => {
  const idToRemove = req.params.id;
  JobSaved.findOneAndRemove({ _id: idToRemove, email: req.body.email }).then(
    (x) => {
      res.status(HttpStatus.OK).send();
    }
  );
};

export default {
  candidate_apply_for_a_job,
  get_jobs_saved_by_candidate,
  get_jobs_saved_by_candidate_jobadd,
  delete_jobs_saved_by_candidate,
};
