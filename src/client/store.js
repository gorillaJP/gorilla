import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import promiseMiddleware from 'redux-promise-middleware';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

const persistConfig = {
    key: 'root',
    storage,
}

const persistedRootReducer = persistReducer( persistConfig, rootReducer )


const initState = {}

const middleware = [ thunk, promiseMiddleware ]

/* 
minimal store needs
    a. a init state
    b. a reducer
*/


let wrappedMW
if ( process.env.NODE_ENV === 'production' ) {
    console.log( 'prodd' )
    wrappedMW = applyMiddleware( ...middleware )
}
else { //enable redux dev tools only for dev
    console.log( 'devvv' )

    wrappedMW = compose(
        applyMiddleware( ...middleware ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //This is to enable redux dev tool at chrome browser
    )
}




export default () => {

    let store = createStore(
        persistedRootReducer,
        initState,
        wrappedMW
    )

    let persistor = persistStore( store )

    return { store, persistor }
}
