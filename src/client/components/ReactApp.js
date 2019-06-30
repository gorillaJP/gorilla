import React from 'react'
import BodyContent from './bodyContent/BodyContent'
import style from './reactApp.less'
import NavBar from './navbar/NavBar'

const ReactApp = () => {

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


export default ReactApp