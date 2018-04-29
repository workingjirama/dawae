import React from 'react'
import {connect} from 'react-redux'
import {setHeader} from '../../actions/main'
import {
    activateCalendar,
    getActiveActionItem,
    getAllCalendarItem,
    getAllLevel,
    getAllSemester,
    getCalendar,
    resetCalendarLevel,
    updateCalendarItem
} from '../../actions/calendar/calendar'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import CalendarInit from "./calendar-init"
import {getTeacher, getPosition, getRoom} from "../../actions/request/requestAdd"
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'

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
                levels.map(level => [
                    <div key={`head${level.level_id}`}>{level.level_name}</div>,
                    <div key={`table${level.level_id}`} class='table-responsive padding-bottom-50'>
                        <table class='table table-bordered nomargin'>
                            <thead>
                            <tr>
                                <th>{lang.calendar.list}</th>
                                {semesters === null ? null : semesters.map(semester =>
                                    <th key={semester.semester_id}>{semester.semester_name}</th>
                                )}
                            </tr>
                            </thead>
                            <tbody>
                            {actionItems === null || calendarItems === null || semesters === null ? null :
                                actionItems.filter(actionItem => actionItem.level_id === level.level_id).map((actionItem, index) =>
                                    <tr key={index}>
                                        <td>{actionItem.action.action_name}</td>
                                        {semesters.map(
                                            (semester, index2) => {
                                                let calendarItems_ = calendarItems.filter(_calendarItem =>
                                                    _calendarItem.action_id === actionItem.action.action_id &&
                                                    _calendarItem.semester_id === semester.semester_id &&
                                                    _calendarItem.level_id === level.level_id)
                                                return calendarItems_.length === 0 ?
                                                    <td key='blank'></td> :
                                                    <td key={`${index}${index2}`}>
                                                        <div>
                                                            {
                                                                calendarItems_[0].calendar_item_date_start === null ? null :
                                                                    `${moment(new Date(calendarItems_[0].calendar_item_date_start)).format('LL')} ${lang.calendar.to} ${moment(new Date(calendarItems_[0].calendar_item_date_end)).format('LL')}`
                                                            }
                                                            {
                                                                <DateRangePicker
                                                                    opens='left'
                                                                    autoUpdateInput={false}
                                                                    startDate={calendarItems_[0].calendar_item_date_start === null ? moment(new Date()) : moment(new Date(calendarItems_[0].calendar_item_date_start))}
                                                                    endDate={calendarItems_[0].scalendar_item_date_end === null ? moment(new Date()) : moment(new Date(calendarItems_[0].calendar_item_date_end))}
                                                                    onApply={(ev, picker) => this.dateRangeApply(ev, picker, calendarItems_[0])}
                                                                    locale={this.locale}>
                                                                    {
                                                                        calendarItems_[0].calendar_item_date_start === null ?
                                                                            <button class='btn btn-blue btn-xs'>
                                                                                {lang.calendar.input}
                                                                            </button> :
                                                                            <button
                                                                                class='btn btn-default btn-xs'>
                                                                                <i class='fa fa-edit nopadding-right'/>
                                                                            </button>
                                                                    }
                                                                </DateRangePicker>
                                                            }
                                                        </div>
                                                    </td>
                                            }
                                        )}
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                ]),
            calendar === null ? null :
                calendar.calendar_active ?
                    <div key='activated' class='btn-lg btn-block btn-success' style={{textAlign: 'center'}}>
                        {lang.calendar.activated}
                    </div> :
                    <button key='btn' disabled={calendarItems === null ? true : !this.calendarItemAllSet()}
                            onClick={() => {
                                this.activateCalendar()
                            }} class='btn btn-lg btn-block btn-success'>
                        {lang.calendar.activate}
                    </button>
        ]
    }
}