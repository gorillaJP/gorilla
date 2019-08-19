
import { combineReducers } from 'redux'
import loadingReducer from './loadingReducer'
import sessionReducer from './sessionReducer'
import eventReducer from './eventReducer'
import metaReducer from './metaReducer'



export default combineReducers( {
    loading: loadingReducer,
    session: sessionReducer,
    event: eventReducer,
    meta: metaReducer
} )