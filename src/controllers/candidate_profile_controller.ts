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
import Candidate from "../models/CandidateProfile";
import { EDQUOT } from "constants";

//------- PROFILE  ------------

//read candidate profile
const candidateprofile = (req, res) => {
  //validate the request to see if the JWT token is proper
  if (!req.headers.authorization || req.headers.authorization.split(" ") < 2) {
    res.send(HttpStatus.BAD_REQUEST);
    return;
  }

  CandidateProfile.findOne({ email: req.body.email }).then((candidateDB) => {
    res.json({
      user: candidateDB,
    }); //here the req.user is set by the auth filter ( read from the token itself)
  });
};

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

//create update on candidate profile
const createOnProfile = (req, res) => {
  console.log(req.body._id);

  CandidateProfile.findOne({ email: req.body.email })
    .then((candidateDB) => {
      candidateDB = populatedUpdatedProfile(
        //updated nested objects
        req.body,
        req.params.property,
        candidateDB
      );
      CandidateProfile.findOneAndUpdate(
        { email: req.body.email },
        candidateDB,
        { upsert: true, new: true }
      )
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

const populatedUpdatedProfile = (newData, property, candidateDB) => {
  //direct property update
  if ("firstname" == property.toLowerCase()) {
    candidateDB.firstName = newData.firstName;
  } else if ("lastname" == property.toLowerCase()) {
    candidateDB.lastName = newData.lastName;
  }
  //education
  else if (property == "education") {
    var _ids = [];
    if (Array.isArray(newData)) {
      _ids = newData.filter((nw) => nw._id).map((nw) => nw._id);
      candidateDB.educations = candidateDB.educations.filter((edu) => {
        return !_ids.includes(String(edu._id));
      });
      candidateDB.educations = candidateDB.educations.concat(newData);
    } else if (newData._id) {
      candidateDB.educations = candidateDB.educations.filter((edu) => {
        return edu._id != newData._id;
      });
      candidateDB.educations.push(newData);
    } else {
      candidateDB.educations.push(newData);
    }

    //experience
  } else if (property == "experience") {
    var _ids = [];
    if (Array.isArray(newData)) {
      _ids = newData.filter((nw) => nw._id).map((nw) => nw._id);
      candidateDB.experiences = candidateDB.experiences.filter((edu) => {
        return !_ids.includes(String(edu._id));
      });
      candidateDB.experiences = candidateDB.experiences.concat(newData);
    } else if (newData._id) {
      candidateDB.experiences = candidateDB.experiences.filter((edu) => {
        return edu._id != newData._id;
      });
      candidateDB.experiences.push(newData);
    } else {
      candidateDB.experiences.push(newData);
    }
  }
  //awards
  else if (property == "award") {
    var _ids = [];
    if (Array.isArray(newData)) {
      _ids = newData.filter((nw) => nw._id).map((nw) => nw._id);
      candidateDB.awards = candidateDB.awards.filter((award) => {
        return !_ids.includes(String(award._id));
      });
      candidateDB.awards = candidateDB.awards.concat(newData);
    } else if (newData._id) {
      candidateDB.awards = candidateDB.awards.filter((award) => {
        return award._id != newData._id;
      });
      candidateDB.awards.push(newData);
    } else {
      candidateDB.awards.push(newData);
    }
    //resumes
  } else if (property == "resumes") {
    if (newData._id) {
      candidateDB.resumes = candidateDB.resumes.filter(
        (edu) => edu._id != newData._id
      );
    }
    candidateDB.resumes.push(newData);
    //skills
  } else if (property == "skills") {
    candidateDB.skills = newData;
  } else if (property == "languages") {
    candidateDB.languages = newData;
  }
  return candidateDB;
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
    } else if (req.params.property == "award") {
      candidateDB.awards.pull(req.params.id);
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
  createOnProfile,
  deleteOnProfile,
  verifyEmail,
  candidateprofile,
};
