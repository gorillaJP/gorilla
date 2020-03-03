import Meta from "../models/Meta";
import MetaCities from "../models/Meta_cities";
import MetaSectors from "../models/Meta_sector";
import MetaSalaries from "../models/MetaSlary";
import MetaRoles from "../models/MetaRole";
import { success, error } from "../util/constants";

const getMeta = (req, res) => {
  let property = req.params.property;

  let regEx = getSearchRegEx(req.query.q);

  getCollection(property)
    .distinct("name", { name: regEx })
    .exec()
    .then(data => {
      res.status(200).send(success(data));
    })
    .catch(err => {
      console.log(err);
      res.status(HttpStatus.BAD_REQUEST).send(error());
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

/**
 * Get the collection to be searched as per the property
 */
const getCollection = name => {
  console.log(name);
  if (name === "allmetacities") {
    return MetaCities;
  }
  if (name === "allmetasectors") {
    return MetaSectors;
  }
  if (name === "allmetasalaries") {
    return MetaSalaries;
  }
  if (name === "allmetaroles") {
    return MetaRoles;
  }
};

export default { getMeta };
