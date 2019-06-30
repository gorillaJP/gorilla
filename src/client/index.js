import React from 'react'
import ReactDOM from 'react-dom'
import ReactApp from './components/ReactApp'
import { Provider } from 'react-redux' //this is actually a component which glue react redux
import store from './store'



const App = () => {

  return <Provider store={ store }>

    <ReactApp />

  </Provider>

}

ReactDOM.render( <App />, document.getElementById( 'app' ) )