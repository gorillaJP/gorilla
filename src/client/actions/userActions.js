import axios from 'axios'

const loginAction = user => {
    return (dispatch, getState) => {
        dispatch({
            type: 'LOGIN',
            payload: axios.post('/api/login', user)
        })
    }
}

const registerAction = user => {
    return (dispatch, getState) => {

        console.log('tata')
        dispatch({
            type: 'REGISTER',
            payload: axios.post('/api/register', user)
        })
    }
}




export { loginAction, registerAction }