
import React from 'react'
import { Modal } from 'antd';
import LoginForm from '../components/LoginForm'


import { Form, Icon, Input, Button, Checkbox } from 'antd';


class LoginModel extends React.Component {

    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };


    render() {

        return (

            <div>
                <Button type="primary" onClick={this.showModal}>
                    {this.props.lable} </Button>
                <Modal
                    title=""
                    footer={null}
                    centered={true}
                    width='1'
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    closable={false}
                >
                    <LoginForm />
                </Modal>
            </div>

        );

    }
}

export default LoginModel