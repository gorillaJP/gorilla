import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import promiseMiddleware from 'redux-promise-middleware';

const initState = {}

const middleware = [ thunk, promiseMiddleware ]

/* 
minimal store needs
    a. a init state
    b. a reducer
*/
const store = createStore(
    rootReducer,
    initState,
    compose(
        applyMiddleware( ...middleware ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //This is to enable redux dev tool at chrome browser
    )
)

export default store