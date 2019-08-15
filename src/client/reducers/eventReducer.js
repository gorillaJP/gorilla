
const initState = {
    loginFailed: false
}

export default function (state = initState, action) { //reducer needs state and action

    switch (action.type) {
        case 'LOGIN_FULFILLED':

            if (action.payload.status === 200) {
                return {
                    ...initState,
                    loginFailed: false
                }
            }
            else {
                return {
                    ...initState,
                    loginFailed: true
                }
            }

        default:
            return state;
    }

}