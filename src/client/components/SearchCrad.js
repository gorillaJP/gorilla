import React from "react";
import ReactDOM from "react-dom";
import { Input, Row, Col } from "antd";


const Search = Input.Search;

class SearchCard extends React.Component {

    render() {
        return <div >

            <Row>
                <Col span={12}>
                    <Search
                        placeholder="job title or company name"
                        enterButton="Search"
                        size="large"
                        onSearch={value => console.log(value)}
                    />
                </Col>
                <Col span={12}> </Col>
            </Row>

        </div>

    }
}

export default SearchCard