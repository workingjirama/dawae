import React from 'react'
import {connect} from 'react-redux'
import Modal from 'antd/lib/modal'
import Icon from 'antd/lib/icon'
import Tag from 'antd/lib/tag'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Collapse from 'antd/lib/collapse'
import RequestProcess from "./request-process";
import Tabs from 'antd/lib/tabs';

const {TabPane} = Tabs

@connect((store) => {
    return {
        lang: store.language.data,
        status: store.requestData.status
    }
})
export default class RequestOpen extends React.Component {
    constructor() {
        super()
        this.state = {
            open: false
        }
    }

    open() {
        this.setState({open: true})
    }

    close = () => {
        this.setState({open: false});
    }

    render() {
        const {lang, current, userRequest, status, index} = this.props
        return status === null ? null : (
            <div>
                <Tag key='btn' onClick={() => this.open()} class='tag-default clickable'>
                    CLICK ME
                </Tag>
                <Modal key='md' footer={null} title='HEADER' destroyOnClose
                       visible={this.state.open} onCancel={() => this.close()}>
                    <Tabs defaultActiveKey="1" size={2}>
                        <TabPane tab="Tab 1" key={1}>
                            {
                                userRequest.advisors.length === 0 ? null :
                                    userRequest.advisors.map(
                                        (advisor, index) =>
                                            <Row key={index}>
                                                <Col sm={12} span={24}>
                                                    {`${advisor.teacher.prefix} ${advisor.teacher.person_fname} ${advisor.teacher.person_lname}`}
                                                </Col>
                                                <Col sm={12} span={24}>
                                                    {advisor.position.position_name}
                                                </Col>
                                            </Row>
                                    )
                            }
                            {
                                userRequest.defenses.length === 0 ? null :
                                    userRequest.defenses.map(
                                        (defense, index) =>
                                            <Row key={index}>
                                                <Col span={24}>
                                                    <Row>
                                                        <Col sm={12} span={24}>
                                                            TYPE
                                                        </Col>
                                                        <Col sm={12} span={24}>
                                                            {defense.defense_type.action_name}
                                                        </Col>
                                                        <Col sm={12} span={24}>
                                                            DATE
                                                        </Col>
                                                        <Col sm={12} span={24}>
                                                            {`${defense.defense_date} ${defense.defense_time_start} - ${defense.defense_time_end}`}
                                                        </Col>
                                                        <Col sm={12} span={24}>
                                                            PLACE
                                                        </Col>
                                                        <Col sm={12} span={24}>
                                                            {defense.room.room_name}
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col span={24}>
                                                    {
                                                        defense.committees.map(
                                                            (committee, index) =>
                                                                <Row key={index}>
                                                                    <Col sm={12} span={24}>
                                                                        {`${committee.teacher.prefix} ${committee.teacher.person_fname} ${committee.teacher.person_lname}`}
                                                                    </Col>
                                                                    <Col sm={12} span={24}>
                                                                        {committee.position.position_name}
                                                                    </Col>
                                                                </Row>
                                                        )
                                                    }
                                                </Col>
                                            </Row>
                                    )
                            }
                        </TabPane>
                        <TabPane tab="Tab 2" key={2}>
                            <RequestProcess index={index} userRequest={userRequest}/>
                        </TabPane>
                    </Tabs>

                </Modal>
            </div>
        )
    }
}