import SearchCard from '../components/SearchCrad'
import React from 'react'
import { Card, Row, Col } from 'antd'
import CreateuserForm from './CreateUserFrom'

class MiddleContent extends React.Component {

    render() {

        return <div id="middleContent">


            <CreateuserForm  />

            <div style={{ paddingBottom: 15, fontSize: '25px', fontWeight: "bold", fontStyle: "italic" }}>
                Search Your Dream Job
            </div>

            <SearchCard />

            <Row style={{ paddingTop: '20px' }}>
                <Col span={6}  >
                    <Card style={{ width: 300 }}>

                        Create a profile to get hired
                    </Card>
                </Col>
                <Col span={6} >
                    <Card style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
            </Row>

        </div>

    }
}

export default MiddleContent