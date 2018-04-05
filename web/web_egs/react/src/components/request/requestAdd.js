import React from 'react'
import {connect} from 'react-redux'
import {Tooltip} from 'react-tippy'
import {showLoading, hideLoading} from 'react-redux-loading-bar'
import is from 'is_js'
import {toastr} from 'react-redux-toastr'
import {Link} from 'react-router-dom'
import {setHeader} from "../../actions/main";
import {URL} from "../../config";
import {
    getAllPosition, getAllTeacher, getCalendarItem, getAllRoom,
    insertUserRequest, setPost, resetRequestAdd
} from "../../actions/request/requestAdd";
import CalendarList from "../calendar/calendarList";
import RequestAddTeacher from "./requestAddTeacher";
import RequestAddDefense from "./requestAddDefense";
import moment from 'moment'

@connect((store) => {
    return {
        calendarItem: store.requestAdd.calendarItem,
        teachers: store.requestAdd.teachers,
        positions: store.requestAdd.positions,
        rooms: store.requestAdd.rooms,
        post: store.requestAdd.post,
        lang: store.language.data
    }
})
export default class RequestAdd extends React.Component {

    constructor(props) {
        super(props)
        const {lang} = props
        moment.locale(lang.lang)
        this.edit
    }

    componentWillUpdate(props) {
        // NOTE:  props is the updated this.props
    }

    componentWillUnmount() {
        const {dispatch} = this.props
        dispatch(resetRequestAdd())
    }

    insert() {
        const {dispatch, post, calendarItem, positions} = this.props
        if (calendarItem.request_defense.length !== post.defenses.length) {
            toastr.error('DEFENSE NULL', 'PLS TRY AGAIN', {preventDuplicates: false})
            return
        }
        if (post.teachers.length === 0) {
            toastr.error('TEACHER NULL', 'PLS TRY AGAIN', {preventDuplicates: false})
            return
        }
        if (post.teachers.length === 0) {
            return
        }
        dispatch(insertUserRequest(false, post, calendarItem, resp => {
            window.location = URL.REQUEST.REQUEST_LIST.MAIN.LINK
        }))
    }

    componentDidMount() {
        const {dispatch, calendarId, semesterId, actionId, ownerId, lang} = this.props
        // NOTE: fetch needed data
        dispatch(getCalendarItem(ownerId, calendarId, semesterId, actionId, calendarItem => {
                this.edit = calendarItem.user_request !== null && !calendarItem.action.action_default
                dispatch(setHeader(this.edit ? lang.requestAdd.headEdit : lang.requestAdd.head))
                if (calendarItem.user_request !== null)
                    this.initPost(calendarItem.user_request)
            }
        ))
        dispatch(getAllPosition(actionId))
        dispatch(getAllTeacher())
        dispatch(getAllRoom())
    }

    initPost(userRequest) {
        const {dispatch, post, calendarItem} = this.props
        let defenses = []
        userRequest.defenses === undefined ? null :
            userRequest.defenses.map(
                defense => {
                    const defense_ = {
                        date: defense.defense_date,
                        end: defense.defense_time_end,
                        room: defense.room.room_id,
                        start: defense.defense_time_start,
                        type: defense.defense_type.action_id
                    }
                    defenses.push(defense_)
                }
            )
        const teachers_ = userRequest.advisors.length !== 0 ? userRequest.advisors :
            userRequest.defenses.length === 0 ? [] : userRequest.defenses[0].committees
        let teachers = []
        teachers_.map(teacher_ => {
            const teacher = {
                teacher: teacher_.teacher_id,
                position: teacher_.position_id
            }
            teachers.push(teacher)
        })
        const newPost = Object.assign({}, post, {
            ...post, defenses, teachers
        })
        dispatch(setPost(newPost))
    }

    render() {
        const {calendarItem, positions, teachers, post, rooms, lang} = this.props
        return (
            calendarItem === null ? null :
                <div class='margin-bottom-30'>
                    <div class='col-md-6'>
                        <div class='margin-bottom-30'>
                            <h4 class='padding-bottom-20'>
                                {`${calendarItem.action.action_name} ${calendarItem.semester.semester_name} ${lang.requestAdd.year} ${calendarItem.calendar.calendar_id}`}
                            </h4>
                            <div class='padding-bottom-20'>
                                <small>{calendarItem.action.action_detail}</small>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6'>
                        <form class='validate margin-0'>
                            <fieldset>
                                <div class='row'>
                                    <div class='form-group'>
                                        <div style={{paddingBottom: '10px'}}>
                                            <label style={{paddingRight: '10px'}}>
                                                {calendarItem.action.is_defense ? lang.requestAdd.committee : lang.requestAdd.advisor}
                                            </label>
                                            {
                                                calendarItem.action.action_default ? null :
                                                    <button
                                                        type='button'
                                                        class='btn btn-default btn-xs'
                                                        onClick={() => {
                                                            toastr.removeByType('message')
                                                            toastr.message(calendarItem.action.is_defense ? lang.requestAdd.addCommittee : lang.requestAdd.addAdvisor,
                                                                {
                                                                    timeOut: 0,
                                                                    position: 'top-center',
                                                                    component: <RequestAddTeacher
                                                                        calendarItem={calendarItem}/>,
                                                                    attention: true,
                                                                    onAttentionClick: (id) => {
                                                                    }
                                                                }
                                                            )
                                                        }}>
                                                        <i class='fa fa-edit white'/>
                                                        {lang.requestAdd.add}
                                                    </button>
                                            }
                                        </div>
                                        <div class='table-responsive margin-bottom-20'>
                                            <table class='table table-bordered table-vertical-middle nomargin'>
                                                <tbody>
                                                {
                                                    teachers === null || positions === null ? null :
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
                                    {rooms === null ? null :
                                        calendarItem.request_defense.map((defense, index) =>
                                            <div key={index} class='form-group'>
                                                <div style={{paddingBottom: '10px'}}>
                                                    <label style={{paddingRight: '10px'}}>
                                                        {`${lang.requestAdd.defense}${defense.action.action_name}`}
                                                    </label>
                                                    {calendarItem.action.action_default ? null :
                                                        <button type='button'
                                                                class='btn btn-default btn-xs'
                                                                onClick={() => {
                                                                    toastr.removeByType('message')
                                                                    toastr.message(lang.requestAdd.addDefense, {
                                                                            timeOut: 0,
                                                                            position: 'top-center',
                                                                            component: <RequestAddDefense
                                                                                calendarItem={calendarItem}
                                                                                index={index}/>,
                                                                            attention: true,
                                                                            onAttentionClick: (id) => {
                                                                            }
                                                                        }
                                                                    )
                                                                }}>
                                                            <i class='fa fa-edit white'/>
                                                            {lang.requestAdd.add}
                                                        </button>
                                                    }
                                                </div>
                                                <div class='table-responsive margin-bottom-20'>
                                                    <table
                                                        class='table table-bordered table-vertical-middle nomargin'>
                                                        <tbody>
                                                        {post.defenses[index] === undefined ?
                                                            <tr>
                                                                <td>{lang.nodata}</td>
                                                            </tr> : [
                                                                <tr key='date'>
                                                                    <td>
                                                                        {lang.requestAdd.date}
                                                                    </td>
                                                                    <td>
                                                                        {`${moment(new Date(post.defenses[index].date)).format('LL')}`}
                                                                    </td>
                                                                </tr>,
                                                                <tr key='time'>
                                                                    <td>
                                                                        {lang.requestAdd.time}
                                                                    </td>
                                                                    <td>
                                                                        {`${moment(new Date(`1995-04-16T${post.defenses[index].start}`)).format('LT')} - ${moment(new Date(`1995-04-16T${post.defenses[index].end}`)).format('LT')}`}
                                                                    </td>
                                                                </tr>,
                                                                <tr key='room'>
                                                                    <td>
                                                                        {lang.requestAdd.room}
                                                                    </td>
                                                                    <td>
                                                                        {rooms.filter(room => room.room_id === post.defenses[index].room)[0].room_name}
                                                                    </td>
                                                                </tr>
                                                            ]
                                                        }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </fieldset>
                        </form>
                    </div>
                    <button onClick={() => this.insert()} class={`btn btn-block btn-${this.edit ? 'info' : 'success'}`}>
                        {this.edit ? lang.requestAdd.headEdit : lang.requestAdd.head}
                    </button>
                </div>
        )
    }
}