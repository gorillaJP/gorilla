import SearchCard from '../SearchCrad'
import React from 'react'
import { Card, Row, Col } from 'antd'
import CreateuserForm from '../CreateUserFrom'
import { Input } from 'antd';
import style from './bodyContent.less'
import SearchBox from './searchBox/SearchBox'
import RegisterNowBox from './registerNow/RegisterNowBox'
import LoginModal from './loginModal/LoginModal'

const Search = Input.Search

class BodyContent extends React.Component {

    constructor( props ) {
        super( props )
        this.state = { showLogin: true }
        this.hideLogin = this.hideLogin.bind( this )
    }

    hideLogin = () => {
        this.setState( { showLogin: false } )
    }


    render() {

        return <React.Fragment>

            <div className={ style.leftNavBar }> </div>
            <div className={ style.middleContent }>

                <div className={ style.moto }>
                    Find Your Dream Job with Gorilla
                </div>


                <div className={ style.SearchArea }>

                    <div className={ style.searchBox }>
                        <SearchBox />
                    </div>

                    {/*
                    <div className={ style.registerNowBox }>
                        <RegisterNowBox />
                    </div>
                    */}

                </div>

                <div>
                </div>

                {
                    ( this.state.showLogin ? <LoginModal hideLogin={ this.hideLogin } /> : '' )
                }

            </div>
            <div className={ style.rightNavBar }> </div>

        </React.Fragment >
    }
}

export default BodyContent



/**
<CreateuserForm />

    <div style={ { paddingBottom: 15, fontSize: '25px', fontWeight: "bold", fontStyle: "italic" } }>
        Search Your Dream Job
</div>

    <SearchCard />



    <Card >

        Create a profile to get hired
</Card>
    <Card >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
    </Card>
    */
