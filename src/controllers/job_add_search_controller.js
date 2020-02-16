import HttpStatus from 'http-status-codes'

import JobAdd from '../models/JobAdd'
import { success, error } from '../util/constants'

const maxNumberOfResults = 50//ceil at 50 records

/*** search from elastic search
*/
const getJobsPaginated = (req, res) => {

    let offset = req.query.offset && req.query.offset != '' ? Math.max(req.query.offset, 0) : 0
    let limit = req.query.limit && req.query.limit != '' ? Math.min(maxNumberOfResults, req.query.limit) : maxNumberOfResults

    JobAdd.esSearch(buildQuery(req.query.q, limit, offset), (err, results) => {
        if (results) {
            res.status(200).send(success(formatResposne(results, limit, offset)))
            return
        }
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
    })
}

const buildQuery = (q, limit, offset) => {

    var query = {
        "size": limit,
        "from": offset,
    }

    if (q && q != '') {
        query.query = {
            "multi_match": {
                "query": q,
                "fields": ["company", "title", "description", "skill"]
            }
        }
    }
    return query
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