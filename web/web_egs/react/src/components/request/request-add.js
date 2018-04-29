import React from 'react'
import {connect} from 'react-redux'
import Steps from 'antd/lib/steps'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Icon from 'antd/lib/icon'
import {
    getStep,
    setComponent,
    getCalendarItem,
    getTeacher,
    getPosition,
    setPost,
    getRoom, resetRequestAdd
} from '../../actions/request/requestAdd'
import Teacher from './step/teacher'
import Defense from './step/defense'
import Detail from './step/detail'
import Summary from './step/Summary'
import Button from "./step/button";

const Step = Steps.Step

@connect((store) => {
    return {
        lang: store.language.data,
        steps: store.requestAdd.steps,
        current: store.requestAdd.current,
        component: store.requestAdd.component,
        positions: store.requestAdd.positions,
        rooms: store.requestAdd.rooms
    }
})
export default class RequestAdd extends React.Component {
    constructor() {
        super()
        this.component = {Teacher, Defense, Detail, Summary}
    }

    componentWillUnmount() {
        const {dispatch} = this.props
        dispatch(resetRequestAdd())
    }

    componentDidMount() {
        const {dispatch, calendarId, levelId, semesterId, actionId, ownerId, component, current} = this.props
        // NOTE: fetch needed data
        dispatch(getStep(actionId, response => {
            dispatch(setComponent(response[current].step.step_component))
        }))
        dispatch(getCalendarItem(ownerId, calendarId, levelId, semesterId, actionId, calendarItem => {
                this.edit = calendarItem.user_request !== null && !calendarItem.action.action_default
                if (calendarItem.user_request !== null)
                    this.initPost(calendarItem.user_request)
            }
        ))
        dispatch(getPosition(actionId))
        dispatch(getTeacher())
        dispatch(getRoom())
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
        const {lang, steps, current, component, positions, rooms} = this.props
        const Component = this.component[component]
        return (
            rooms === null || positions === null || steps === null || component === null ? null :
                <Row type='flex' justify='center'>
                    <Col span={20}>
                        <Row>
                            <Col span={24}>
                                <Steps current={current}>
                                    {
                                        steps.map(
                                            (step, index) =>
                                                <Step key={index} title={step.step.step_name}/>
                                        )
                                    }
                                </Steps>
                            </Col>
                        </Row>
                        <Row type='flex' justify='center'>
                            <Col>
                                <Component/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
        )
    }
}