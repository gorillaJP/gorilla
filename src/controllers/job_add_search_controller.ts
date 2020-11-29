import * as HttpStatus from "http-status-codes";
import _ from "lodash";
import * as esb from "elastic-builder";
import logger from "../util/logger";
import JobAdd from "../models/JobAdd";
import JobApplication from "../models/JobApplication";
import { success, error } from "../util/constants";

const maxNumberOfResults = 50; // ceil at 50 records

/*** search from elastic search
 */

const getJobsPaginated = (req, res) => {
  console.log(req.body.email);

  const correlationId = res.getHeaders()["x-request-id"];
  const startHrTime = process.hrtime();

  const offset =
    req.query.offset && req.query.offset != ""
      ? Math.max(req.query.offset, 0)
      : 0;
  const limit =
    req.query.limit && req.query.limit != ""
      ? Math.min(maxNumberOfResults, req.query.limit)
      : maxNumberOfResults;
  logger.info("OUT" + " getJobsPaginated" + " " + correlationId);

  //search jobs in elastic search
  let esSearchP = new Promise((resolve, reject) => {
    JobAdd.esSearch(buildQuery(req.query, limit, offset), (err, results) => {
      const elapsedHrTime = process.hrtime(startHrTime);
      const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;

      if (err) {
        JSON.stringify("Error", err);
      }

      logger.info(
        "OUT-IN" +
          " getJobsPaginatedd" +
          " " +
          correlationId +
          " " +
          elapsedTimeInMs
      );
      if (
        //check if the response from mongo is proper
        results &&
        results.body &&
        results.body.hits &&
        results.body.hits.hits
      ) {
        resolve(results);
      } else {
        reject("error reading from ES");
      }
    });
  });

  //read applied jobs from mongoDB
  let jobApplications;
  if (req.body.email) {
    jobApplications = JobApplication.find({ email: req.body.email });
  } else {
    jobApplications = Promise.resolve([]);
  }

  //once both ES (search results) and Mongo(Applied jobs) are resoved -> respond to UI
  Promise.all([esSearchP, jobApplications])
    .then((vals) => {
      res
        .status(200)
        .send(success(formatResposne(vals[0], limit, offset, vals[1])));
    })
    .catch((err) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

const getCandidateAppliedJobs = (email) => {};

const buildQuery = (qObj, limit, offset) => {
  const fuzzySearchFields: string[] = ["company", "title", "overview"]; // taken to multimatch field

  const exactMatchFilters: string[] = [
    "location",
    "type",
    "jobtype",
    "isfeatured",
  ]; // taken to multimatch field

  // taken to multimatch field
  const rangeFilters = {
    salarymax: "gte",
    experiencemin: "lte",
    createdat: "gte",
  };

  // multi match, for fuzy search
  const boolQuery = esb.boolQuery();

  if (qObj.q && qObj.q != "") {
    boolQuery.must(esb.multiMatchQuery(fuzzySearchFields, qObj.q));
  }

  // exact matches
  for (const key in qObj) {
    if (exactMatchFilters.includes(key)) {
      if (Array.isArray(qObj[key])) {
        // for multi match for the same field

        // should match at least one of values from list
        const boolQ = esb.boolQuery();
        qObj[key].forEach((val) => {
          if (val && val != "" && val != "any") {
            boolQ.should(esb.termQuery(key, val));
            boolQuery.filter(boolQ);
          }
        });
      } else if (qObj[key] && qObj[key] != "" && qObj[key] != "any") {
        // since value match
        boolQuery.filter(esb.termQuery(key, qObj[key]));
      }
      //check if query key matches with any of rangeFilter labels
    } else if (
      rangeFilters.hasOwnProperty(key) &&
      qObj[key] &&
      !isNaN(qObj[key])
    ) {
      if (key === "createdat") {
        //createdat is a date field => special treatment is needed
        const dayGap = qObj[key];
        boolQuery.filter(esb.rangeQuery(key).gte("now-" + dayGap + "d/d"));
      } else {
        if (rangeFilters[key] === "gte") {
          boolQuery.filter(esb.rangeQuery(key).gte(qObj[key]));
        } else if (rangeFilters[key] === "lte") {
          boolQuery.filter(esb.rangeQuery(key).lte(qObj[key]));
        }
      }
    }
  }

  const esbq = esb
    .requestBodySearch()
    .query(boolQuery)
    .size(limit)
    .from(offset)
    .sorts([esb.sort("_score"), esb.sort("isfeatured").order("desc")]); //features jobs shuold come at the top of the resutls

  logger.info(JSON.stringify(esbq));

  return esbq;
};

//featured jobs

const formatResposne = (esResults, limit, offset, jobApplications) => {
  const res = esResults.body.hits.hits.map((u) => {
    u._source._id = u._id;

    //check if the logged in user has already applied for this job
    var matchingApplication = jobApplications.find((application) => {
      return application.jobId == u._id;
    });

    if (matchingApplication) {
      u._source.hasApplied = true;
    } else {
      u._source.hasApplied = false;
    }

    return u._source;
  });

  return {
    meta: {
      total: esResults.body.hits.total.value,
      limit,
      offset,
    },
    data: res,
  };
};

export default { getJobsPaginated };
