import { Tabs, Select } from 'antd';
import React from 'react'
import CreateLoginInfo from './CreateLoginInfo'
import CreateEmloymentHistory from './CreateEmploymentHistory'
import CreateProfileInfo from './CreateProfileInfo'
import CreateEducation from './CreateEducation'

const { TabPane } = Tabs;
const { Option } = Select;

class CreateUserForm extends React.Component {
    state = {
        tabPosition: 'top',
    };


    render() {
        return (
            <div>
                <div style={ { marginBottom: 16 } }>
                    <h3>
                        Create Profile
                    </h3>

                </div>
                <div>

                    <div style={ { display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' } }>

                        <div style={ { flex: '2 1 800px' } }>
                            <CreateLoginInfo />
                        </div>
                        <div style={ { flex: '2 1 800px' } }>
                            <CreateProfileInfo />
                        </div>
                        <div style={ { flex: '2 1 800px' } }>
                            <CreateEducation />
                        </div>
                        <div style={ { flex: '2 1 800px' } }>
                            <CreateEducation />
                        </div>
                        <div style={ { flex: '2 1 800px' } }>
                            <CreateLoginInfo />
                        </div>
                    </div>


                </div>
            </div >
        );
    }
}

export default CreateUserForm