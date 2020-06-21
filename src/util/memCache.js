import NodeCache from "node-cache";
import companyProfile from "../models/CompanyProfile";
import logger from "../util/logger";

const memcache = new NodeCache();

//loading company profiles to memory. this is used to avoid (n+1 loading issue from mongodb)

setInterval(() => {
  companyProfile
    .find({}, { id: 1, logo: 1, name: 1 })
    .exec()
    .then((companies) => {
      console.log("loading companies to cache");
      if (companies) {
        const companiesToCache = companies.map((company) => {
          const obj = {
            key: "company" + company.id,
            val: company,
          };
          return obj;
        });
        memcache.mset(companiesToCache);
      }
    })
    .catch((e) => {
      logger.error(e);
    });
}, 10000);

export default memcache;
