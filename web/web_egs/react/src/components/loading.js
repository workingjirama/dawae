import React from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Icon from 'antd/lib/icon'

export default class Loading extends React.Component {
    constructor() {
        super()
        this.state = {
            dot: 0
        }
        this.max = 3
    }

    componentDidMount() {
        this.loading()
    }

    loading() {
        setTimeout(() => {
            const {dot} = this.state
            this.setState({dot: dot === this.max ? 0 : (dot + 1)})
            this.loading()
        }, 300)
    }

    render() {
        const {dot} = this.state
        return (
            <Row type='flex' justify='center' align='middle' style={{
                height: '50vh', textAlign: 'center'
            }}>
                <Col class='loading' span={24}>
                    <Icon style={{marginRight: 8}} type="loading"/>
                    <span>Loading{Array(dot).fill('.').map(dot_ => dot_)}</span>
                </Col>
            </Row>
        )
    }
}
