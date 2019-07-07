
import { combineReducers } from 'redux'
import loadingReducer from './loadingReducer'
import sessionReducer from './sessionReducer'

export default combineReducers( {
    loading: loadingReducer,
    session: sessionReducer
} )