import axios from 'axios'

const isValidUsreNameAction = (rule, value, callback) => {
    return (dispatch, getState) => {

        if (value)

            dispatch({
                type: 'VALIDATE',
                payload: axios.get('/api/exist/seeker/username/' + value).then(res => {

                    if (res.data.payload.count != 0) {
                        callback('This username is taken')
                    }
                    else {
                        callback()
                    }
                }).catch(err => {
                    callback('Error at validating')
                })
            })

        else {
            callback()
        }
    }
}

const isValidEmailAction = (rule, value, callback) => {
    return (dispatch, getState) => {

        if (value)

            dispatch({
                type: 'VALIDATE',
                payload: axios.get('/api/exist/seeker/email/' + value).then(res => {

                    if (res.data.payload.count != 0) {
                        callback('This email is already registered')
                    }
                    else {
                        callback()
                    }
                }).catch(err => {
                    callback('Error at validating')
                })
            })

        else {
            callback()
        }
    }
}


export { isValidUsreNameAction, isValidEmailAction }