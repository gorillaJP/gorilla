import {
    UI_TOGGLE_CREATE_COLLECTION_MODAL
} from '../actions/types'

const initState = {
    createCollectionModal: {
        visible: false
    }
}

export default ( state = initState, action ) => {

    switch ( action.type ) {


        case UI_TOGGLE_CREATE_COLLECTION_MODAL:


            let res = {
                ...state, 'createCollectionModal': { visible: action.payload }
            }
            return res
        default:
            return state
    }

}