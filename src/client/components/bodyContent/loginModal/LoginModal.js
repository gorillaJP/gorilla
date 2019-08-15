import React from 'react'
import { Form, Icon, Input, Button, Modal, Checkbox } from 'antd';
import style from './loginmodal.less'
import axios from 'axios';
import { connect } from 'react-redux'
import Loading from '../../utils/Loading'
import { loginAction } from '../../../actions/userActions'
import { Link, Redirect } from 'react-router-dom'
import { UI_LOGIN_FAIL_CLEAR } from '../../../actions/types'


function hasErrors( fieldsError ) {
    return Object.keys( fieldsError ).some( field => fieldsError[ field ] );
}


const InvalidLoginDetails = () => {

    return <div className={ style.inavlidLoginDetails }>
        Invalid user name or password
    </div>
}


class HorizontalLoginForm extends React.Component {


    afterClose = () => {
        this.props.loginFailClear()
        this.props.history.push( "/" )
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields( ( err, values ) => {
            this.props.loginFun( values )

        } );
    };

    titleNode = <div className={ style.titleNode }>
        Welcome to Gorilla
    </div >


    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;


        if ( this.props.session ) {
            this.props.history.push( "/" )

        }

        return (

            <React.Fragment>

                <div>

                    <Modal
                        title={ this.titleNode }
                        visible={ true }
                        onOk={ this.handleOk }
                        onCancel={ this.afterClose }
                        footer={ null }
                        afterClose={ this.afterClose }
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
                                            }
                                        ]
                                    } ]

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

                            {
                                this.props.loginFailed ?
                                    <InvalidLoginDetails /> : ''
                            }

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
                            } } className={ style.registerButton } type="primary" className="login-form-button"

                            >
                                <Link to='/register'>Register Now</Link>
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


const mapStateToProps = state => {

    console.log( state.event.loginFailed )

    if ( state ) {
        return {
            session: state.session,
            loginFailed: state.event.loginFailed
        }
    }
}

const mapDispatchtoProps = ( dispatch ) => {
    return {
        loginFun: ( user ) => {
            dispatch( loginAction( user ) )
        },
        loginFailClear: ( () => {
            dispatch( { type: UI_LOGIN_FAIL_CLEAR } )
        } )
    }
}

export default connect( mapStateToProps, mapDispatchtoProps )( WrappedHorizontalLoginForm )