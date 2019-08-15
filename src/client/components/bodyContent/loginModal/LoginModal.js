import React from 'react'
import { Form, Icon, Input, Button, Modal, Checkbox } from 'antd';
import style from './loginmodal.less'
import axios from 'axios';
import { connect } from 'react-redux'
import Loading from '../../utils/Loading'
import { loginAction } from '../../../actions/userActions'
import { Link, Redirect } from 'react-router-dom'


function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}


const InvalidLoginDetails = () => {

    return <div className={style.inavlidLoginDetails}>
        Invalid user name or password
    </div>
}


class HorizontalLoginForm extends React.Component {


    constructor(props) {
        console.log(props)

        super(props)
        this.state = {
            loginFailed: false, visible: true
        }
    }

    /* get called just before render method */
    componentDidUpdate(prevProps) {

        console.log('ttx')
        console.log(this.props.loginFailed)
        console.log(this.state.loginFailed)

        console.log(this.props)
        console.log(prevProps)



        if (this.props.loginFailed != this.state.loginFailed && this.props.loginFailed) {
            return { loginFailed: true }
        }

    }


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            this.props.loginFun(values)

        });
    };

    state = { visible: true };

    showModal = () => {
        console.log('showModal')
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log('handleOk')

        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log('handleCancel')

        console.log(e);
        this.setState({
            visible: false,
        });
    };

    afterClose = () => {
        this.setState({
            visible: false,
        });
    }

    titleNode = <div className={style.titleNode}>
        Welcome to Gorilla
    </div >




    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const usernameError = isFieldTouched('username') && getFieldError('username');
        const passwordError = isFieldTouched('password') && getFieldError('password');


        console.log(this.props.user)
        if (!this.state.visible || this.props.session) {
            return <Redirect to='/' />

        }

        return (

            <React.Fragment>

                <div>

                    <Modal
                        title={this.titleNode}
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.afterClose}
                        footer={null}
                        afterClose={this.afterClose}
                    >


                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    validate: [{
                                        trigger: 'onBlur',
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please enter a username',
                                            }
                                        ]
                                    }]

                                })(
                                    <Input size="large"
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                    />,
                                )}

                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input size="large"
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />,
                                )}
                            </Form.Item>

                            {
                                this.state.loginFailed ?
                                    <InvalidLoginDetails /> : ''
                            }

                            <Button style={{
                                size: 'large ',
                                width: '100%', marginBottom: '10px',
                                marginTop: '20px'
                            }} className={style.loginButton} type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>

                            <Button style={{
                                size: 'large ',
                                width: '100%',
                                marginBottom: '20px'
                            }} className={style.registerButton} type="primary" className="login-form-button"

                            >
                                <Link to='/register'>Register Now</Link>
                            </Button>


                            <Form.Item>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(<Checkbox>Remember me</Checkbox>)}
                                <a className="login-form-forgot" href="">
                                    Forgot password
                                </a>

                            </Form.Item>
                        </Form>
                    </Modal>

                </div>

            </React.Fragment >

        );
    }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);


const mapStateToProps = state => {

    console.log('rr-', state.event.loginFailed)
    if (state) {
        return {
            session: state.session,
            loginFailed: state.event.loginFailed
        }
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        loginFun: (user) => {

            dispatch(loginAction(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(WrappedHorizontalLoginForm)