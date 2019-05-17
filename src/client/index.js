import React from 'react'
import ReactDOM from 'react-dom'
import DatePicker from 'antd/lib/date-picker'; // for js
import 'antd/lib/date-picker/style/css'; // for css
import 'antd/lib/row/style/css'; // for css
import 'antd/lib/col/style/css'; // for css

import { Row, Col } from 'antd';

//import Main from './components/Main'
//import { Provider } from 'react-redux' //this is actually a component which glue react redux
//import store from './store'

const App = () => {
  
return 
  <div>
    <Row>
      <Col span={12}>
         <DatePicker />
      </Col>
    </Row>

    <Row>
      <Col span={12}>col-12</Col>
    </Row>

    <Row>
      <Col span={12}>col-12</Col>
    </Row>

  </div>

    //return <Provider store={store}>
    //    {/* This is the wrapper to enable redux as a provider*/}
   //    {/* <Main /> */}.
   // </Provider>

}

ReactDOM.render(<App />, document.getElementById('app'))
