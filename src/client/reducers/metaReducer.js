
const initState = null

export default function ( state = initState, action ) {

    console.log( action.type )
    switch ( action.type ) {
        case 'FETCH_META_FULFILLED':

            return action.payload

        default:
            return state;
            break;
    }

}