import * as HttpStatus from "http-status-codes";
import { mongooseErrorToRes } from "../models/MongoUtil";
import _ from "lodash";
import logger from "../util/logger";
import FollowedCompany from "../models/FollowedCompany";
import JobAdd from "../models/JobAdd";
import { success, error } from "../util/constants";
import memcache from "../util/memCache";

const create_followed_company = (req, res) => {
  const fCompanyIn = new FollowedCompany(req.body);

  fCompanyIn.candidateEmail = req.body.email;

  fCompanyIn
    .save(fCompanyIn)
    .then(res.send(success(fCompanyIn)))
    .catch((err) => {
      res.send(error(err));
    });
};

const get_followed_companies = (req, res) => {
  JobAdd.aggregate([
    {
      $group: {
        _id: "$company",
        companyId: { $first: "$title" },
        count: { $sum: 1 },
      },
    },
  ]).then((pp) => {
    console.log(pp);
  });

  FollowedCompany.find({ candidateEmail: req.body.email })
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

const delete_followed_companies = (req, res) => {
  const companyidToRemove = req.params.id;

  FollowedCompany.deleteMany({
    companyId: companyidToRemove,
    candidateEmail: req.body.email,
  }).then((x) => {
    res.status(HttpStatus.OK).send();
  });
};

const testAggrigate = () => {
  return {
    $facet: {
      data: [{ $match: {} }, {}, {}],
      meta: [
        {},
        {
          $group: {
            _id: null, //group by condition
            total: { $sum: 1 },
          },
        },
      ],
    },
  };
};

export default {
  create_followed_company,
  get_followed_companies,
  delete_followed_companies,
};
