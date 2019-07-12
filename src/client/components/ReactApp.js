import React from 'react'
import style from './reactApp.less'
import Loading from './utils/Loading'
import { connect } from 'react-redux'


const LaondingPageBodyContent = React.lazy( () => import( './bodyContent/LaondingPageBodyContent' ) )

const NavBar = React.lazy( () => import( './navbar/NavBar' ) )


class ReactApp extends React.Component {


    render() {

        return <React.Fragment>

            { /*header */ }
            < div className={ style.header }>
                <React.Suspense fallback={ <Loading /> }>
                    <NavBar />
                </React.Suspense>
            </div>

            { /*body */ }
            <div className={ style.contentContainer }>

                { /** 
                <React.Suspense fallback={ <Loading /> }>
                    <BodyContent />
                </React.Suspense>
                */ }

                <React.Suspense fallback={ <Loading /> }>
                    <LaondingPageBodyContent />
                </React.Suspense>

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
