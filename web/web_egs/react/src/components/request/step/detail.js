import React from 'react'
import {connect} from 'react-redux'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Loading from '../../loading';
import Button from '../step/button';
import DetailProject from './detail-project';
import Tag from 'antd/lib/tag'
import Card from 'antd/lib/card'

@connect((store) => {
    return {
        lang: store.language.data,
        calendarItem: store.requestAdd.calendarItem,
        project: store.requestAdd.project
    }
})
export default class Detail extends React.Component {

    validate() {
        const {project, calendarItem} = this.props
        return !(calendarItem.action.action_project && project === null)
    }

    render() {
        const {lang, calendarItem, project} = this.props
        return [
            calendarItem === null ?
                <Loading key='load'/> :
                <Row type='flex' class='step' justify='center' key='step'>
                    <Col span={24}>
                        <Card>
                            <Col style={{marginBottom: 16}} span={24}>
                                <Tag class='tag-default'>{calendarItem.action.action_name}</Tag>
                            </Col>
                            <Col style={{marginBottom: 16}} span={24}>
                                <Tag class='tag-default'>{calendarItem.calendar.calendar_id}</Tag>
                            </Col>
                            <Col style={{marginBottom: 16}} span={24}>
                                <Tag class='tag-default'>{calendarItem.semester.semester_name}</Tag>
                            </Col>
                            <Col span={24}>
                                <Tag class='tag-default'>{calendarItem.level.level_name}</Tag>
                            </Col>
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card>
                            {
                                !calendarItem.action.action_project ? null :
                                    <DetailProject/>
                            }
                        </Card>
                    </Col>
                </Row>,
            <Button key='btn' validate={() => this.validate()}/>
        ]
    }
}