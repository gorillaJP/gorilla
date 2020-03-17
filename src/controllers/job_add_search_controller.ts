import * as HttpStatus from "http-status-codes";
import _ from "lodash";
import * as esb from "elastic-builder";
import logger from "../util/logger";
import JobAdd from "../models/JobAdd";
import { success, error } from "../util/constants";

const maxNumberOfResults = 50; // ceil at 50 records

/*** search from elastic search
 */

const getJobsPaginated = (req, res) => {
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

  JobAdd.esSearch(buildQuery(req.query, limit, offset), (err, results) => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    logger.info(
      "OUT-IN" +
        " getJobsPaginatedd" +
        " " +
        correlationId +
        " " +
        elapsedTimeInMs
    );
    if (results) {
      res.status(200).send(success(formatResposne(results, limit, offset)));
      return;
    }
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
  });
};

const buildQuery = (qObj, limit, offset) => {
  const fuzzySearchFields: string[] = ["company", "title", "description"]; // taken to multimatch field

  const exactMatchFilters: string[] = ["location", "type"]; // taken to multimatch field

  // taken to multimatch field
  const rangeFilters = {
    salarymax: "gte",
    experiencemin: "lte",
    createdat: "gte"
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
        qObj[key].forEach(val => {
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
    .from(offset);

  return esbq;
};

const formatResposne = (data, limit, offset) => {
  const res = data.body.hits.hits.map(u => {
    u._source._id = u._id;
    return u._source;
  });

  return {
    meta: {
      total: data.body.hits.total.value,
      limit,
      offset
    },
    data: res
  };
};

export default { getJobsPaginated };
