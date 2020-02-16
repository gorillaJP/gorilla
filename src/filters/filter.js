
import logger from '../util/logger'

/**
 * log for request and responses
 */
const logFilter = (req, res, next) => {

    const reqId = res.getHeaders()['x-request-id']

    logger.info('IN' + ' ' + req.method + ' ' + req.path + ' ' + reqId)

    const startHrTime = process.hrtime();

    res.on("finish", () => {
        const elapsedHrTime = process.hrtime(startHrTime);
        const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
        logger.info('IN-OUT' + ' ' + req.method + ' ' + req.path + ' ' + reqId + ' ' + elapsedTimeInMs)
    });

    next()
}

export { logFilter }