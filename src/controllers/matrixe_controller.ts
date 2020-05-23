import logger from "../util/logger";
import JobAdd from "../models/JobAdd";
import { success, error } from "../util/constants";
import * as HttpStatus from "http-status-codes";
import * as esb from "elastic-builder";

const topHieringCompanies = (req, res) => {
  const boolQuery = esb.boolQuery();

  const agg = esb.cardinalityAggregation("author_count", "author");

  //Get Top 10 companies  //TODO => remove expired jobs
  JobAdd.esSearch(
    {
      aggs: {
        company: {
          terms: {
            field: "company.full_string",
            size: 10,
          },
        },
      },
    },
    (err, data) => {
      if (
        !err &&
        data &&
        data.body &&
        data.body.aggregations &&
        data.body.aggregations.company
      ) {
        res
          .status(HttpStatus.OK)
          .send(success(data.body.aggregations.company.buckets));
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      }
    }
  );
};

//jobs by industry
const industry = (req, res) => {
  JobAdd.esSearch(
    {
      aggs: {
        company: {
          terms: {
            field: "industry.full_string",
            size: 10,
          },
        },
      },
    },
    (err, data) => {
      if (
        !err &&
        data &&
        data.body &&
        data.body.aggregations &&
        data.body.aggregations.company
      ) {
        res
          .status(HttpStatus.OK)
          .send(success(data.body.aggregations.company.buckets));
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      }
    }
  );
};

export default { topHieringCompanies, industry };
