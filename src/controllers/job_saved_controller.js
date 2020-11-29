import * as HttpStatus from "http-status-codes";
import { mongooseErrorToRes } from "../models/MongoUtil";
import _ from "lodash";
import logger from "../util/logger";
import JobSaved from "../models/JobSaved";
import { success, error } from "../util/constants";

/**
 * get called when a candidate click on apply or eazy apply buttons of a job
 */

const candidate_apply_for_a_job = (req, res) => {
  const jobSaved = new JobSaved(req.body);

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
};

const get_jobs_saved_by_candidate = (req, res) => {
  console.log(req.body.email);
  JobSaved.find({ email: req.body.email }).then((candidateDB) => {
    res.send(success(candidateDB));
  });
};

const delete_jobs_saved_by_candidate = (req, res) => {
  console.log(req.params.id);
  console.log(req.body.email);
  const idToRemove = req.params.id;
  JobSaved.findOneAndRemove({ _id: idToRemove, email: req.body.email }).then(
    (x) => {
      console.log(x);
      res.status(HttpStatus.OK).send();
    }
  );
};

export default {
  candidate_apply_for_a_job,
  get_jobs_saved_by_candidate,
  delete_jobs_saved_by_candidate,
};
