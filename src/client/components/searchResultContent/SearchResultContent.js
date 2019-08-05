import React from 'react'
import AddInstance from './AddInstance/AddInstance'
import style from './searchResultContent.less'
import { Checkbox } from 'antd';




import { Collapse } from 'antd';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const TestComp = () => { return <div style={ { fontWeight: 600 } }>Industry</div> }

class SearchResultContent extends React.Component {


    onChange = ( e ) => {
        console.log( `checked = ${ e.target.checked }` );
    }

    render() {

        return <React.Fragment>


            <div className={ style.searchResultContent }>

                <div className={ style.filterPanel } >
                    <Collapse expandIconPosition='right' bordered={ true }>
                        <Panel header={ <TestComp /> } key="1" showArrow={ true }>
                            <div style={ { display: 'flex', flexDirection: 'column' } }>

                                <div>
                                    <Checkbox onChange={ this.onChange }>IT</Checkbox>
                                </div>

                                <div>
                                    <Checkbox onChange={ this.onChange }>Civil</Checkbox>
                                </div>
                                <div>
                                    <Checkbox onChange={ this.onChange }>Mechanial</Checkbox>
                                </div>

                                <div>
                                    <Checkbox onChange={ this.onChange }>Government</Checkbox>
                                </div>
                                <div>
                                    <Checkbox onChange={ this.onChange }>Office</Checkbox>

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

                    <AddInstance />

                    <AddInstance />

                    <AddInstance />

                    <AddInstance />

                </div>

            </div>

        </React.Fragment >
    }


}

export default SearchResultContent







