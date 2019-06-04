import React from 'react'
import { Drawer, Button, Radio } from 'antd';
import LoginForm from '../components/LoginForm'

const RadioGroup = Radio.Group;

class LoginDrawer extends React.Component {
    state = { visible: false, placement: 'right' };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    onChange = e => {
        this.setState({
            placement: e.target.value,
        });
    };

    render() {
        return (
            <div>
                <RadioGroup
                    style={{ marginRight: 8 }}
                    defaultValue={this.state.placement}
                    onChange={this.onChange}
                >
                </RadioGroup>
                <Button type="primary" onClick={this.showDrawer}>
                    Open
        </Button>
                <Drawer
                    title="Basic Drawer"
                    placement={this.state.placement}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    title={null}
                    width={1000}
                >

                    <LoginForm />

                </Drawer>
            </div>
        );
    }
}

export default LoginDrawer