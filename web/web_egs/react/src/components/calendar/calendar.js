import React from 'react'
import {connect} from 'react-redux'
import {setHeader} from "../../actions/main";
import {hideLoading, showLoading} from 'react-redux-loading-bar'
import {
    activateCalendar,
    getActiveActionItem,
    getAllCalendarItem,
    getAllLevel,
    getAllSemester,
    getCalendar,
    resetCalendarLevel,
    updateCalendarItem
} from "../../actions/calendar/calendar";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from 'moment'

@connect((store) => {
    return {
        calendarItems: store.calendar.calendarItems,
        semesters: store.calendar.semesters,
        actionItems: store.calendar.actionItems,
        levels: store.calendar.levels,
        calendar: store.calendar.calendar
    }
})
export default class Calendar extends React.Component {

    constructor(props) {
        super(props)
        moment.locale("th")
    }

    componentWillUnmount() {
        this.props.dispatch(resetCalendarLevel())
    }

    componentWillUpdate(props) {
        // NOTE:  props is the updated this.props
        if (props.actionItems !== null && props.calendarItems !== null && props.levels !== null)
            props.dispatch(hideLoading())
    }

    componentDidMount() {
        const {dispatch, calendarId} = this.props
        dispatch(setHeader(`CALENDAR ${calendarId}`))
        dispatch(getAllCalendarItem(calendarId))
        dispatch(getAllSemester())
        dispatch(getActiveActionItem())
        dispatch(showLoading())
        dispatch(getAllLevel())
        dispatch(getCalendar(calendarId))
    }

    dateRangeApply(ev, picker, calendarItem) {
        const {dispatch, calendarItems} = this.props
        const idx = calendarItems.findIndex(_calendarItem => _calendarItem === calendarItem)
        const _calendarItem = Object.assign({}, calendarItems[idx], {
            calendar_item_date_start: moment(new Date(picker.startDate._d)).format("YYYY-MM-DD"),
            calendar_item_date_end: moment(new Date(picker.endDate._d)).format("YYYY-MM-DD")
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
        console.log(calendar)
    }

    render() {
        const {semesters, calendarItems, actionItems, levels, calendar} = this.props
        return [
            levels === null ? null :
                levels.map(level => [
                    <div key={`head${level.level_id}`}>{level.level_name}</div>,
                    <div key={`table${level.level_id}`} class="table-responsive padding-bottom-50">
                        <table class="table table-bordered nomargin">
                            <thead>
                            <tr>
                                <th>รายการ</th>
                                {semesters === null ? null : semesters.map(semester =>
                                    <th key={semester.semester_id}>{semester.semester_name}</th>
                                )}
                            </tr>
                            </thead>
                            <tbody>
                            {actionItems === null || calendarItems === null || semesters === null ? null :
                                actionItems.filter(actionItem => actionItem.level_id === level.level_id).map((actionItem, idx) =>
                                    <tr key={idx}>
                                        <td>{actionItem.action.action_name}</td>
                                        {semesters.map(semester => {
                                                let calendarItems_ = calendarItems.filter(_calendarItem =>
                                                    _calendarItem.action_id === actionItem.action.action_id &&
                                                    _calendarItem.semester_id === semester.semester_id &&
                                                    _calendarItem.level_id === level.level_id)
                                                return calendarItems_.length === 0 ?
                                                    <td key='blank'></td> :
                                                    <td key={`${calendarItems_[0].action_id}${calendarItems_[0].semester_id}${calendarItems_[0].level_id}`}>
                                                        {
                                                            calendarItems_[0].calendar_item_date_start === null ? null :
                                                                `${moment(new Date(calendarItems_[0].calendar_item_date_start)).format("ll")}
                                                         ถึง ${moment(new Date(calendarItems_[0].calendar_item_date_end)).format("ll")}`
                                                        }
                                                        <DateRangePicker
                                                            opens="left"
                                                            autoUpdateInput={false}
                                                            onApply={(ev, picker) => this.dateRangeApply(ev, picker, calendarItems_[0])}>
                                                            <div>
                                                                {
                                                                    calendarItems_[0].calendar_item_date_start === null ?
                                                                        <button class="btn btn-blue btn-xs">
                                                                            {`click me XD `}
                                                                        </button> :
                                                                        <button class="btn btn-white btn-xs">
                                                                            <i class="fa fa-edit nopadding-right"/>
                                                                        </button>
                                                                }
                                                            </div>
                                                        </DateRangePicker>
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
                calendar.calendar_active ? "activated" :
                    <button key='btn' disabled={calendarItems === null ? true : !this.calendarItemAllSet()}
                            onClick={() => {
                                this.activateCalendar()
                            }} class="btn btn-lg btn-block btn-green">
                        LOL
                    </button>
        ]
    }
}