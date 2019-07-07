
const initState = {}

let pendingResults = 0;

export default function ( state = initState, action ) { //reducer needs state and action

    if ( action.type.includes( 'PENDING' ) ) {
        pendingResults = pendingResults + 1
    }
    else if ( action.type.includes( 'FULFILLED' ) || action.type.includes( 'REJECTED' ) ) {
        pendingResults = pendingResults - 1;
    }

    if ( pendingResults > 0 ) {
        return true
    }
    else {
        return false
    }

}