import logger from "../util/logger";
import JobAdd from "../models/JobAdd";
import { success, error } from "../util/constants";
import * as HttpStatus from "http-status-codes";
import memcache from "../util/memCache";

const topHieringCompanies = (req, res) => {
  //Get Top 10 companies  //TODO => remove expired jobs
  JobAdd.esSearch(
    {
      aggs: {
        company: {
          //get company count. get n companies (after order desc by the count)
          terms: {
            field: "company.full_string",
            size: 100,
          },
          //aggrigatin inside bucket
          aggs: {
            // for each company get the companyid from the latest document in bucket
            companyid: {
              top_hits: {
                sort: [
                  {
                    createdat: {
                      order: "desc",
                    },
                  },
                ],
                _source: {
                  includes: ["companyid"],
                },
                size: 1,
              },
            },
          },
        },
      },
    },
    //elastic search results comes here. (post processing)
    (err, data) => {
      if (
        !err &&
        data &&
        data.body &&
        data.body.aggregations &&
        data.body.aggregations.company &&
        data.body.aggregations.company.buckets
      ) {
        //format response
        data.body.aggregations.company.buckets.forEach((jobAdd) => {
          jobAdd.companyid = jobAdd.companyid.hits.hits[0]._source.companyid; //get companyId from bucket level aggregation
          jobAdd.count = jobAdd.doc_count;
          delete jobAdd.doc_count;
        });
        //bind comapny images
        const response = bindImages(
          data.body.aggregations.company.buckets,
          "company"
        );
        res.status(HttpStatus.OK).send(success(response));
      } else {
        logger.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      }
    }
  );
};

const bindImages = (data, cacheKey) => {
  data.forEach((element) => {
    const company = memcache.get(cacheKey + element.companyid); //get company from  memcache
    element.logo =
      company && company.logo ? company.logo : "default_company.png";
  });
  return data;
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
        logger.err(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      }
    }
  );
};
const category = (req, res) => {
  JobAdd.esSearch(
    {
      aggs: {
        company: {
          terms: {
            field: "industry.category",
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
        logger.err(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      }
    }
  );
};

export default { topHieringCompanies, industry, category };
