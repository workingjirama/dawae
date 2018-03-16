import React from 'react'
import {connect} from 'react-redux'
import {
    getAllCalendar,
    insertCalendar, resetCalendarList,
    setPostCalendar,
    toggleBtnAddCalendar,
    toggleFormAddCalendar
} from '../../actions/calendar/calendarList'
import {Tooltip} from 'react-tippy'
import {showLoading, hideLoading} from 'react-redux-loading-bar'
import is from 'is_js'
import {toastr} from 'react-redux-toastr'
import {Link} from 'react-router-dom'
import {setHeader} from "../../actions/main";
import {URL} from "../../config";

@connect((store) => {
    return {
        container: store.main.container,
        calendars: store.calendarList.all,
        post: store.calendarList.post,
        active: store.calendarList.active
    }
})
export default class CalendarList extends React.Component {
    componentWillUpdate(props) {
        // NOTE:  props is the updated this.props
        if (props.calendars !== null)
            props.dispatch(hideLoading())
    }

    componentWillUnmount() {
        const {dispatch, active} = this.props
        // NOTE: check if formAdd still displayed
        dispatch(resetCalendarList())
        if (active.formAddCalendar === true)
            dispatch(toggleFormAddCalendar())
    }

    componentDidMount() {
        const {dispatch} = this.props
        // NOTE: fetch needed data
        dispatch(setHeader("CALENDAR LIST"))
        dispatch(showLoading())
        dispatch(getAllCalendar())
    }

    changeYear(ev) {
        const {post, dispatch} = this.props
        const year = ev.target.value
        let post_ = Object.assign({}, post)
        post_.calendar.year = year
        dispatch(setPostCalendar(post_))
    }

    submitYear() {
        const {post, dispatch, active, container} = this.props
        const year = post.calendar.year
        if (year === null || year === "")
            toastr.error('YEAR NULL', 'PLS TRY AGAIN', {preventDuplicates: false})
        else if (year.length !== 4)
            toastr.error('YEAR 4 CHAR ', 'PLS TRY AGAIN', {preventDuplicates: false})
        else if (isNaN(year))
            toastr.error('NUMBER ONLY', 'PLS TRY AGAIN', {preventDuplicates: false})
        else {
            dispatch(toggleBtnAddCalendar())
            dispatch(insertCalendar(post.calendar, (resp) => {
                if (resp === 1) {
                    dispatch(getAllCalendar())
                    container.click()
                } else {
                    toastr.error('DUPLICATE', 'PLS TRY AGAIN', {preventDuplicates: false})
                }
                dispatch(toggleBtnAddCalendar())
            }))
        }
    }

    render() {
        const {calendars, active} = this.props
        return (
            <div class="bs-glyphicons">
                <ul class="glyphicons-list list-unstyled clearfix">
                    <Tooltip
                        trigger="click"
                        interactive
                        size="big"
                        position="right"
                        theme="light"
                        html={[
                            <input key="input"
                                   type="text"
                                   style={{width: "150px"}}
                                   class="form-control inside"
                                   placeholder="Year"
                                   maxLength={4}
                                   onChange={(ev) => this.changeYear(ev)}/>,
                            <button key="btn"
                                    disabled={!active.btnAddCalendar}
                                    class="btn inside btn-sm btn-success"
                                    onClick={() => this.submitYear()}>
                                Add
                            </button>
                        ]}>
                        <li style={{backgroundColor: "#eaeaea"}}>
                            <i style={{marginTop: "19.5px"}} class="glyphicon glyphicon-plus"/>
                        </li>
                    </Tooltip>
                    {calendars === null ? null : calendars.map(calendar =>
                        <li key={calendar.calendar_id}
                            onClick={() => {
                                window.location = URL.CALENDAR.CALENDAR.MAIN.LINK(calendar.calendar_id)
                            }} style={{position: "relative", backgroundColor: "#eaeaea"}}>
                            {!calendar.calendar_active ? null :
                                <div class="ribbon ribbon-top-right">
                                    <span>เปิดใช้งาน</span>
                                </div>
                            }
                            <span style={{marginTop: "28.5px"}} class="glyphicon-class">
                                <strong>{calendar.calendar_id}</strong>
                            </span>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}