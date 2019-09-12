import style from './addNewJob.less'
import axios from 'axios'
import React from 'react'
import {
    Input,
    Form,
    Select,
    Button,
    AutoComplete,
} from 'antd';

const { TextArea } = Input;

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

function handleChange( value ) {
    console.log( `selected ${ value }` );
}

const children = [];
for ( let i = 10; i < 36; i++ ) {
    children.push( <Option key={ i.toString( 36 ) + i }>{ i.toString( 36 ) + i }</Option> );
}
const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll( ( err, values ) => {
        if ( !err ) {


            axios.post( '/api/jobadds', values )
            console.log( 'Received values of form: ', values );
        }
    } );

};

const addNewJob = ( props ) => {

    const state = {
        confirmDirty: false,
        autoCompleteResult: [ 'dimuthu', 'senanayaka', 'darshana' ],
    };


    payload: axios.get( '/api/meta/allcities' )
        .then( res => {
            return res.data.payload.values
        } )


    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFieldsAndScroll( ( err, values ) => {
            if ( !err ) {


                axios.post( '/api/jobadds', values )
                console.log( 'Received values of form: ', values );
            }
        } );

    };

    const { getFieldDecorator } = props.form;
    const { autoCompleteResult } = state;

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
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };
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

        <div className={ style.addJobOuter }>

            <div className={ style.newJobForm }>
                <Form { ...formItemLayout } onSubmit={ handleSubmit }>

                    <Form.Item label="Job Title">
                        { getFieldDecorator( 'jobTitle', {
                            rules: [
                                {
                                    required: true
                                }
                            ],
                        } )( <Input /> ) }
                    </Form.Item>

                    <Form.Item label="company">
                        { getFieldDecorator( 'company', {
                            rules: [ {
                                required: true
                            } ],
                        } )(
                            <AutoComplete
                                dataSource={ websiteOptions }
                                onChange={ props.handleWebsiteChange }
                                placeholder="website">
                                <Input />
                            </AutoComplete>
                        ) }
                    </Form.Item>

                    <Form.Item label="Location">
                        { getFieldDecorator( 'location', {
                            rules: [
                                {
                                    required: true
                                }
                            ],
                        } )( <Input /> ) }
                    </Form.Item>

                    <Form.Item label="Description">
                        { getFieldDecorator( 'description', {
                            rules: [
                                {
                                    required: true
                                }
                            ],
                        } )( <TextArea rows={ 4 } /> ) }

                    </Form.Item>

                    <Form.Item label="Skills">

                        { getFieldDecorator( 'skills', {
                            rules: [
                                {
                                    required: true
                                }
                            ],
                        } )
                            ( <Select mode="tags" onChange={ handleChange } tokenSeparators={ [ ',' ] }>
                                { children }
                            </Select> )
                        }
                    </Form.Item>

                    <Form.Item { ...tailFormItemLayout }>
                        <Button type="primary" htmlType="submit">
                            Register
                  </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Form.create( { name: 'register' } )( addNewJob );

