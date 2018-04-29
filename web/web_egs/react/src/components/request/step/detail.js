import React from 'react'
import {connect} from 'react-redux'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Loading from "../../loading";
import Button from "../step/button";

@connect((store) => {
    return {
        lang: store.language.data,
        calendarItem: store.requestAdd.calendarItem
    }
})
export default class Detail extends React.Component {
    render() {
        const {lang, calendarItem} = this.props
        return [
            calendarItem === null ?
                <Loading key='load'/> :
                <Row class='step' key='step'>
                    <Col span={24}>
                        {calendarItem.action.action_name}
                    </Col>
                    <Col span={24}>
                        {calendarItem.calendar.calendar_id}
                    </Col>
                    <Col span={24}>
                        {calendarItem.semester.semester_name}
                    </Col>
                    <Col span={24}>
                        {calendarItem.level.level_name}
                    </Col>
                </Row>,
            <Button key='btn' validate={() => {
                return true
            }}/>
        ]
    }
}