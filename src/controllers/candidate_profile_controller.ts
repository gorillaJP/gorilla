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

//create a fresh profile
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

//depricated
/*
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
*/

//create update on candidate profile
const createOnProfile = (req, res) => {
  CandidateProfile.findOne({ email: req.body.email })
    .then((candidateDB) => {
      if (req.params.property == "education") {
        candidateDB.educations.push(req.body);
      } else if (req.params.property == "experience") {
        candidateDB.experiences.push(req.body);
      } else if (req.params.property == "resume") {
        candidateDB.resumes.push(req.body);
      } else if (req.params.property == "skills") {
        candidateDB.skill = req.body;
      } else if (req.params.property == "languages") {
        candidateDB.language = req.body;
      }
      candidateDB
        .save()
        .then((candidateSaved) => {
          res.status(HttpStatus.OK).send(success(candidateSaved));
        })
        .catch((err) => {
          logger.error(err);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        });
    })
    .catch((err) => {
      logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    });
};

//delete  On candidate Profle
const deleteOnProfile = (req, res) => {
  CandidateProfile.findOne({ email: req.body.email }).then((candidateDB) => {
    if (req.params.property == "education") {
      candidateDB.educations.pull(req.params.id);
    } else if (req.params.property == "experience") {
      candidateDB.experiences.pull(req.params.id);
    } else if (req.params.property == "resume") {
      candidateDB.resumes.pull(req.params.id);
    }
    candidateDB
      .save()
      .then((candidateSaved) => {
        res.status(HttpStatus.OK).send(success(candidateSaved));
      })
      .catch((err) => {
        logger.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      });
  });
};

// ----------------------------- END EDUCATION

// ----------------------------- START EXPERIENCE
//depricated
/*
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
*/

//use for create/update
/*
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
*/

//create update experience
/*
const createCandidateExperience = (req, res) => {
  CandidateProfile.findOne({ email: req.body.email })
    .then((candidateDB) => {
      candidateDB.experience.push(req.body);
      candidateDB
        .save()
        .then((candidateSaved) => {
          res.status(HttpStatus.OK).send(success(candidateSaved));
        })
        .catch((err) => {
          logger.error(err);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        });
    })
    .catch((err) => {
      logger.error(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    });
};

//delete experience
const deleteCandidateExperience = (req, res) => {
  CandidateProfile.findOne({ email: req.body.email }).then((candidateDB) => {
    candidateDB.experience.pull(req.params.id);
    candidateDB
      .save()
      .then((candidateSaved) => {
        res.status(HttpStatus.OK).send(success(candidateSaved));
      })
      .catch((err) => {
        logger.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      });
  });
};
*/

//--------------------------------- END EXPERIENCE

const verifyEmail = (req, res) => {
  CandidateProfile.findOneAndUpdate(
    { emailverifysecret: req.query.v },
    { emailverified: true }
  ).then((candidate) => {
    res.redirect(app.verifyEmailRedirect + "&domain=candidate");
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
  //  getCandidateEducation,
  createOnProfile,
  deleteOnProfile,
  /*
  getCandidateExperience,
  createCandidateExperience,
  deleteCandidateExperience,
  */
  verifyEmail,
};
