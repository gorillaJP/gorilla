
const initState = {}


export default function ( state = initState, action ) { //reducer needs state and action

    console.log( 'kkk', action.type )
    switch ( action.type ) {
        case 'LOGIN_BUTTON_CLICK':
            console.log( 'mmm' )

            return {
                ...state, showLoginModel: true
            }
        case 'LOGIN_MODEL_CLOSE':
            return {
                ...state, showLoginModel: false
            }
        case 'LOGIN_FULFILLED':
            if ( action.payload.status === 200 ) {
                return {
                    ...state, showLoginModel: false
                }
            }
        default:
            return state;
            break;
    }


}