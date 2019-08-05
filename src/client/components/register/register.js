
import React from 'react'
import { Form, Icon, Input, Button, Modal, Checkbox } from 'antd';
import style from './register.less'




class Register extends React.Component {


    render() {

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;


        return <React.Fragment { ...formItemLayout }>

            <div className={ style.bodyContainer }>



                <div className={ style.leftPanel }>

                    <Form.Item label="First Name" >
                        { getFieldDecorator( 'firstName', {
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
                            <Input
                            />,
                        ) }

                    </Form.Item>

                    <Form.Item label="Surname" >
                        { getFieldDecorator( 'surName', {
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
                            <Input
                                placeholder="Sur Name"
                            />,
                        ) }

                    </Form.Item>

                </div>
                <div className={ style.rightPanel }>

                    <Form.Item label="First Name" >
                        { getFieldDecorator( 'firstName', {
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
                            <Input
                            />,
                        ) }

                    </Form.Item>





                </div>


            </div>



        </React.Fragment >
    }

}

const RegisterForm = Form.create( { name: 'register' } )( Register );

export default RegisterForm







