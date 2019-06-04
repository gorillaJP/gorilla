import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header'
import SearchCard from './components/MiddleContent'
import '../client/index.css'
//import 'antd/dist/antd.less'; // Import Ant Design styles by less entry
//import '../client/theme.less'; // variables to override above


//import '../client/index.less'; // Import Ant Design styles by less entry


import { Row, Col, Affix } from 'antd';
import MiddleContent from './components/MiddleContent';

//import Main from './components/Main'
//import { Provider } from 'react-redux' //this is actually a component which glue react redux
//import store from './store'

const App = () => {

  return <div>

    <Row>
      <Col span={24}>

        <Affix>
          <Header />
        </Affix>


        <MiddleContent />

      </Col>
    </Row>

  </div>

  //return <Provider store={store}>
  //    {/* This is the wrapper to enable redux as a provider*/}
  //    {/* <Main /> */}.
  // </Provider>

}

ReactDOM.render(<App />, document.getElementById('app'))
