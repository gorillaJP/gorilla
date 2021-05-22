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
  let regEx;
  if (req.query.type == "prefix") {
    regEx = getSearchRegExByPrefix(req.query.q);
  } else {
    regEx = getSearchRegEx(req.query.q);
  }

  CompanyProfile.find({ name: regEx }, { name: 1, id: 1 })
    .exec()
    .then((data) => {
      res.status(HttpStatus.OK).send(success(data));
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
