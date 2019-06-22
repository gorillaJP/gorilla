import { Form, DatePicker, TimePicker, Button, Input, Select, Upload, Icon } from 'antd';
import React from 'react'

const { Option } = Select;


const { MonthPicker, RangePicker } = DatePicker;

class ProfileInfo extends React.Component {
    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields( ( err, fieldsValue ) => {
            if ( err ) {
                return;
            }

            // Should format date value before submit.
            const rangeValue = fieldsValue[ 'range-picker' ];
            const rangeTimeValue = fieldsValue[ 'range-time-picker' ];
            const values = {
                ...fieldsValue,
                'date-picker': fieldsValue[ 'date-picker' ].format( 'YYYY-MM-DD' ),
                'date-time-picker': fieldsValue[ 'date-time-picker' ].format( 'YYYY-MM-DD HH:mm:ss' ),
                'month-picker': fieldsValue[ 'month-picker' ].format( 'YYYY-MM' ),
                'range-picker': [ rangeValue[ 0 ].format( 'YYYY-MM-DD' ), rangeValue[ 1 ].format( 'YYYY-MM-DD' ) ],
                'range-time-picker': [
                    rangeTimeValue[ 0 ].format( 'YYYY-MM-DD HH:mm:ss' ),
                    rangeTimeValue[ 1 ].format( 'YYYY-MM-DD HH:mm:ss' ),
                ],
                'time-picker': fieldsValue[ 'time-picker' ].format( 'HH:mm:ss' ),
                'nickname': fieldsValue[ 'test   ' ],

            };
            console.log( 'Received values of form: ', values );
        } );
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const config = {
            rules: [ { type: 'object', required: true, message: 'Please select time!' } ],
        };
        const rangeConfig = {
            rules: [ { type: 'array', required: true, message: 'Please select time!' } ],
        };

        const prefixSelector = getFieldDecorator( 'prefix', {
            initialValue: '77',
        } )(
            <Select style={ { width: 70 } }>
                <Option value="77">77</Option>
                <Option value="71">71</Option>
            </Select>,
        );

        const uploadProps = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: 'authorization-text',
            },
            onChange( info ) {
                if ( info.file.status !== 'uploading' ) {
                    console.log( info.file, info.fileList );
                }
                if ( info.file.status === 'done' ) {
                    message.success( `${ info.file.name } file uploaded successfully` );
                } else if ( info.file.status === 'error' ) {
                    message.error( `${ info.file.name } file upload failed.` );
                }
            },
        };

        return (
            <Form onSubmit={ this.handleSubmit } >
                <Form.Item label="First Name">
                    { getFieldDecorator( 'firstName', {
                        rules: [
                            {
                                message: 'Please input your name',
                            },
                        ],
                    } )( <Input placeholder="Please input your name" /> ) }
                </Form.Item>

                <Form.Item label="Surname">
                    { getFieldDecorator( 'surName', {
                        rules: [
                            {
                                message: 'Please input your name',
                            },
                        ],
                    } )( <Input placeholder="Please input your name" /> ) }
                </Form.Item>


                <Form.Item label="District">
                    { getFieldDecorator( 'District', {
                        rules: [ { message: 'Please selcet your city' } ],
                    } )(
                        <Select
                            placeholder="Select a option and change input text above"
                            onChange={ this.handleSelectChange }
                        >
                            <Option value="male">Galle</Option>
                            <Option value="female">Matara</Option>
                        </Select>,
                    ) }
                </Form.Item>

                <Form.Item label="City">
                    { getFieldDecorator( 'City', {
                        rules: [ { message: 'Please selcet your city' } ],
                    } )(
                        <Select
                            placeholder="Select a option and change input text above"
                            onChange={ this.handleSelectChange }
                        >
                            <Option value="male">Ahungalla</Option>
                            <Option value="female">Kalubovila</Option>
                        </Select>,
                    ) }
                </Form.Item>

                <Form.Item label="Mobile Number">
                    { getFieldDecorator( 'phone', {
                        rules: [ { message: 'Please input your phone number!' } ],
                    } )( <Input addonBefore={ prefixSelector } style={ { width: '100%' } } /> ) }
                </Form.Item>



                <Form.Item wrapperCol={ {
                    xs: { span: 24, offset: 0 },
                    sm: { span: 16, offset: 8 }
                } }>

                    { getFieldDecorator( 'resume', {
                        rules: [ { required: true, message: 'Please input your phone number!' } ],
                    } )( <Upload { ...uploadProps }>
                        <Button>
                            <Icon type="upload" /> Upload Resume(CV)
    </Button>
                    </Upload> ) }




                </Form.Item>


                <Form.Item
                    wrapperCol={ {
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 },
                    } }
                >
                    <Button type="primary" htmlType="submit">
                        Save & Continue
          </Button>
                </Form.Item>



            </Form>
        );
    }
}

export default Form.create( { name: 'time_related_controls' } )( ProfileInfo );

