import React from 'react'
import {connect} from 'react-redux'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Button from "./button"
import {insert} from './../../../actions/request/requestAdd'
import moment from 'moment'
import {URL} from "../../../config";

@connect((store) => {
    return {
        lang: store.language.data,
        post: store.requestAdd.post,
        positions: store.requestAdd.positions,
        teachers: store.requestAdd.teachers,
        calendarItem: store.requestAdd.calendarItem,
        rooms: store.requestAdd.rooms,
        config: store.main.config
    }
})
export default class Summary extends React.Component {

    constructor(props) {
        super(props)
        const {lang} = props
    }

    validate() {
        this.insert()
        return true
    }

    insert() {
        const {post, calendarItem, dispatch, config} = this.props
        dispatch(insert(post, calendarItem, response => {
            window.location = calendarItem.action.action_type_id === config.ACTION_INIT_TYPE ? `${URL.EGS_BASE}/#/calendar-init` : `${URL.EGS_BASE}/#/requestList`
        }))
    }

    sort(first, second) {
        return first.position - second.position
    }

    render() {
        const {lang, post, positions, teachers, calendarItem, rooms} = this.props
        return [
            <Row key='step' class='step' type="flex" justify="space-between">
                <Col class='text-center' span={24}>
                    <h3>TEACHER LIST</h3>
                </Col>
                {
                    post.teachers.length === 0 ? <Col class='text-center' span={24}>{lang.nodata}</Col> :
                        post.teachers.sort(this.sort).map(
                            (teacher, index) => {
                                const person = teachers[teachers.findIndex(_teacher => _teacher.id === teacher.teacher)]
                                const position = positions[positions.findIndex(position => position.position_id === teacher.position)]
                                return [
                                    <Col class='text-center' key={`t${index}`} span={12}>
                                        {`${person.prefix} ${person.person_fname} ${person.person_lname}`}
                                    </Col>,
                                    <Col class='text-center' key={`p${index}`} span={12}>
                                        {position.position_name}
                                    </Col>
                                ]
                            }
                        )
                }
                {
                    calendarItem.request_defense.map(
                        (defense, index) => [
                            <Col key={`def${index}`} class='text-center' span={24}>
                                <h3>{defense.action.action_name}</h3>
                            </Col>,
                            post.defenses.length === 0 ?
                                <Col key={index} class='text-center' span={24}>
                                    {lang.nodata}
                                </Col> : [
                                    <Col key={`date${index}`} class='text-center' span={24}>
                                        {`${moment(new Date(post.defenses[index].date)).format('LL')}`}
                                    </Col>,
                                    <Col key={`time${index}`} class='text-center' span={24}>
                                        {`${moment(new Date(`${post.defenses[index].date}T${post.defenses[index].start}`)).format('LT')} - ${moment(new Date(`${post.defenses[index].date}T${post.defenses[index].end}`)).format('LT')}`}
                                    </Col>,
                                    <Col key={`room${index}`} class='text-center' span={24}>
                                        {rooms.filter(room => room.room_id === post.defenses[index].room)[0].room_name}
                                    </Col>
                                ]
                        ]
                    )
                }
            </Row>,
            <Button key='btn' validate={() => this.validate()}/>
        ]
    }
}