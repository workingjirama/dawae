import React from 'react'
import {connect} from 'react-redux'
import {getCalendarItemWithStatus} from "../../actions/request/requestList";
import {getAllSemester} from "../../actions/calendar/calendar";
import moment from 'moment'
import {URL} from '../../config'

@connect((store) => {
    return {
        calendarItems: store.requestList.calendarItems,
        semesters: store.calendar.semesters
    }
})
export default class RequestList extends React.Component {

    constructor(props) {
        super(props)
        moment.locale('th')
    }

    componentWillUpdate(props) {
        // NOTE:  props is the updated this.props
    }

    componentWillUnmount() {
    }

    componentDidMount() {
        const {dispatch} = this.props
        // NOTE: fetch needed data

        //////////////////////////////////////// LEVEL ID IS FUCKING FAKE /////////////////////////////
        const levelId = 'LV_MAS'
        /////////////////////////////////////////////////////////////////////////////////////////////
        dispatch(getCalendarItemWithStatus(levelId))
        dispatch(getAllSemester())
    }

    render() {
        const {calendarItems, semesters} = this.props
        console.log(calendarItems, semesters)
        return (
            calendarItems === null || semesters === null ? null :
                semesters.map(semester => [
                    <div key={semester.semester_id}>
                        {semester.semester_name}
                    </div>,
                    <div key={`table${semester.semester_id}`} class="table-responsive padding-bottom-50">
                        <table class="table table-bordered nomargin">
                            <thead>
                            <tr>
                                <th>รายการ</th>
                                <th>วันที่</th>
                                <th>สถานะ</th>
                            </tr>
                            </thead>
                            <tbody>
                            {calendarItems.filter(calendarItem => calendarItem.semester_id === semester.semester_id).map((calendarItem, idx) =>
                                <tr key={idx}>
                                    <td>{calendarItem.action.action_name}</td>
                                    <td>
                                        {`${moment(new Date(calendarItem.calendar_item_date_start)).format("LL").substring(0, moment(new Date(calendarItem.calendar_item_date_start)).format("LL").length - 5)} ถึง ${moment(new Date(calendarItem.calendar_item_date_end)).format("LL")}`}
                                    </td>
                                    <td>
                                        {calendarItem.calendar_item_open ?
                                            <button onClick={() => {
                                                window.location = URL.REQUEST.REQUEST_ADD.MAIN.LINK(calendarItem)
                                            }} class="btn btn-green btn-xs">เพิ่มคำร้อง</button> :
                                            <span class="label label-danger">ไม่อยู่ในช่วงคำร้อง</span>
                                        }
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                ])
        )
    }
}