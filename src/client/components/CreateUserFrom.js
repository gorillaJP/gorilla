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
                <div style={{ marginBottom: 16 }}>
                    Create Profile
                </div>
                <div >
                    <Tabs tabPosition={this.state.tabPosition} >
                        <TabPane tab="Login Details" key="1">
                            <CreateLoginInfo />
                        </TabPane>
                        <TabPane tab="Personal Info" key="8">
                            <CreateProfileInfo />
                        </TabPane>
                        <TabPane tab="Education" key="3">
                            <CreateEducation />
                        </TabPane>
                        <TabPane tab="Employment History" key="2">
                            <CreateEducation />
                        </TabPane>


                        <TabPane tab="Skills" key="4">
                            <CreateLoginInfo />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default CreateUserForm