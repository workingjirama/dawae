import React from 'react'
import {connect} from 'react-redux'
import {getCalendarItemWithStatus} from "../../actions/request/requestList";
import {getAllSemester} from "../../actions/calendar/calendar";
import moment from 'moment'
import {URL} from '../../config'
import {setHeader} from "../../actions/main";

@connect((store) => {
    return {
        lang: store.language.data,
        calendarItems: store.requestList.calendarItems,
        semesters: store.calendar.semesters
    }
})
export default class RequestList extends React.Component {

    constructor(props) {
        super(props)
        const {lang} = props
        moment.locale(lang.lang)
    }

    componentWillUpdate(props) {
        // NOTE:  props is the updated this.props
    }

    componentWillUnmount() {
    }

    componentDidMount() {
        const {dispatch, lang} = this.props
        // NOTE: fetch needed data
        dispatch(setHeader(lang.requestList.head))
        dispatch(getCalendarItemWithStatus())
        dispatch(getAllSemester())
    }

    render() {
        const {calendarItems, semesters, requestList, lang} = this.props
        return (
            calendarItems === null || semesters === null ? null :
                semesters.map(semester =>
                    <div key={semester.semester_id}>
                        <div>
                            {semester.semester_name}
                        </div>
                        <div class="table-responsive padding-bottom-50">
                            <table class="table table-bordered nomargin">
                                <thead>
                                <tr>
                                    <th>{lang.requestList.list}</th>
                                    <th>{lang.requestList.date}</th>
                                    <th>{lang.requestList.status}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {calendarItems.filter(calendarItem => calendarItem.semester_id === semester.semester_id).map((calendarItem, idx) =>
                                    <tr key={idx}>
                                        <td>{calendarItem.action.action_name}</td>
                                        <td>
                                            {`${moment(new Date(calendarItem.calendar_item_date_start)).format("LL")} ${lang.requestList.to} ${moment(new Date(calendarItem.calendar_item_date_end)).format("LL")}`}
                                        </td>
                                        <td>
                                            {calendarItem.calendar_item_open ?
                                                <button onClick={() => {
                                                    window.location = URL.REQUEST.REQUEST_ADD.MAIN.LINK(calendarItem)
                                                }}
                                                        class={`btn btn-xs btn-${calendarItem.calendar_item_added ? 'info' : 'success' }`}>
                                                    {calendarItem.calendar_item_added ? lang.requestList.edit : lang.requestList.add}
                                                </button> :
                                                <span class="label label-danger">
                                                {lang.requestList.not}
                                            </span>
                                            }
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>)
        )
    }
}