import * as HttpStatus from "http-status-codes";
import _ from "lodash";
import * as esb from "elastic-builder";
import logger from "../util/logger";
import JobAdd from "../models/JobAdd";
import { success, error } from "../util/constants";
import { readdir } from "fs";

const maxNumberOfResults = 50; // ceil at 50 records

/*** search from elastic search
 */

const sumaryByIndustry = (req, res) => {
  const correlationId = res.getHeaders()["x-request-id"];
  const startHrTime = process.hrtime();

  logger.info("OUT" + " sumaryByIndustry" + " " + correlationId);

  JobAdd.esSearch(buildQuerySumaryByIndustry(), (err, results) => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;

    if (err) {
      JSON.stringify("Error", err);
    }

    logger.info(
      "OUT-IN" +
        " sumaryByIndustry" +
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
      results.body.aggregations &&
      results.body.aggregations.location &&
      results.body.aggregations.location.buckets
    ) {
      res.status(200).send(
        success(
          results.body.aggregations.location.buckets.map((city) => {
            return {
              key: city.key.charAt(0).toUpperCase() + city.key.slice(1),
              value: city.industry.buckets.map((industry) => {
                return {
                  key:
                    industry.key.charAt(0).toUpperCase() +
                    industry.key.slice(1),
                  count: industry.doc_count,
                };
              }),
            };
          })
        )
      );
      return;
    }
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
  });
};

const buildQuerySumaryByIndustry = () => {
  const query = {
    size: 0,
    aggs: {
      location: {
        terms: {
          field: "location",
        },
        aggs: {
          industry: {
            terms: {
              field: "industry",
            },
          },
        },
      },
    },
  };
  return query;
};

//featured jobs

const formatResposne = (data, limit, offset) => {
  const res = data.body.hits.hits.map((u) => {
    u._source._id = u._id;
    return u._source;
  });

  return {
    meta: {
      total: data.body.hits.total.value,
      limit,
      offset,
    },
    data: res,
  };
};

export default { sumaryByIndustry };
