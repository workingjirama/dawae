import React from 'react'
import {connect} from 'react-redux'
import {setHeader} from '../../actions/main'
import {
    activateCalendar, getActiveActionItem, getAllCalendarItem, getAllLevel,
    getAllSemester, getCalendar, resetCalendarLevel, updateCalendarItem
} from '../../actions/calendar/calendar'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import {getTeacher, getPosition, getRoom} from "../../actions/request/requestAdd"
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Tag from 'antd/lib/tag'

@connect((store) => {
    return {
        calendarItems: store.calendar.calendarItems,
        semesters: store.calendar.semesters,
        actionItems: store.calendar.actionItems,
        levels: store.calendar.levels,
        calendar: store.calendar.calendar,
        lang: store.language.data
    }
})
export default class Calendar extends React.Component {

    constructor(props) {
        super(props)
        const {lang} = props
        this.locale = {
            'applyLabel': lang.calendar.confirm,
            'cancelLabel': lang.calendar.cancel,
        }
    }

    componentWillUnmount() {
        const {dispatch} = this.props
        dispatch(resetCalendarLevel())
    }

    componentDidMount() {
        const {dispatch, calendarId, lang} = this.props
        dispatch(getTeacher())
        dispatch(getRoom())
        dispatch(getPosition('DEFENSE-XD'))
        dispatch(setHeader(`${lang.calendar.head} ${calendarId}`))
        dispatch(getAllCalendarItem(calendarId))
        dispatch(getAllSemester())
        dispatch(getActiveActionItem())
        dispatch(getAllLevel())
        dispatch(getCalendar(calendarId))
    }

    dateRangeApply(ev, picker, calendarItem) {
        const {dispatch, calendarItems} = this.props
        const idx = calendarItems.findIndex(_calendarItem => _calendarItem === calendarItem)
        const _calendarItem = Object.assign({}, calendarItems[idx], {
            calendar_item_date_start: moment(new Date(picker.startDate._d)).format('YYYY-MM-DD'),
            calendar_item_date_end: moment(new Date(picker.endDate._d)).format('YYYY-MM-DD')
        })
        dispatch(updateCalendarItem(idx, _calendarItem))
    }

    calendarItemAllSet() {
        const {calendarItems} = this.props
        let allSet = true
        calendarItems.map(calendarItem => {
            if (calendarItem.calendar_item_date_start === null ||
                calendarItem.calendar_item_date_start === null)
                allSet = false
        })
        return allSet
    }

    activateCalendar() {
        const {dispatch, calendar} = this.props
        dispatch(activateCalendar(calendar))
    }

    render() {
        const {semesters, calendarItems, actionItems, levels, calendar, lang} = this.props
        return [
            levels === null ? null :
                levels.map(level =>
                    <div key={level.level_id}>
                        <div>{level.level_name}</div>
                        <table class='table'>
                            <thead>
                            <tr>
                                <th>
                                    <Col class='text-center table-col'
                                         sm={6} span={24}>
                                        {lang.calendar.list}
                                    </Col>
                                    {
                                        semesters === null ? null : semesters.map(
                                            semester =>
                                                <Col key={semester.semester_id} class='text-center table-col'
                                                     sm={6} span={24}>
                                                    {semester.semester_name}
                                                </Col>
                                        )
                                    }
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                actionItems === null || calendarItems === null || semesters === null ? null :
                                    actionItems.filter(actionItem => actionItem.level_id === level.level_id).map(
                                        (actionItem, index) =>
                                            <tr key={index}>
                                                <td>
                                                    <Row class='table-row' type='flex'>
                                                        <Col class='text-center table-col'
                                                             sm={6} span={24}>
                                                            {actionItem.action.action_name}
                                                        </Col>
                                                        {
                                                            semesters.map(
                                                                (semester, index2) => {
                                                                    let calendarItems_ = calendarItems.filter(_calendarItem =>
                                                                        _calendarItem.action_id === actionItem.action.action_id &&
                                                                        _calendarItem.semester_id === semester.semester_id &&
                                                                        _calendarItem.level_id === level.level_id)
                                                                    let calendarItem, start, end
                                                                    if (calendarItems_.length !== 0) {
                                                                        calendarItem = calendarItems_[0]
                                                                        start = moment(new Date(calendarItem.calendar_item_date_start))
                                                                        end = moment(new Date(calendarItem.calendar_item_date_end))
                                                                    }
                                                                    return (
                                                                        <Col key={`${index}${index2}`}
                                                                             class='text-center table-col' sm={6}
                                                                             span={24}>
                                                                            {
                                                                                calendarItems_.length === 0 ?
                                                                                    <div class='invisible'>XD</div> :
                                                                                    <DateRangePicker
                                                                                        opens='left'
                                                                                        autoUpdateInput={false}
                                                                                        startDate={calendarItem.calendar_item_date_start === null ? moment(new Date()) : start}
                                                                                        endDate={calendarItem.scalendar_item_date_end === null ? moment(new Date()) : end}
                                                                                        onApply={(ev, picker) => this.dateRangeApply(ev, picker, calendarItems_[0])}
                                                                                        locale={this.locale}>
                                                                                        {
                                                                                            calendarItems_[0].calendar_item_date_start === null ?
                                                                                                <Tag
                                                                                                    class='tag-empty clickable'>
                                                                                                    CLICK ME LUL
                                                                                                </Tag> :
                                                                                                <Tag
                                                                                                    class='tag-default clickable'>
                                                                                                    {
                                                                                                        calendarItem.calendar_item_date_start === null ? null :
                                                                                                            `${start.format('LL')} - ${end.format('LL')}`
                                                                                                    }
                                                                                                </Tag>
                                                                                        }
                                                                                    </DateRangePicker>
                                                                            }
                                                                        </Col>
                                                                    )
                                                                }
                                                            )
                                                        }
                                                    </Row>
                                                </td>
                                            </tr>
                                    )
                            }
                            </tbody>
                        </table>
                    </div>
                ),
            calendar === null ? null :
                calendar.calendar_active ?
                    <div key='activated' class='btn-lg btn-block btn-success' style={{textAlign: 'center'}}>
                        {lang.calendar.activated}
                    </div> :
                    <button key='btn' disabled={calendarItems === null ? true : !this.calendarItemAllSet()}
                            onClick={() => this.activateCalendar()} class='btn btn-lg btn-block btn-success'>
                        {lang.calendar.activate}
                    </button>
        ]
    }
}