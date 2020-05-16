import CandidateProfile from "../models/CandidateProfile";
import mongoose from "mongoose";
import CandiateEducation from "../models/CandidateEducation";
import CandidateExperience from "../models/CandidateExperience";
import { success, error } from "../util/constants";
import * as HttpStatus from "http-status-codes";
import { Email, emailSend, EmailTemeplate } from "../util/emailer";
import logger from "../util/logger";
import randomstring from "randomstring";
import { app } from "../config";
import { mongooseErrorToRes } from "../models/MongoUtil";
import CandidateEducation from "../models/CandidateEducation";

//------- PROFILE  ------------

const createCandidate = (req, res) => {
  const candidateProfile = new CandidateProfile(req.body);

  candidateProfile.emailverifysecret =
    randomstring.generate() + new Date().getTime();

  candidateProfile
    .save()
    .then((resp) => {
      sendSignUpCandidateEmail(resp._doc);
      Object.keys(resp._doc).forEach((key) => {
        //remove all secrets
        if (key.includes("secret")) {
          delete resp._doc[key];
        }
      });
      res.status(HttpStatus.OK).send(success(resp));
    })
    .catch((err) => {
      logger.error(err);
      res
        .status(HttpStatus.BAD_REQUEST)
        .send(error(mongooseErrorToRes("", err)));
    });
};

/// ------------------------- EDUCATION

//read
const getCandidateEducation = (req, res) => {
  CandidateEducation.find({ email: req.params.email, deleted: false })
    .sort({ order: 1 })
    .then((data) => {
      res.status(HttpStatus.OK).send(success(data));
    })
    .catch((err) => {
      logger.err(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(success());
    });
};

//use for create/update
const createCandidateEducation = (req, res) => {
  const options = {
    upsert: true, //insert if not exist
    new: true, //return the updated docuemnt
  };
  const key = req.body.id ? req.body.id : mongoose.Types.ObjectId(); //if the id is null set it. otherwise it will be inserted as null to db
  CandiateEducation.findOneAndUpdate(
    { _id: key, email: req.params.email },
    req.body,
    options,
    (err, result) => {
      if (err) {
        res.status(HttpStatus.BAD_REQUEST);
      } else {
        res.status(HttpStatus.OK).send(success(result));
      }
    }
  );
};

//delete
const deleteCandidateEducation = (req, res) => {
  CandidateEducation.findByIdAndUpdate(
    { _id: req.params.id, email: req.params.email },
    { deleted: true },
    (err, resutl) => {
      console.log(err);

      if (err) {
        res.status(HttpStatus.BAD_REQUEST).send();
      } else {
        res.status(HttpStatus.OK).send();
      }
    }
  );
};

// ----------------------------- END EDUCATION

// ----------------------------- START EXPERIENCE
const getCandidateExperience = (req, res) => {
  CandidateExperience.find({ email: req.params.email, deleted: false })
    .sort({ order: 1 })
    .then((data) => {
      res.status(HttpStatus.OK).send(success(data));
    })
    .catch((err) => {
      logger.err(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(success());
    });
};

//use for create/update
const createCandidateExperience = (req, res) => {
  const options = {
    upsert: true, //insert if not exist
    new: true, //return the updated docuemnt
  };
  const key = req.body.id ? req.body.id : mongoose.Types.ObjectId(); //if the id is null set it. otherwise it will be inserted as null to db
  CandidateExperience.findOneAndUpdate(
    { _id: key, email: req.params.email },
    req.body,
    options,
    (err, result) => {
      if (err) {
        res.status(HttpStatus.BAD_REQUEST);
      } else {
        res.status(HttpStatus.OK).send(success(result));
      }
    }
  );
};

const deleteCandidateExperience = (req, res) => {
  CandidateExperience.findByIdAndUpdate(
    { _id: req.params.id, email: req.params.email },
    { deleted: true },
    (err, resutl) => {
      if (err) {
        res.status(HttpStatus.BAD_REQUEST).send();
      } else {
        res.status(HttpStatus.OK).send();
      }
    }
  );
};

//--------------------------------- END EXPERIENCE

const verifyEmail = (req, res) => {
  CandidateProfile.findOneAndUpdate(
    { emailverifysecret: req.query.v },
    { emailverified: true }
  ).then((candidate) => {
    res.redirect(app.verifyEmailRedirect);
  });
};

let sendSignUpCandidateEmail = (candidate): void => {
  const email: Email = {
    to: candidate.email,
    template: EmailTemeplate.SIGNUP_CANDIDATE,
    data: { ...candidate, approoturl: app.rootUrl },
  };
  emailSend(email);
};
export default {
  createCandidate,
  getCandidateEducation,
  createCandidateEducation,
  deleteCandidateEducation,
  getCandidateExperience,
  createCandidateExperience,
  deleteCandidateExperience,
  verifyEmail,
};
