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
import 'whatwg-fetch'
import CalendarList from "../calendar/calendarList";
import RequestAddTeacher from "./requestAddTeacher";
import RequestAddDefense from "./requestAddDefense";

@connect((store) => {
    return {
        calendarItem: store.requestAdd.calendarItem,
        teachers: store.requestAdd.teachers,
        positions: store.requestAdd.positions,
        rooms: store.requestAdd.rooms,
        post: store.requestAdd.post
    }
})
export default class RequestAdd extends React.Component {


    constructor(props) {
        super(props)
        this.calendar = null
    }

    componentWillUpdate(props) {
        // NOTE:  props is the updated this.props
    }

    componentWillUnmount() {
        const {dispatch} = this.props
        dispatch(resetRequestAdd())
    }

    insert() {
        const {dispatch, post, calendarItem} = this.props
        dispatch(insertUserRequest(post, calendarItem))
    }

    componentDidMount() {
        const {dispatch, calendarId, semesterId, actionId} = this.props
        // NOTE: fetch needed data
        dispatch(getCalendarItem(calendarId, semesterId, actionId, calendarItem =>
            calendarItem.user_request === null ? null : this.initPost(calendarItem.user_request)
        ))
        dispatch(getAllPosition(actionId))
        dispatch(getAllTeacher())
        dispatch(getAllRoom())
    }

    initPost(userRequest) {
        const {dispatch, post, calendarItem} = this.props
        // const defense_ = userRequest.defenses
        let defenses = []
        userRequest.defenses === undefined ? null :
            userRequest.defenses.map(defense => {
                    const defense_ = {
                        date: defense.defense_date,
                        end: defense.defense_time_end,
                        room: defense.room.room_id,
                        start: defense.defense_time_start
                    }
                    defenses.push(defense_)
                }
            )
        const teachers_ = userRequest.advisors.length !== 0 ? userRequest.advisors : userRequest.defenses[0].committees
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
        const {calendarItem, positions, teachers, post, rooms} = this.props
        if (calendarItem !== null) console.log(calendarItem.request_defense)
        return (
            calendarItem === null ? null :
                <div class="margin-bottom-30">
                    <div class="col-md-6">
                        <div ref={elm => {
                            this.calendar = elm
                        }}/>
                        <div class="margin-bottom-30">
                            <h4 class="padding-bottom-20">
                                {`${calendarItem.action.action_name} ${calendarItem.semester.semester_name} YEAR ${calendarItem.calendar.calendar_id}`}
                            </h4>
                            <div class="padding-bottom-20">
                                <small>{calendarItem.action.action_detail}</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <form class="validate margin-0">
                            <fieldset>
                                <div class="row">
                                    <div class="form-group">
                                        <div style={{paddingBottom: '10px'}}>
                                            <label style={{paddingRight: '10px'}}>
                                                {calendarItem.action.is_defense ? 'comm' : 'advs'}
                                            </label>
                                            <button type="button" class="btn btn-default btn-xs"
                                                    onClick={() => {
                                                        toastr.removeByType('message')
                                                        toastr.message('*-*', {
                                                                timeOut: 0,
                                                                position: "top-center",
                                                                component: <RequestAddTeacher/>,
                                                                attention: true,
                                                                onAttentionClick: (id) => {
                                                                }
                                                            }
                                                        )
                                                    }}><i class="fa fa-edit white"/>CLICK ME XD
                                            </button>
                                        </div>
                                        <div class="table-responsive margin-bottom-20">
                                            <table class="table table-bordered table-vertical-middle nomargin">
                                                <tbody>
                                                {teachers === null || positions === null ? null :
                                                    post.teachers.length === 0 ?
                                                        <tr>
                                                            <td>DATA LOL</td>
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
                                            <div key={index} class="form-group">
                                                <div style={{paddingBottom: '10px'}}>
                                                    <label style={{paddingRight: '10px'}}>
                                                        {'lol defense'}
                                                    </label>
                                                    <button type="button" class="btn btn-default btn-xs"
                                                            onClick={() => {
                                                                toastr.removeByType('message')
                                                                toastr.message('*-*', {
                                                                        timeOut: 0,
                                                                        position: "top-center",
                                                                        component: <RequestAddDefense index={index}/>,
                                                                        attention: true,
                                                                        onAttentionClick: (id) => {
                                                                        }
                                                                    }
                                                                )
                                                            }}>
                                                        <i class="fa fa-edit white"/>CLICK ME LUL
                                                    </button>
                                                </div>
                                                <div class="table-responsive margin-bottom-20">
                                                    <table class="table table-bordered table-vertical-middle nomargin">
                                                        <tbody>
                                                        {post.defenses[index] === undefined ?
                                                            <tr>
                                                                <td>DATA LOL</td>
                                                            </tr> : [
                                                                <tr key="date">
                                                                    <td>DATE</td>
                                                                    <td>{`${post.defenses[index].date}`}</td>
                                                                </tr>,
                                                                <tr key="time">
                                                                    <td>TIME</td>
                                                                    <td>{`${post.defenses[index].start} ${post.defenses[index].end}`}</td>
                                                                </tr>,
                                                                <tr key="room">
                                                                    <td>WHERE</td>
                                                                    <td>{rooms.filter(room => room.room_id === post.defenses[index].room)[0].room_name}</td>
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
                    <button onClick={() => this.insert()}
                            class="btn btn-block btn-green">{`CLICK ME TO ADD XD`}</button>
                </div>
        )
    }
}