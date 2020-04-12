import CandidateProfile from "../models/CandidateProfile";
import { success, error } from "../util/constants";
import * as HttpStatus from "http-status-codes";
import { Email, emailSend, EmailTemeplate } from "../util/emailer";
import logger from "../util/logger";
import randomstring from "randomstring";
import { app } from "../config";
import { mongooseErrorToRes } from "../models/MongoUtil";

const registerCandidate = (req, res) => {
  const candidateProfile = new CandidateProfile(req.body);

  candidateProfile.emailverifysecret =
    randomstring.generate() + new Date().getTime();

  candidateProfile
    .save()
    .then((resp) => {
      sendEmail(resp._doc);
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

const verifyEmail = (req, res) => {
  CandidateProfile.findOneAndUpdate(
    { emailverifysecret: req.query.v },
    { emailverified: true }
  ).then((candidate) => {
    res.redirect(app.verifyEmailRedirect);
  });
};

let sendEmail = (candidate): void => {
  const email: Email = {
    to: candidate.email,
    template: EmailTemeplate.SIGNUP_CANDIDATE,
    data: { ...candidate, approoturl: app.rootUrl },
  };
  emailSend(email);
};
export default { registerCandidate, verifyEmail };
