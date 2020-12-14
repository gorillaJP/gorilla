import CandidateProfile from "../models/CandidateProfile";
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
    let completeness = calcProfileCompleteness(candidateDB);
    candidateDB.completeness = completeness.total;
    candidateDB.nextAction = completeness.nextAction;
    calcProfileCompleteness(candidateDB);
    res.json({
      user: candidateDB,
    }); //here the req.user is set by the auth filter ( read from the token itself)
  });
};

let calcProfileCompleteness = (condidateDB) => {
  //start with 10 becase user has filled name email username and passwrod
  var totalScore = 0;
  var nextAction = null;

  weightsGrid.forEach((w) => {
    var pathPieces = w.key.split(".");

    //read the value of the perticular key to pointingObj
    var pointingObj = condidateDB;
    pathPieces.forEach((path) => {
      if (pointingObj != undefined && pointingObj != null) {
        pointingObj = pointingObj[path];
      }
    });

    //if the expected value is just value
    if (
      //should not be undefind or null
      (w.type == "val" && pointingObj !== null && pointingObj != undefined) ||
      //if it is a string should not be emtpy
      (typeof pointingObj == "string" && pointingObj != "")
    ) {
      totalScore += w.weight;
      //if the expected value is an array
    } else if (
      w.type == "array" &&
      pointingObj !== null &&
      pointingObj !== undefined &&
      Array.isArray(pointingObj) &&
      pointingObj.length > 0
    ) {
      totalScore += w.weight;
    } else {
      //only the reuired action is taken as the nextAction. let the user complete this. then it will show the next one
      if (nextAction == null) {
        nextAction = w.desc;
      }
    }
  });
  return {
    total: totalScore < 10 ? 10 : totalScore > 100 ? 100 : totalScore,
    nextAction: nextAction,
  };
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
  if ("name" == property.toLowerCase()) {
    candidateDB.name = newData.name;
  } else if ("visibletoemployers" == property.toLowerCase()) {
    candidateDB.visibleToEmployers = newData.visibleToEmployers;
  } else if ("personalinfo" == property.toLowerCase()) {
    candidateDB.personalInfo = newData;
  } else if ("profileimage" == property.toLowerCase()) {
    candidateDB.profileImage = newData.profileImage;
  } else if ("jobpreference" == property.toLowerCase()) {
    candidateDB.jobPreference = newData;
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

const weightsGrid = [
  //15
  {
    key: "personalInfo.mobilePhoneNumber",
    type: "val",
    weight: 3,
    desc: "Add Mobile Phone Number",
  },
  {
    key: "personalInfo.dateOfBirth",
    type: "val",
    weight: 3,
    desc: "Add Date Of Birth",
  },
  {
    key: "personalInfo.homeTown",
    type: "val",
    weight: 2,
    desc: "Add Home Town",
  },
  {
    key: "personalInfo.gender",
    type: "val",
    weight: 2,
    desc: "Add Gender",
  },
  {
    key: "personalInfo.address",
    type: "val",
    weight: 2,
    desc: "Add Address",
  },
  {
    key: "personalInfo.introduction",
    type: "val",
    weight: 2,
    desc: "Add Personal Intorduction",
  },
  /*
    {
      key: "personalInfo.homePhoneNumber",
      type: "val",
      weight: 0,
      desc: "Add Home Phone Number",
    },
    */
  {
    key: "personalInfo.martialStatus",
    type: "val",
    weight: 1,
    desc: "Add Martial Status",
  },

  //15
  {
    key: "jobPreference.industry",
    type: "val",
    weight: 3,
    desc: "Add Industry",
  },
  {
    key: "jobPreference.category",
    type: "val",
    weight: 2,
    desc: "Add Prefered Job Category",
  },
  {
    key: "jobPreference.jobType",
    type: "val",
    weight: 2,
    desc: "Add Prefered Job Type",
  },
  {
    key: "jobPreference.role",
    type: "val",
    weight: 2,
    desc: "Add Prefered Job Role",
  },
  {
    key: "jobPreference.preferredLocation",
    type: "val",
    weight: 2,
    desc: "Add Preferred Location",
  },
  {
    key: "jobPreference.expectedSalary",
    type: "val",
    weight: 2,
    desc: "Add Expected Salary",
  },
  {
    key: "jobPreference.expectedSalaryCurrency",
    type: "val",
    weight: 2,
    desc: "Add Currency of Expected Salry",
  },

  //60
  {
    key: "resumes",
    type: "array",
    weight: 10,
    desc: "Add Resumes",
  },
  {
    key: "profileImage",
    type: "val",
    weight: 12,
    desc: "Add Profile Image",
  },
  {
    key: "skills",
    type: "array",
    weight: 12,
    desc: "Add Skills",
  },
  {
    key: "languages",
    type: "array",
    weight: 12,
    desc: "Add Languages",
  },
  {
    key: "educations",
    type: "array",
    weight: 12,
    desc: "Add Education",
  },
  {
    key: "experiences",
    type: "array",
    weight: 12,
    desc: "Add Experience",
  },
];

export default {
  createCandidate,
  createOnProfile,
  deleteOnProfile,
  verifyEmail,
  candidateprofile,
};
