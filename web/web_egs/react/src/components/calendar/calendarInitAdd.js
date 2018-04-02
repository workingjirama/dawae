import React from 'react'
import {connect} from 'react-redux'
import {setHeader} from '../../actions/main'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import moment from 'moment'
import {toastr} from 'react-redux-toastr'
import {Tooltip} from 'react-tippy'
import {
    getAllPosition, getAllRoom, getAllTeacher, insertUserRequest, resetRequestAdd,
    setPost
} from "../../actions/request/requestAdd"
import RequestAddTeacher from "../request/requestAddTeacher";
import RequestAddDefense from "../request/requestAddDefense";
import {getDefense} from "../../actions/calendar/calendar";

@connect((store) => {
    return {
        lang: store.language.data,
        teachers: store.requestAdd.teachers,
        positions: store.requestAdd.positions,
        rooms: store.requestAdd.rooms,
        container: store.main.container,
        post: store.requestAdd.post,
        actionItems: store.calendar.actionItems,
    }
})
export default class CalendarInitAdd extends React.Component {

    constructor(props) {
        super(props)
        const {lang} = props
        moment.locale(lang.lang)
    }

    componentWillUnmount() {
        const {dispatch} = this.props
        dispatch(setPost({
            teachers: [],
            defenses: []
        }))
    }

    componentWillUpdate(props) {
        // NOTE:  props is the updated this.props
    }

    componentDidMount() {
        const {dispatch, calendarItem} = this.props
        dispatch(getDefense({
            calendarId: calendarItem.calendar_id,
            actionId: calendarItem.action_id,
            levelId: calendarItem.level_id,
            semesterId: calendarItem.semester_id,
            defenseTypeId: calendarItem.action_id,
            ownerId: calendarItem.owner_id
        }, defense => {
            if (defense === null) return
            let defenses = [{
                date: defense.defense_date,
                end: defense.defense_time_end,
                room: defense.room.room_id,
                start: defense.defense_time_start,
                type: defense.defense_type_id
            }]
            let teachers = []
            defense.committees.map(teacher_ => {
                const teacher = {
                    teacher: teacher_.teacher_id,
                    position: teacher_.position_id
                }
                teachers.push(teacher)
            })
            dispatch(setPost({teachers, defenses}))
        }))
    }

    render() {
        const {lang, calendarItem, teachers, positions, rooms, actionItems, post} = this.props
        return (
            teachers === null || positions === null || rooms === null ? null :
                <div>
                    <div>
                        <div style={{paddingBottom: 10}}>
                            <label style={{paddingRight: 10}}>
                                {lang.requestAdd.committee}
                            </label>
                            <button
                                class='btn btn-default btn-xs'
                                onClick={() => {
                                    toastr.removeByType('message')
                                    toastr.message(lang.requestAdd.addCommittee, {
                                            timeOut: 0,
                                            position: 'top-center',
                                            component: <RequestAddTeacher calendarItem={{
                                                action: {
                                                    action_id: calendarItem.action_id,
                                                    is_defense: true
                                                }
                                            }}/>,
                                            attention: true,
                                            onAttentionClick: (id) => {
                                            }
                                        }
                                    )
                                }}>
                                <i class='fa fa-edit'/>
                                EDIT
                            </button>
                        </div>
                        <div class='table-responsive margin-bottom-20'>
                            <table class='table table-bordered table-vertical-middle nomargin'>
                                <tbody>
                                {
                                    post.teachers.length === 0 ?
                                        <tr>
                                            <td>{lang.nodata}</td>
                                        </tr> :
                                        positions.map((position, idx1) =>
                                            post.teachers.filter((val) => val.position === position.position_id).map((teacher, idx2) =>
                                                <tr key={idx2}>
                                                    <td>{teachers.filter(teacher_ => teacher_.id === teacher.teacher)[0].person_fname + ' ' + teachers.filter(teacher_ => teacher_.id === teacher.teacher)[0].person_lname}</td>
                                                    <td>{positions.filter(position_ => position_.position_id === teacher.position)[0].position_name}</td>
                                                </tr>
                                            )
                                        )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <div style={{paddingBottom: '10px'}}>
                            <label style={{paddingRight: '10px'}}>
                                {lang.requestAdd.defense}
                            </label>
                            <button
                                class='btn btn-default btn-xs'
                                onClick={() => {
                                    toastr.removeByType('message')
                                    toastr.message(lang.requestAdd.addCommittee, {
                                            timeOut: 0,
                                            position: 'top-center',
                                            component: <RequestAddDefense
                                                calendarItem={{
                                                    calendar_item_date_start: null,
                                                    calendar_item_date_end: null,
                                                    owner_id: calendarItem.owner_id,
                                                    calendar: {
                                                        calendar_id: calendarItem.calendar_id
                                                    },
                                                    level: {
                                                        level_id: calendarItem.level_id
                                                    },
                                                    semester: {
                                                        semester_id: calendarItem.semester_id
                                                    },
                                                    request_defense: [
                                                        {
                                                            action: {
                                                                action_id: calendarItem.action_id,
                                                                action_name: actionItems[actionItems.findIndex(actionItem => actionItem.action.action_id === calendarItem.action_id)].action.action_name
                                                            }
                                                        }
                                                    ]
                                                }}
                                                index={0}/>,
                                            attention: true,
                                            onAttentionClick: (id) => {
                                            }
                                        }
                                    )
                                }}>
                                <i class='fa fa-edit'/>
                                EDIT
                            </button>
                        </div>
                        <div class='table-responsive margin-bottom-20'>
                            <table
                                class='table table-bordered table-vertical-middle nomargin'>
                                <tbody>
                                {post.defenses[0] === undefined ?
                                    <tr>
                                        <td>{lang.nodata}</td>
                                    </tr> : [
                                        <tr key='date'>
                                            <td>
                                                {lang.requestAdd.date}
                                            </td>
                                            <td>
                                                {`${moment(new Date(post.defenses[0].date)).format('LL')}`}
                                            </td>
                                        </tr>,
                                        <tr key='time'>
                                            <td>
                                                {lang.requestAdd.time}
                                            </td>
                                            <td>
                                                {`${moment(new Date(`1995-04-16T${post.defenses[0].start}`)).format('LT')} - ${moment(new Date(`1995-04-16T${post.defenses[0].end}`)).format('LT')}`}
                                            </td>
                                        </tr>,
                                        <tr key='room'>
                                            <td>
                                                {lang.requestAdd.room}
                                            </td>
                                            <td>
                                                {rooms.filter(room => room.room_id === post.defenses[0].room)[0].room_name}
                                            </td>
                                        </tr>
                                    ]
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        )
    }
}