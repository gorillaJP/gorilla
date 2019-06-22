import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
} from 'antd';


import axios from 'axios'

import React from 'react'

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];

class CreateLoginInfo extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll( ( err, values ) => {
            if ( !err ) {
                console.log( 'Received  ', values );
                axios.post( '/api/seeker', values )
                    .then( function ( response ) {
                        console.log( response );
                    } )
                    .catch( function ( error ) {
                        console.log( error );
                    } );
            }
        } );
    };

    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState( { confirmDirty: this.state.confirmDirty || !!value } );
    };

    compareToFirstPassword = ( rule, value, callback ) => {
        const form = this.props.form;
        if ( value && value !== form.getFieldValue( 'password' ) ) {
            callback( 'Two passwords that you enter is inconsistent!' );
        } else {
            callback();
        }
    };

    validateToNextPassword = ( rule, value, callback ) => {
        console.log( value )
        const form = this.props.form;
        console.log( form.getFieldValue( 'password' ) )

        if ( value && this.state.confirmDirty ) {
            form.validateFields( [ 'confirm' ], { force: true } );
        }
        callback();
    };

    handleWebsiteChange = value => {
        let autoCompleteResult;
        if ( !value ) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = [ '.com', '.org', '.net' ].map( domain => `${ value }${ domain }` );
        }
        this.setState( { autoCompleteResult } );
    };

    render() {
        const { getFieldDecorator, setFieldsValue } = this.props.form;
        const { autoCompleteResult } = this.state;


        const prefixSelector = getFieldDecorator( 'prefix', {
            initialValue: '86',
        } )(
            <Select style={ { width: 70 } }>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>,
        );

        const websiteOptions = autoCompleteResult.map( website => (
            <AutoCompleteOption key={ website }>{ website }</AutoCompleteOption>
        ) );



        return (


            <Form onSubmit={ this.handleSubmit } style={ { flexWrap: 'wrap', display: 'flex', justifyContent: 'space-between' } }>

                <div style={ { width: '45%', minWidth: '400px' } }>
                    <Form.Item
                        label={
                            <span>
                                user name &nbsp;
                        </span>
                        }
                        hasFeedback
                    >
                        { getFieldDecorator( 'username', {
                            initialValue: this.state.defName,

                            validate: [ {
                                trigger: 'onBlur',
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please enter a username',
                                    },
                                    {
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
                                    },
                                ],
                            } ],
                        } )( <Input /> ) }
                    </Form.Item>


                    <Form.Item label="Password" hasFeedback>
                        { getFieldDecorator( 'password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                            ],
                        } )( <Input.Password /> ) }
                    </Form.Item>
                </div>
                <div style={ { width: '45%', minWidth: '400px' } }>
                    <Form.Item label="Confirm Password" hasFeedback>
                        { getFieldDecorator( 'confirm', {
                            validate: [ {
                                trigger: 'onBlur',

                                rules: [
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    {
                                        validator: this.compareToFirstPassword,
                                    },
                                ],
                            } ],


                        } )( <Input.Password onBlur={ this.handleConfirmBlur } /> ) }
                    </Form.Item>


                    <Form.Item label="E-mail" hasFeedback>
                        { getFieldDecorator( 'email', {
                            validate: [
                                {
                                    trigger: 'onBlur',
                                    rules: [
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ]
                                }
                            ]
                        } )( <Input /> ) }
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save & Continue
                    </Button>
                    </Form.Item>
                </div>
            </Form >
        );
    }
}

export default Form.create( { name: 'register' } )( CreateLoginInfo );
