import React from 'react'
import Steps from 'antd/lib/steps'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Icon from 'antd/lib/icon'

const Step = Steps.Step;

export default class Test extends React.Component {
    constructor() {
        super()
        this.state = {
            current: 0
        }
        this.steps = [
            {
                title: 'FIRST',
                content: '1st CONTENT'
            },
            {
                title: 'SECOND',
                content: '2nd CONTENT'
            },
            {
                title: 'THIRD',
                content: '3rd CONTENT'
            }
        ]
    }

    previous() {
        let current = this.state.current - 1
        if (current < 0) current = 0
        this.setState({current})
    }

    next() {
        let current = this.state.current + 1
        if (current > this.steps.length - 1) current = this.steps.length - 1
        this.setState({current})
    }

    done() {
        alert('insert')
    }

    render() {
        const {current} = this.state
        console.log(current)
        return (
            <div>
                <Steps current={current}>
                    {
                        this.steps.map(
                            (step, index) =>
                                <Step key={index} title={step.title}/>
                        )
                    }
                </Steps>
                <div>{this.steps[current].content}</div>
                <Row type='flex' justify='space-between'>
                    <Col>
                        {
                            current === 0 ? null :
                                <button
                                    class='btn btn-default btn-3d'
                                    onClick={() => this.previous()}>
                                    <Icon type='arrow-left'/>
                                    PREVIOUS
                                </button>
                        }
                    </Col>
                    <Col>
                        {
                            current === this.steps.length - 1 ?
                                <button
                                    class='btn btn-success btn-3d'
                                    onClick={() => this.done()}>
                                    <Icon type='plus'/>
                                    INSERT
                                </button> :
                                <button
                                    class='btn btn-blue btn-3d'
                                    onClick={() => this.next()}>
                                    <Icon type='arrow-right'/>
                                    NEXT
                                </button>
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}
