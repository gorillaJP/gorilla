import React, { useEffect, useState } from 'react'
import AddInstance from './AddInstance/AddInstance'
import style from './searchResultContent.less'
import { Checkbox } from 'antd';
import axios from 'axios'
import { connect } from 'react-redux'



import { Collapse } from 'antd';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const TestComp = () => { return <div style={ { fontWeight: 600 } }>Industry</div> }


const SearchResultContent = ( props ) => {

    const [ jobAdds, setJobAdds ] = useState( [] )

    const test = {}

    useEffect( () => {

        props.loading( true )

        axios.get( '/api/jobadds' )
            .then( resp => {
                setJobAdds( resp.data.payload )
            } )
            .finally( () => {
                props.loading( false )
            } )
    }, [] )


    const onChange = () => { }

    return <React.Fragment>


        <div className={ style.searchResultContent }>

            <div className={ style.filterPanel } >
                <Collapse expandIconPosition='right' bordered={ true }>
                    <Panel header={ <TestComp /> } key="1" showArrow={ true }>
                        <div style={ { display: 'flex', flexDirection: 'column' } }>

                            <div>
                                <Checkbox onChange={ onChange }>IT</Checkbox>
                            </div>

                            <div>
                                <Checkbox onChange={ onChange }>Civil</Checkbox>
                            </div>
                            <div>
                                <Checkbox onChange={ onChange }>Mechanial</Checkbox>
                            </div>

                            <div>
                                <Checkbox onChange={ onChange }>Government</Checkbox>
                            </div>
                            <div>
                                <Checkbox onChange={ onChange }>Office</Checkbox>

                            </div>


                        </div>
                    </Panel>
                    <Panel header="This is panel header 2" key="2">
                        <p>{ text }</p>
                    </Panel>
                    <Panel header="This is panel header 3" key="3">
                        <p>{ text }</p>
                    </Panel>
                </Collapse>
            </div>

            <div className={ style.matchingJobsPanel }>
                {
                    jobAdds.map( ( jobAdd, i ) => {
                        return < AddInstance jobAdd={ jobAdd } />
                    } )
                }
            </div>

        </div>

    </React.Fragment >

}

const mapDispatchtoProps = dispath => {

    return {
        loading: loading => {
            if ( loading )
                dispath( { type: 'PENDING' } )
            else
                dispath( { type: 'FULFILLED' } )
        }
    }

}


export default connect( undefined, mapDispatchtoProps )( SearchResultContent )





