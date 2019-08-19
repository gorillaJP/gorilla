
import React, { useState, useEffect } from 'react'
import style from './searchbox.less'
import { Input } from 'antd';
import { Button, AutoComplete } from 'antd';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'






const SearchBox = ( props ) => {

    const [ what, setWhat ] = useState( null );
    const [ where, setWhere ] = useState( null );
    const [ jobs, setJobs ] = useState( null );


    return <React.Fragment>

        { jobs }
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

                <div className={ style.whatBox } onClick={ () => { } }>
                    What
                        <Input onChange={ ( e ) => { setWhat( e.target.value ) } } className={ style.whatInput } size='large' placeholder="Job Title or Company"></Input>
                </div>

                <div className={ style.whereBox } onClick={ () => { } }>
                    Where
                        <AutoComplete
                        className={ style.whereInput }
                        style={ { width: '100%' } }
                        size='large'
                        onChange={ ( e ) => { setWhere( e ) } }
                        dataSource={ props.meta }
                        placeholder="Any"
                        filterOption={ ( inputValue, option ) =>
                            option.props.children.toUpperCase().indexOf( inputValue.toUpperCase() ) !== -1
                        }>
                    </AutoComplete>
                </div>

                <a className={ style.searchButton }>
                    <Button size='large' type="primary" block>
                        <Link to='/jobSearchResult'>Search</Link>
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

const mapStateToProps = ( state ) => {

    return {
        meta: state.meta
    }

}


export default connect( mapStateToProps, null )( SearchBox )