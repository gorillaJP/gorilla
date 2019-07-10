
import { combineReducers } from 'redux'
import loadingReducer from './loadingReducer'
import sessionReducer from './sessionReducer'
import eventReducer from './eventReducer'


export default combineReducers( {
    loading: loadingReducer,
    session: sessionReducer,
    event: eventReducer
} )