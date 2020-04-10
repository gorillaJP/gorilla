import mongoConnection from "./util/mongoClient";
import "./util/emailer";
import logger from "./util/logger";

//connecting to mongo db
mongoConnection
  .then((con) => {
    logger.info("Mongo Connection established");
  })
  .catch((e) => {
    logger.error("Error at connecting to mongo");
  });
