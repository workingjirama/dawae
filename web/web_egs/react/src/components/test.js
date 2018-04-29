import React from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'

export default class Test extends React.Component {
    render() {
        return (
            <Row type="flex">
                <Col style={{border: '1px red solid'}} span={6}>col-order-1</Col>
                <Col style={{border: '1px red solid'}} span={6}>col-order-2</Col>
                <Col style={{border: '1px red solid'}} span={6}>col-order-3</Col>
                <Col style={{border: '1px red solid'}} span={6}>col-order-4</Col>
            </Row>
        )
    }
}
