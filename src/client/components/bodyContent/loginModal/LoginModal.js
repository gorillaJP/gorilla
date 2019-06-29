import React from 'react'
import { Form, Icon, Input, Button, Modal, Checkbox } from 'antd';
import style from './loginmodal.less'
import axios from 'axios'

function hasErrors( fieldsError ) {
    return Object.keys( fieldsError ).some( field => fieldsError[ field ] );
}

class HorizontalLoginForm extends React.Component {


    componentDidMount() {
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields( ( err, values ) => {

            axios.post( '/api/login', values ).then( res => {

                if ( res.status === 200 ) {
                    this.props.hideLogin()
                }

            } ).catch( err => {
                callback( 'Error at validating' )
            } )

        } );
    };

    state = { visible: true };

    showModal = () => {
        this.setState( {
            visible: true,
        } );
    };

    handleOk = e => {
        console.log( e );
        this.setState( {
            visible: false,
        } );
    };

    handleCancel = e => {
        console.log( e );
        this.setState( {
            visible: false,
        } );
    };

    titleNode = <div className={ style.titleNode }>
        Welcome to Gorilla
    </div >

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const usernameError = isFieldTouched( 'username' ) && getFieldError( 'username' );
        const passwordError = isFieldTouched( 'password' ) && getFieldError( 'password' );


        return (



            <React.Fragment>
                <div>


                    <Modal
                        title={ this.titleNode }
                        visible={ this.state.visible }
                        onOk={ this.handleOk }
                        onCancel={ this.handleCancel }
                        footer={ null }
                    >


                        <Form onSubmit={ this.handleSubmit } className="login-form">
                            <Form.Item>
                                { getFieldDecorator( 'username', {
                                    validate: [ {
                                        trigger: 'onBlur',
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please enter a username',
                                            },
                                            {
                                                /*
                                                validator: ( rule, value, callback ) => {

                                                    if ( value )
                                                        axios.get( '/api/exist/seeker/username/' + value ).then( res => {

                                                            if ( res.data.payload.count != 0 ) {
                                                                callback( 'This username is not available' )
                                                            }
                                                            else {
                                                                callback()
                                                            }
                                                        } ).catch( err => {
                                                            callback( 'Error at validating' )
                                                        } )
                                                    else {
                                                        callback()
                                                    }

                                                },
                                                */
                                            },
                                        ],
                                    } ],

                                } )(
                                    <Input size="large"
                                        prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                                        placeholder="Username"
                                    />,
                                ) }


                            </Form.Item>
                            <Form.Item>
                                { getFieldDecorator( 'password', {
                                    rules: [ { required: true, message: 'Please input your Password!' } ],
                                } )(
                                    <Input size="large"
                                        prefix={ <Icon type="lock" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                                        type="password"
                                        placeholder="Password"
                                    />,
                                ) }
                            </Form.Item>
                            <Button style={ {
                                size: 'large ',
                                width: '100%', marginBottom: '10px',
                                marginTop: '20px'
                            } } className={ style.loginButton } type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>

                            <Button style={ {
                                size: 'large ',
                                width: '100%',
                                marginBottom: '20px'
                            } } className={ style.registerButton } type="primary" htmlType="submit" className="login-form-button">
                                Register Now
                            </Button>


                            <Form.Item>
                                { getFieldDecorator( 'remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                } )( <Checkbox>Remember me</Checkbox> ) }
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

const WrappedHorizontalLoginForm = Form.create( { name: 'horizontal_login' } )( HorizontalLoginForm );


export default WrappedHorizontalLoginForm