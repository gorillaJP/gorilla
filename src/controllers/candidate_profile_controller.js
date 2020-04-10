import CandidateProfile from "../models/CandidateProfile";
import { success, error } from "../util/constants";
import HttpStatus from "http-status-codes";

const registerCandidate = (req, res) => {
  const candidateProfile = new CandidateProfile(req.body);

  candidateProfile
    .save()
    .then((resp) => {
      res.status(HttpStatus.OK).send(success(resp));
    })
    .catch((err) => {
      res.status(HttpStatus.BAD_REQUEST).send(error());
    });
};

export default { registerCandidate };
