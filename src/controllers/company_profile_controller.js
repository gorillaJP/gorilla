import CompanyProfile from "../models/CompanyProfile";
import { success, error } from "../util/constants";
import HttpStatus from "http-status-codes";
import { childrenAggregation } from "elastic-builder";
import Company from "../models/CompanyProfile";

/**
 * Save the Employee and company
 *
 * If the comapny is new => add it
 *
 */
const getCompanyList = (req, res) => {
  let property = req.params.property;

  let regEx = getSearchRegEx(req.query.q);
  console.log(regEx);

  CompanyProfile.find({ name: regEx })
    .exec()
    .then(data => {
      res.status(HttpStatus.OK).send(success(data));
    })
    .catch(e => {
      logger.error(e);
      res.status(HttpStatus.BAD_REQUEST).send(console.error());
    });
};

/**
 * Get the RegEx search object as per the query
 * matching anything that has the query string in vlaue
 */
const getSearchRegEx = query => {
  let regExString = ".*" + query + ".*";

  return new RegExp(regExString, "i");
};

export default { getCompanyList };
