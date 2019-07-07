
import React from 'react'
import { Input } from 'antd';
import style from './bodyContent.less'
import SearchBox from './searchBox/SearchBox'



const Search = Input.Search

class BodyContent extends React.Component {

    constructor( props ) {
        super( props )
        this.state = { showLogin: true }
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

            </div>
            <div className={ style.rightNavBar }> </div>

        </React.Fragment >
    }
}



export default BodyContent

