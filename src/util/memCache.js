import NodeCache from "node-cache";
import CompanyProfile from "../models/CompanyProfile";
import JobAdd from "../models/JobAdd";
import logger from "../util/logger";

const memcache = new NodeCache();

//loading company profiles to memory. this is used to avoid (n+1 loading issue from mongodb)
setInterval(() => {
  //load counts by company from jobAdds
  const jobCountsByCompanyPromise = JobAdd.aggregate([
    {
      $group: {
        _id: "$company",
        companyName: { $first: "$company" }, //TODO change this to companyId
        count: { $sum: 1 },
      },
    },
  ]);

  //load companyInfo
  const companyInfoPromise = CompanyProfile.find(
    {},
    { id: 1, logo: 1, name: 1 }
  ).exec();

  Promise.all([companyInfoPromise, jobCountsByCompanyPromise]).then((vals) => {
    var companies = vals[0];
    var jobCountsByJobs = vals[1];

    const companiesToCache = companies.map((company) => {
      //matching count objects
      const jobCountsMatchedWithCompany = jobCountsByJobs.filter((rec) => {
        return rec.companyName == company.name;
      });

      //append the job count on company object
      company._doc.jobcount =
        jobCountsMatchedWithCompany.length > 0
          ? jobCountsMatchedWithCompany[0].count
          : 0;

      const obj = {
        key: "company" + company.id,
        val: company._doc,
      };

      console.log(obj);
      return obj;
    });
    memcache.mset(companiesToCache);
  });
}, 10000);

//load the count of jobs for each company from mongo
setInterval(() => {
  //TODO -> here the aggrigation should be done by companyId. to to this companyId should be saved into jobAdd collection
  JobAdd.aggregate([
    {
      $group: {
        _id: "$company",
        companyId: { $first: "$title" },
        count: { $sum: 1 },
      },
    },
  ]).then((pp) => {
    //console.log(pp);
  });
}, 10000);

export default memcache;
