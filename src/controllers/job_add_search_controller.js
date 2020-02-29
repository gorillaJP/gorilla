import HttpStatus from 'http-status-codes'
import esb from 'elastic-builder'
import logger from '../util/logger'
import JobAdd from '../models/JobAdd'
import { success, error } from '../util/constants'

const maxNumberOfResults = 50//ceil at 50 records

/*** search from elastic search
*/
const getJobsPaginated = (req, res) => {
    const correlationId = res.getHeaders()['x-request-id']
    const startHrTime = process.hrtime();

    let offset = req.query.offset && req.query.offset != '' ? Math.max(req.query.offset, 0) : 0
    let limit = req.query.limit && req.query.limit != '' ? Math.min(maxNumberOfResults, req.query.limit) : maxNumberOfResults
    logger.info('OUT' + ' getJobsPaginated' + ' ' + correlationId)

    JobAdd.esSearch(buildQuery(req.body, limit, offset), (err, results) => {
        const elapsedHrTime = process.hrtime(startHrTime);
        const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
        logger.info('OUT-IN' + ' getJobsPaginatedd' + ' ' + correlationId + ' ' + elapsedTimeInMs)
        if (results) {
            res.status(200).send(success(formatResposne(results, limit, offset)))
            return
        }
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
    })
}

const buildQuery = (qObj, limit, offset) => {

    var multiMatchFields = ["company", "title", "description"] //taken to multimatch field

    var filterTerms = ["location", "type"] //taken to multimatch field

    //multi match, for fuzy search
    var boolQuery = esb.boolQuery().must(esb.multiMatchQuery(multiMatchFields, qObj.q))

    //exact matches
    for (var key in qObj) {
        if (filterTerms.includes(key)) {
            if (Array.isArray(qObj[key])) { //for multi match for the same field

                //should match at least one of values from list
                var boolQ = esb.boolQuery()
                qObj[key].forEach(val => {
                    boolQ.should(esb.termQuery(key, val))
                    boolQuery.filter(boolQ)
                })
            }
            else {
                //since value match
                boolQuery.filter(esb.termQuery(key, qObj[key]))
            }
        }
    }

    const esbq = esb.requestBodySearch().query(boolQuery).size(limit).from(offset)

    logger.info(esb.prettyPrint(esbq))

    return esbq
}


const formatResposne = (data, limit, offset) => {

    var res = data.body.hits.hits.map(u => {
        u._source._id = u._id
        return u._source
    })

    return {
        meta: {
            total: data.body.hits.total.value,
            limit: limit,
            offset: offset
        },
        data: res
    }
}



export default { getJobsPaginated }