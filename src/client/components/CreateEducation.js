import { Form, DatePicker, TimePicker, Row, Col, Button, Input, Select, Upload, Icon } from 'antd';

import React from 'react'

import EducationDetail from './EducationDetail'

const { Option } = Select;


const { MonthPicker, RangePicker } = DatePicker;

let id = 0;

class CreateEducation extends React.Component {

    remove = k => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue( 'keys' );
        // We need at least one passenger
        if ( keys.length === 1 ) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue( {
            keys: keys.filter( key => key !== k ),
        } );
    };

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue( 'keys' );
        const nextKeys = keys.concat( id++ );
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue( {
            keys: nextKeys,
        } );
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields( ( err, values ) => {
            if ( !err ) {
                const { keys, names } = values;
                console.log( 'Received values of form: ', values );
                console.log( 'Merged values:', keys.map( key => names[ key ] ) );
            }
        } );
    };

    render() {

        const { getFieldDecorator, getFieldValue } = this.props.form;

        getFieldDecorator( 'keys', { initialValue: [ {} ] } );
        const keys = getFieldValue( 'keys' );
        const formItems = keys.map( ( k, index ) => (
            <div>
                <EducationDetail />
            </div >

        ) );

        return <div>


            <Form onSubmit={ this.handleSubmit }>
                { formItems }
                <Form.Item>
                    <Button type="dashed" onClick={ this.add } style={ { width: '100%' } }>
                        <Icon type="plus" /> Add More Education
                            </Button>
                </Form.Item>
            </Form>



        </div >
    }

}

export default Form.create( { name: 'time_related_controls' } )( CreateEducation );

