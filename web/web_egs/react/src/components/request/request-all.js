import React from 'react'
import {connect} from 'react-redux'
import {getAllLevel, getAllSemester} from '../../actions/calendar/calendar'
import {URL} from './../../config'
import {setHeader} from '../../actions/main'
import RequestOpen from './request-open'
import {
    getDefenseStatus, resetRequestData, getAllAction, getAllUserRequest,
    updateUserRequest, UpdateUserRequestList
} from '../../actions/request/requestData'
import Tag from 'antd/lib/tag'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Loading from "../loading";
import Select from 'antd/lib/select'
import {getAllCalendar} from "../../actions/calendar/calendarList";

const {Option} = Select

@connect((store) => {
    return {
        userRequests: store.requestData.userRequests,
        actions: store.requestData.actions,
        semesters: store.calendar.semesters,
        levels: store.calendar.levels,
        lang: store.language.data,
        status: store.requestData.status,
        calendars: store.calendarList.all
    }
})
export default class RequestAll extends React.Component {

    constructor() {
        super()
        this.calendar = null
        this.level = null
        this.semester = null
        this.action = null
        this.state = {
            loading: false
        }
    }

    componentWillUnmount() {
        const {dispatch} = this.props
        dispatch(resetRequestData())
    }

    componentDidMount() {
        const {dispatch, userRequests, lang} = this.props
        dispatch(setHeader(lang.dataRequest.head))
        dispatch(getAllCalendar())
        dispatch(getAllUserRequest(this.calendar, this.level, this.semester, this.action))
        dispatch(getAllAction())
        dispatch(getAllSemester())
        dispatch(getAllLevel())
        dispatch(getDefenseStatus())
    }

    calendarChange(value) {
        this.calendar = value
        this.updateUserRequest()
    }

    levelChange(value) {
        this.level = value
        this.updateUserRequest()
    }

    semesterChange(value) {
        this.semester = value
        this.updateUserRequest()
    }

    actionChange(value) {
        this.action = value
        this.updateUserRequest()
    }

    updateUserRequest() {
        const {dispatch} = this.props
        dispatch(UpdateUserRequestList(null))
        console.log(this.calendar, this.level, this.semester, this.action)
        dispatch(getAllUserRequest(this.calendar, this.level, this.semester, this.action))
    }


    render() {
        const {userRequests, actions, semesters, levels, calendars, lang, status} = this.props
        const {loading} = this.state
        return (
            levels === null || semesters === null || actions === null || status === null
                ? <Loading/> :
                <Row>
                    <Col span={24}>
                        <Row>
                            <Col span={24}>
                                <Select style={{width: '100%'}} disabled={loading}
                                        onChange={(value) => this.calendarChange(value)}
                                        defaultValue={calendars[calendars.findIndex(calendar => calendar.calendar_active === 1)].calendar_id}>
                                    {
                                        calendars.map(
                                            (calendar, index) =>
                                                <Option key={index} value={calendar.calendar_id}>
                                                    {calendar.calendar_id}
                                                </Option>
                                        )
                                    }
                                </Select>
                            </Col>
                            <Col span={24}>
                                <Select style={{width: '100%'}} defaultValue={levels[0].level_id}
                                        onChange={(value) => this.levelChange(value)} disabled={loading}>
                                    {
                                        levels.map(
                                            (level, index) =>
                                                <Option key={index} value={level.level_id}>
                                                    {level.level_name}
                                                </Option>
                                        )
                                    }
                                </Select>
                            </Col>
                            <Col span={24}>
                                <Select style={{width: '100%'}} defaultValue={semesters[0].semester_id}
                                        onChange={(value) => this.semesterChange(value)} disabled={loading}>
                                    {
                                        semesters.map(
                                            (semester, index) =>
                                                <Option key={index} value={semester.semester_id}>
                                                    {semester.semester_name}
                                                </Option>
                                        )
                                    }
                                </Select>
                            </Col>
                            <Col span={24}>
                                <Select style={{width: '100%'}} defaultValue={actions[0].action_id}
                                        onChange={(value) => this.actionChange(value)} disabled={loading}>
                                    {
                                        actions.map(
                                            (action, index) =>
                                                <Option key={index} value={action.action_id}>
                                                    {action.action_name}
                                                </Option>
                                        )
                                    }
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        {
                            userRequests === null ? <Loading/> :
                                <table class='table'>
                                    <thead>
                                    <tr>
                                        <th>
                                            <Row class='table-row' type='flex'>
                                                <Col class='text-center table-col'
                                                     sm={24} span={24}>
                                                    LUL
                                                </Col>
                                            </Row>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        userRequests.map(
                                            (userRequest, index) => {
                                                const action = actions[actions.findIndex(action => action.action_id === userRequest.calendar_item.action_id)]
                                                const step = userRequest.step
                                                const current_step = step[step.findIndex(step => step.step.step_id === userRequest.current_step)]
                                                console.log(current_step)
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <Row class='table-row' type='flex'>
                                                                <Col class='text-center table-col' sm={7} span={24}>
                                                                    <div>{userRequest.student.user_id}</div>
                                                                    <div>{`${userRequest.student.prefix} ${userRequest.student.student_fname} ${userRequest.student.student_lname}`}</div>
                                                                </Col>
                                                                <Col class='text-center table-col' sm={7} span={24}>
                                                                    {action.action_name}
                                                                </Col>
                                                                <Col class='text-center table-col' sm={5} span={24}>
                                                                    {`${current_step.step.step_name} (${current_step.action_step_index + 1}/${userRequest.step.length})`}
                                                                </Col>
                                                                <Col class='text-center table-col' sm={5} span={24}>
                                                                    <RequestOpen index={index}
                                                                                 userRequest={userRequest}/>
                                                                </Col>
                                                            </Row>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        )
                                    }
                                    </tbody>
                                </table>
                        }
                    </Col>
                </Row>
        )
    }
}