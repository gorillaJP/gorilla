import React from 'react'
import ReactDOM from 'react-dom'
import ReactApp from './components/ReactApp'
import { Provider } from 'react-redux' //this is actually a component which glue react redux
import storeInit from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom'



const store = storeInit()

const App = () => {

  return <Provider store={ store.store }>

    <PersistGate loading={ null } persistor={ store.persistor }>
      <HashRouter >

        <ReactApp />

      </HashRouter >
    </PersistGate>

  </Provider>

}

ReactDOM.render( <App />, document.getElementById( 'app' ) )