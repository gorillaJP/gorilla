import React from "react";
import ReactDOM from "react-dom";
import { Input, Row, Col, Form, Select, AutoComplete, DatePicker, Card, Button, Icon } from "antd";

const { Option } = Select;

const { autoOption } = AutoComplete;


const { MonthPicker } = DatePicker

const Search = Input.Search;

function onSelect(value) {
    console.log('onSelect', value);
}

function getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}


function searchResult(query) {
    return new Array(getRandomInt(5))
        .join('.')
        .split('.')
        .map((item, idx) => ({
            query,
            category: `${query}${idx}`,
            count: getRandomInt(200, 100),
        }));
}

function renderOption(item) {
    return (
        <Option key={item.category} text={item.category}>
            <div className="global-search-item">
                <span className="global-search-item-desc">
                    {item.query}
                    <a
                        href={`https://s.taobao.com/search?q=${item.query}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {item.category}
                    </a>
                </span>
                <span className="global-search-item-count">约 {item.count} 个结果</span>
            </div>
        </Option>
    );
}


function onChange(date, dateString) {
    console.log(date, dateString);
}


class EducationDetail extends React.Component {



    state = {
        dataSource: [],
    };

    handleSearch = value => {
        this.setState({
            dataSource: value ? searchResult(value) : [],
        });
    };



    render() {

        const formItemLayout = {
            labelCol: {
                xs: { span: 4 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 8 },
                sm: { span: 8 },
            },
        };

        const { dataSource } = this.state;


        return <div>

            <Card>

                <Form.Item {...formItemLayout} hasFeedback style={{ width: '100%' }} label="Qualification">
                    <Select>
                        <Option value="1">O/L - Ordinary Level</Option>
                        <Option value="3">A/L - Advanced Level</Option>
                        <Option value="4">B.Sc Bachalor of Science</Option>
                        <Option value="5">B.Sc Masters</Option>

                    </Select>
                </Form.Item>


                <Form.Item   {...formItemLayout} label="Institute">

                    <AutoComplete
                        className="global-search"
                        style={{ width: '100%' }}
                        dataSource={dataSource.map(renderOption)}
                        onSelect={onSelect}
                        onSearch={this.handleSearch}
                        optionLabelProp="text">
                    </AutoComplete>

                </Form.Item>

                <Form.Item  {...formItemLayout} label="Started month">
                    <MonthPicker onChange={onChange} />
                </Form.Item>

                <Form.Item  {...formItemLayout} label="End Month">
                    <MonthPicker onChange={onChange} />
                </Form.Item>


                <Row type="flex" justify="center">


                    <Col>
                        <Form.Item >
                            <Button type="danger">Delete</Button>
                        </Form.Item>
                    </Col>
                    <Col offset={1}>
                        <Form.Item >
                            <Button type="primary">Save</Button>
                        </Form.Item>
                    </Col>


                </Row>


            </Card>

        </div >

    }
}

export default EducationDetail