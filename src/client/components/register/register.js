import React from 'react'
import { Form, Icon, Input, Button, Modal, Checkbox } from 'antd';
import style from './register.less'
import { registerAction } from '../../actions/userActions'
import { isValidUsreNameAction, isValidEmailAction } from '../../actions/validationActions'

import { connect } from 'react-redux'

const Lable = (props) => {

    return <div style={{ display: 'inline-block', width: '100px' }}>
        <div style={{ display: 'inline', color: 'red' }} >
            {props.required ? '* ' : ''}
        </div>
        <div style={{ display: 'inline' }}>
            {props.text}
        </div>
    </div >

}

const nameLabel = <Lable text="Name" required={true} />
const surName = <Lable text="Surname" required={true} />
const email = <Lable text="Email" required={true} />
const username = <Lable text="Username" required={true} />
const password = <Lable text="Password" required={true} />

class Register extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            if (err)
                return
            this.props.registerFun(values)
        });
    };

    render() {

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;


        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 10 },
        };

        return <React.Fragment>

            <div className={style.bodyContainer}>

                <div className={style.formContainer}>

                    <Form hideRequiredMark={true} onSubmit={this.handleSubmit} className={style.form}  {...formItemLayout} >
                        <Form.Item label={nameLabel}>
                            {getFieldDecorator('name', {
                                validate: [{
                                    trigger: 'onBlur',
                                    rules: [
                                        {
                                            required: true,
                                            message: <div style={{ display: 'inline' }}></div>
                                        }
                                    ]
                                }]

                            })(
                                <Input />,
                            )}

                        </Form.Item>

                        <Form.Item label={email} hasFeedback>
                            {getFieldDecorator('email', {
                                validate: [{
                                    trigger: 'onBlur',
                                    rules: [
                                        {
                                            required: true,
                                            message: <div></div>,
                                        },
                                        {
                                            type: "email",
                                            message: <div>Invalid email address</div>,

                                        },
                                        {
                                            validator: this.props.isValidEmailFunc
                                        }
                                    ]
                                }]

                            })(
                                <Input
                                />
                            )}

                        </Form.Item>

                        <Form.Item label={username} hasFeedback>
                            {getFieldDecorator('username', {
                                validate: [{
                                    trigger: 'onBlur',
                                    rules: [
                                        {
                                            required: true,
                                            message: <div></div>
                                        },
                                        {
                                            min: 4,
                                            message: <div>Username should be longer than 3 letters</div>
                                        },
                                        {
                                            validator: this.props.isValidUserNameFunc
                                        }
                                    ]
                                }]

                            })(
                                <Input
                                />,
                            )}

                        </Form.Item>

                        <Form.Item label={password} >
                            {getFieldDecorator('password', {
                                validate: [{
                                    trigger: 'onBlur',
                                    rules: [
                                        {
                                            required: true,
                                            message: <div></div>
                                        },
                                        {
                                            min: 4,
                                            message: <div>Password should be longer than 3 letters</div>
                                        }
                                    ]
                                }]

                            })(
                                <Input
                                    type="password"
                                />,
                            )}

                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 10, offset: 5 }}>

                            <Button style={{
                                size: 'large ',
                                width: '100%', marginBottom: '10px',
                                marginTop: '20px'
                            }} type="primary" htmlType="submit" className="login-form-button">
                                Register
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            </div>
        </React.Fragment >
    }
}


const mapDispatchtoProps = (dispatch) => {
    return {
        registerFun: (user) => {
            dispatch(registerAction(user))
        },
        isValidUserNameFunc: (rule, value, callback) => {
            dispatch(isValidUsreNameAction(rule, value, callback))
        },
        isValidEmailFunc: (rule, value, callback) => {
            dispatch(isValidEmailAction(rule, value, callback))
        }
    }
}


const RegisterForm = Form.create({ name: 'register' })(Register);

export default connect(undefined, mapDispatchtoProps)(RegisterForm)