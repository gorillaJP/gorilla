
const initState = null

export default function ( state = initState, action ) { //reducer needs state and action

    console.log( action.type )
    switch ( action.type ) {
        case 'LOGIN_FULFILLED':

            if ( action.payload.status === 200 ) {
                return action.payload.data

            }
            else {
                return initState
            }
        case 'LOGOUT':
            return initState
        default:
            return state;
            break;
    }

}