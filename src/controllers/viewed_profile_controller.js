import * as HttpStatus from "http-status-codes";
import { mongooseErrorToRes } from "../models/MongoUtil";
import _ from "lodash";
import logger from "../util/logger";
import ViewedProfile from "../models/ViewedProfile";
import JobAdd from "../models/JobAdd";
import { success, error } from "../util/constants";
import memcache from "../util/memCache";

const create_viewed_profile = (req, res) => {
  const fCompanyIn = new ViewedProfile(req.body);

  fCompanyIn.candidateEmail = req.body.email;

  fCompanyIn
    .save(fCompanyIn)
    .then(res.send(success(fCompanyIn)))
    .catch((err) => {
      res.send(error(err));
    });
};

const get_viewed_profiles = (req, res) => {
  ViewedProfile.find({ candidateEmail: req.body.email })
    .then((followedCompanies) => {
      const withCompanyData = followedCompanies.map((followedCompany) => {
        const company = memcache.get("company" + followedCompany.companyId);

        delete followedCompany._doc.companyId;
        delete followedCompany._doc.__v;
        followedCompany._doc.company = company;

        return followedCompany._doc;
      });
      res.send(success(withCompanyData));
    })
    .catch((err) => {
      res.send(error(err));
    });
};

const delete_viewed_profile = (req, res) => {
  const companyidToRemove = req.params.id;

  ViewedProfile.deleteMany({
    companyId: companyidToRemove,
    candidateEmail: req.body.email,
  }).then((x) => {
    res.status(HttpStatus.OK).send();
  });
};

export default {
  create_viewed_profile,
  delete_viewed_profile,
  get_viewed_profiles,
};
