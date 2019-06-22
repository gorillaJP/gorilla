import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header'
import BodyContent from './components/BodyContent/BodyContent'
import style from '../client/index.less'

import { Row, Col, Affix } from 'antd';
import NavBar from './components/navbar/NavBar'

const App = () => {

  return <React.Fragment>

    <div className={ style.header }>

      <NavBar style={ { position: 'fixed', top: '0' } } />

    </div>

    <div className={ style.contentContainer }>
      <BodyContent />
    </div>

    <div className={ style.footer }> Copy Rigted by Gorilla </div>

  </React.Fragment>
}


ReactDOM.render( <App />, document.getElementById( 'app' ) )


/**
<Affix>
  <NavBar />
</Affix>

<div className={ style.flexMainContainer }>
  <div className={ `${ style.mainContainerItem } ${ style.main }` }>
    Main
</div>

  <div className={ `${ style.mainContainerItem } ${ style.footer }` }>
    Footer
</div>

</div >
*
*/