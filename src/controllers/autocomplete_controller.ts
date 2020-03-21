import logger from "../util/logger";
import AutoComplete from "../models/AutoComplte";
import { success, error } from "../util/constants";
import * as HttpStatus from "http-status-codes";

const autoComplete = (req, res) => {
  const startHrTime = process.hrtime();
  const correlationId = res.getHeaders()["x-request-id"];
  AutoComplete.esSearch(buildQuery(req.query.q), (err, results) => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    logger.info(
      "OUT-IN" +
        " get autoComplete" +
        " " +
        correlationId +
        " " +
        elapsedTimeInMs
    );
    if (results) {
      res.send(success(formatResposne(results)));
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
  });
};

/**ngram search with fuzyness */
const buildQuery = q => {
  const esq = {
    query: {
      match: {
        "name.edgengram": {
          query: q,
          fuzziness: 1
        }
      }
    }
  };
  return esq;
};

const formatResposne = data => {
  const res = data.body.hits.hits.map(u => {
    return u._source;
  });

  return {
    data: res
  };
};

export default { autoComplete };
