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
import {setHeader} from '../../actions/main'
import {URL} from '../../config'

@connect((store) => {
    return {
        container: store.main.container,
        calendars: store.calendarList.all,
        post: store.calendarList.post,
        active: store.calendarList.active,
        lang: store.language.data
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
        const {dispatch, lang} = this.props
        // NOTE: fetch needed data
        dispatch(setHeader(lang.calendarList.head))
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
        if (year === null || year === '')
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
        const {calendars, active, lang} = this.props
        return (
            <div class='bs-glyphicons'>
                <ul class='glyphicons-list list-unstyled clearfix'>
                    <Tooltip
                        trigger='click'
                        interactive
                        size='big'
                        position='right'
                        theme='light'
                        html={
                            <div style={{display: 'flex'}}>
                                <input
                                    type='text'
                                    style={{width: 100, marginRight: 10}}
                                    class='form-control'
                                    placeholder='Year'
                                    maxLength={4}
                                    onChange={(ev) => this.changeYear(ev)}/>
                                <button
                                    disabled={!active.btnAddCalendar}
                                    style={{margin: 0}}
                                    class='btn btn-sm btn-success'
                                    onClick={() => this.submitYear()}>
                                    {lang.calendarList.add}
                                </button>
                            </div>
                        }>
                        <li style={{backgroundColor: '#eaeaea'}}>
                            <i style={{marginTop: '19.5px'}} class='glyphicon glyphicon-plus'/>
                        </li>
                    </Tooltip>
                    {calendars === null ? null : calendars.map(calendar =>
                        <li key={calendar.calendar_id}
                            onClick={() => {
                                window.location = URL.CALENDAR.CALENDAR.MAIN.LINK(calendar.calendar_id)
                            }} style={{position: 'relative', backgroundColor: '#eaeaea'}}>
                            {!calendar.calendar_active ? null :
                                <div class='ribbon ribbon-top-right'>
                                    <span>{lang.calendarList.active}</span>
                                </div>
                            }
                            <span style={{marginTop: 28}} class='glyphicon-class'>
                                <strong>{calendar.calendar_id}</strong>
                            </span>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}