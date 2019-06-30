
import React from 'react'
import style from './searchbox.less'
import { Input } from 'antd';
import { Button, AutoComplete } from 'antd';



const dataSource = [ 'Any', 'Galle', 'Colombo', 'Akmeemana', 'Kegalle' ];


class SearchBox extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {}
    }

    clickOnSearch = () => {
        this.setState( { show: true } )
    }

    render() {
        return <React.Fragment>
            <div className={ style.searchBox } >

                <div className={ style.fastAccessMenuBar }>

                    <div className={ style.menuItems }>
                        <a className={ style.menuLinks }>All</a>
                    </div>

                    <div className={ style.menuItems }>
                        <a className={ style.menuLinks }>Software</a>
                    </div>

                    <div className={ style.menuItems }>
                        <a className={ style.menuLinks }>Contract</a>
                    </div>

                    <div className={ style.menuItems }>
                        <a className={ style.menuLinks }>Fresher</a>
                    </div>

                    <div className={ style.menuItems }>
                        <a className={ style.menuLinks }>Part time</a>
                    </div>
                </div>

                <div className={ style.searchInputArea }>

                    <div className={ style.whatBox } onClick={ this.clickOnSearch }>
                        What
                        <Input className={ style.whatInput } size='large' placeholder="Job Title or Company"></Input>
                    </div>

                    <div className={ style.whereBox } onClick={ this.clickOnSearch }>
                        Where
                        <AutoComplete className={ style.whereInput } style={ { width: '100%' } } size='large' dataSource={ dataSource } placeholder="Any" filterOption={ ( inputValue, option ) =>
                            option.props.children.toUpperCase().indexOf( inputValue.toUpperCase() ) !== -1
                        }></AutoComplete>
                    </div>

                    <a className={ style.searchButton }>
                        <Button size='large' type="primary" block>
                            Search
                        </Button>

                    </a>

                </div>

                <div className={ style.advancedSearchLink }>

                    <div>
                        <a className={ style.menuLinks }>Advanced Search</a>
                    </div>
                </div>


            </div>
        </React.Fragment >
    }


}


export default SearchBox
