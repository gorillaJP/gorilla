import HttpStatus from "http-status-codes";

import JobAdd from "../models/JobAdd";
import logger from "../util/logger";
import CompanyProfile from "../models/CompanyProfile";
import { success, error } from "../util/constants";

const maxNumberOfResults = 100; //max number of results to return in one api call

const getJobById = (req, res) => {
  JobAdd.findById(req.params.id)
    .exec()
    .then((data) => {
      res.status(200).send(success(data));
    })
    .catch((err) => {
      console.log(err);
      res.status(HttpStatus.BAD_REQUEST).send(error());
    });
};

/***
 * build aggrigation query
 *
 */
const buildFacet = (query, offset, limit) => {
  return {
    $facet: {
      data: [{ $match: query }, { $skip: offset }, { $limit: limit }],
      meta: [
        { $match: query },
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

//Generic getJobs controller
const getJobs = (req, res) => {
  const offset = Math.max(req.query.offset, 0);
  const limit = Math.max(maxNumberOfResults, req.query.limit);

  let searchPromise = JobAdd.find(formQueryObject(req.query))
    .skip(offset)
    .limit(limit)
    .exec(); //form the query and fire

  searchPromise
    .then((data) => {
      res.status(200).send(success(data));
    })
    .catch((err) => {
      console.log(err);
      res.status(HttpStatus.BAD_REQUEST).send(error());
    });
};

/**
 * remove offset and limit
 *
 * create query : AND of like queries
 *
 */
const formQueryObject = (queryObject) => {
  //result query
  let res = {};

  if (queryObject) {
    delete queryObject.offset;
    delete queryObject.limit;
  }

  //skip skills since it is an array
  for (var key in queryObject) {
    if (key == "q") {
      //wild search on pre determineded fields by the service
      res = { ...res, ...formWildQuery(queryObject[key]) };
    } else if (key == "skills") {
      //array search for skills
      res[key] = {
        $elemMatch: { $regex: ".*" + queryObject[key], $options: "i" },
      };
    } else {
      //general like search for all otehr fields
      res[key] = { $regex: ".*" + queryObject[key], $options: "i" };
    }
  }

  return res;
};

/***
 * wild search, try to match against pre identififed properties. ( all logic is at backend. frontend does not have an idea)
 *
 *
 */
const formWildQuery = (q) => {
  const matchProps = ["company", "title", "description", "skills"]; //props for what q is matched

  const queryNonArray = { $regex: ".*" + q, $options: "i" }; //non case sensitive search

  const conditions = matchProps.map((prop) => {
    if (prop == "skills") {
      return { [prop]: { $elemMatch: { $regex: ".*" + q, $options: "i" } } }; //for array element match
    }

    return { [prop]: queryNonArray }; //for all no array elements
  });

  var queryObject = { $or: conditions };

  return queryObject;
};

/***
 * registers a job with the system
 * the expiry date is expected to be null or milliseconds
 */
const postJobs = (req, res) => {
  if (req.body._id) {
    updateJobs(req, res);
  } else {
    req.body.expireDate = req.body.expireDate
      ? new Date(req.body.expireDate)
      : null;

    CompanyProfile.findById(req.body.companyid)
      .then((company) => {
        const jobAddIn = req.body;
        jobAddIn.companylogo = company.logo;

        var jobAdd = new JobAdd(jobAddIn);

        jobAdd
          .save()
          .then((resp, resp1) => {
            jobAdd.id = resp.id;

            res.status(HttpStatus.OK).send(success(jobAdd));
          })
          .catch((err) => {
            res.status(HttpStatus.BAD_REQUEST).send(error());
          });
      })
      .catch((err) => {
        res.status(HttpStatus.BAD_REQUEST).send(error(err));
      });
  }
};

/** start update job */
const updateJobs = (req, res) => {
  if (req.body._id) {
    const _idIn = req.body._id;
    JobAdd.findOneAndUpdate({ _id: _idIn }, req.body)
      .then((jobAddSaved) => {
        JobAdd.find({ _id: _idIn }).then((jobAddRead) => {
          res.status(HttpStatus.OK).send(success(jobAddRead));
        });
      })
      .catch((err) => {
        logger.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
};
/** end update job */

/***
 * pagination control with pagination data meta
 * fetch data from mongo db
 *
 */
const getJobsPaginatedOld = (req, res) => {
  let offset = req.query.offset ? Math.max(req.query.offset, 0) : 0;
  let limit = req.query.limit
    ? Math.max(maxNumberOfResults, req.query.limit)
    : maxNumberOfResults;

  const query = formQueryObject(req.query);
  const facetQuery = buildFacet(query, offset, limit);

  JobAdd.aggregate([facetQuery])
    .then((docs) => {
      //format response
      docs = docs[0];
      docs.meta = docs.meta[0];
      docs.meta.limit = limit;
      docs.meta.offset = offset;
      delete docs.meta._id;

      res.status(200).send(success(docs));
    })
    .catch((err) => {
      console.log(err);
      res.status(HttpStatus.BAD_REQUEST).send(error());
    });
};

const employerjobadds = (req, res) => {
  var query;

  //if the expired date is less than current date => then it takes as expired
  if (req.query.status == "expired") {
    query = {
      expireDate: {
        $lt: new Date(),
      },
    };
  } else {
    //if expired date if future => then check the status as well
    query = {
      status: req.query.status,
      expireDate: {
        $gte: new Date(),
      },
    };
  }

  JobAdd.find(query)
    .then((jobs) => {
      jobs = jobs.map((job) => {
        delete job._doc.description;
        return job._doc;
      });
      res.send(success(jobs));
    })
    .catch((e) => {
      res.send(error(e));
    });
};

export default {
  //for candidateveiew
  getJobs,
  postJobs,
  getJobsPaginatedOld,
  //for employer view
  employerjobadds,
  //common view
  getJobById,
};
