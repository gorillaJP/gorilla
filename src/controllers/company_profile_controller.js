import HttpStatus from "http-status-codes";
import { childrenAggregation } from "elastic-builder";
import CompanyProfile from "../models/CompanyProfile";
import logger from "../util/logger";
import { success, error } from "../util/constants";

/**
 * Save the Employee and company
 *
 * If the comapny is new => add it
 *
 */
const getCompanyList = (req, res) => {
  let dbQuery;
  let regEx;

  if (req.query.type == "prefix") {
    regEx = getSearchRegExByPrefix(req.query.q);
  } else {
    regEx = getSearchRegEx(req.query.q);
  }

  //prepare dbquery + reponsecon
  if (req.query.scope == "full") {
    dbQuery = CompanyProfile.find({ name: regEx });
  } else {
    dbQuery = CompanyProfile.find({ name: regEx }, { name: 1, id: 1 });
  }

  //fire
  dbQuery
    .exec()
    .then((data) => {
      let resData;
      if (req.query.scope == "full") {
        resData = data.map((e) => {
          e._doc.activeJobs = 5; //read from cache or ES
          return e;
        });
      }
      res.status(HttpStatus.OK).send(success(resData));
    })
    .catch((e) => {
      logger.error(e);
      res.status(HttpStatus.BAD_REQUEST).send(error());
    });
};

/**
 * Get the RegEx search object as per the query
 * matching anything that has the query string in vlaue
 */
const getSearchRegEx = (query) => {
  let regExString = ".*" + query + ".*";
  return new RegExp(regExString, "i");
};

const getSearchRegExByPrefix = (query) => {
  let regExString = "^" + query + ".*";
  return new RegExp(regExString, "i");
};

export default { getCompanyList };
