import React from 'react'
import BodyContent from './bodyContent/BodyContent'
import style from './reactApp.less'
import NavBar from './navbar/NavBar'
import Loading from './utils/Loading'
import { connect } from 'react-redux'

class ReactApp extends React.Component {

    render() {

        return <React.Fragment>

            { /*header */ }
            < div className={ style.header }>
                <NavBar style={ { position: 'fixed', top: '0' } } />
            </div>

            { /*body */ }
            <div className={ style.contentContainer }>
                <BodyContent />
            </div>

            { /*footer */ }
            <div className={ style.footer }> Copy Rigted by Gorilla </div>

            { this.props.showLoading ? <Loading /> : '' }

        </React.Fragment >
    }

}


const mapStateToProps = state => {

    if ( state ) {
        return {
            showLoading: state.loading,
        }
    }
}



export default connect( mapStateToProps, undefined )( ReactApp )
