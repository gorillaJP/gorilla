import HttpStatus from 'http-status-codes'

import JobAdd from '../models/JobAdd'
import { success, error } from '../util/constants'

const maxNumberOfResults = 100 //max number of results to return in one api call

/*** search from elastic search*/
const getJobsPaginated = (req, res) => {

    let offset = req.query.offset ? Math.max(req.query.offset, 0) : 0
    let limit = req.query.limit ? Math.max(maxNumberOfResults, req.query.limit) : maxNumberOfResults


    JobAdd.search({
        "multi_match": {
            "query": "java",
            "fields": ["description"]
        }
    }, (err, results) => {
        if (results) {
            res.status(200).send(success(formatResposne(results)))
            return
        }
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
    })
}

const formatResposne = (data) => {

    var res = data.body.hits.hits.map(u => {
        u._source._id = u._id
        return u._source
    })

    return {
        data: res,
        meta: data.body.hits.total
    }
}



export default { getJobsPaginated }