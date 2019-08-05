import axios from 'axios'

const login = user => {
    return ( dispatch, getState ) => {
        dispatch( {
            type: 'LOGIN',
            payload: axios.post( '/api/login', user )
        } )
    }
}


export { login }