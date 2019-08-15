import React from 'react'
import style from './reactApp.less'
import Loading from './utils/Loading'
import { connect } from 'react-redux'
import Register from './register/register'
import { Route } from "react-router-dom";
import LoginModal from './bodyContent/loginModal/LoginModal';


const LaondingPageBodyContent = React.lazy(() => import('./bodyContent/LaondingPageBodyContent'))

const NavBar = React.lazy(() => import('./navbar/NavBar'))

const SearchResultContent = React.lazy(() => import('./searchResultContent/SearchResultContent'))

class ReactApp extends React.Component {


    render() {

        return <React.Fragment>

            { /*header */}
            <React.Suspense fallback={<Loading />}>
                <NavBar />
            </React.Suspense>


            { /*body */}
            <div className={style.contentContainer}>


                <Route exact path='/' exact strict render={() => {

                    return <React.Suspense fallback={<Loading />}>
                        <LaondingPageBodyContent />
                    </React.Suspense>

                }} />

                {
                    /** 
                    <React.Suspense fallback={<Loading />}>
                        <SearchResultContent />
                    </React.Suspense>
                    */
                }

                <Route exact path='/register' exact strict component={Register} />

                <Route exact path='/login' exact strict component={LoginModal} />



                {
                    /**
                                     <Register />

                     */
                }

            </div>

            { /*footer */}
            <div className={style.footer}> Copy Rigted by Gorilla </div>

            {this.props.showLoading ? <Loading /> : ''}

        </React.Fragment >
    }

}

const mapStateToProps = state => {

    if (state) {
        return {
            showLoading: state.loading,
        }
    }
}

export default connect(mapStateToProps, undefined)(ReactApp)
