import React from 'react'
import {connect} from 'react-redux'
import {setHeader} from '../../actions/main'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import moment from 'moment'
import {toastr} from 'react-redux-toastr'
import {Tooltip} from 'react-tippy'
import {
    getAllPosition, getAllRoom, getAllTeacher, insertUserRequest,
    resetRequestAdd
} from "../../actions/request/requestAdd"
import RequestAddTeacher from "../request/requestAddTeacher";
import RequestAddDefense from "../request/requestAddDefense";
import CalendarInitAdd from "./calendarInitAdd";
import {updateCalendarItem} from "../../actions/calendar/calendar";

@connect((store) => {
    return {
        lang: store.language.data,
        teachers: store.requestAdd.teachers,
        positions: store.requestAdd.positions,
        rooms: store.requestAdd.rooms,
        container: store.main.container,
        post: store.requestAdd.post,
        actionItems: store.calendar.actionItems,
        calendarItems: store.calendar.calendarItems,
    }
})
export default class CalendarInit extends React.Component {

    constructor(props) {
        super(props)
        const {lang, calendarItem} = props
        moment.locale(lang.lang)
        this.state = {
            open: {
                date: false
            }
        }
    }

    componentWillUnmount() {
    }

    componentWillUpdate(props) {
        // NOTE:  props is the updated this.props

    }

    componentDidMount() {
        const {dispatch, calendarItem} = this.props
    }

    toggleDate() {
        const {open} = this.state
        this.setState({
            open: {
                ...open,
                date: !open.date
            }
        })
    }

    insert() {
        const {dispatch, post, calendarItem, calendarItems} = this.props
        if (post.defenses.length === 0) {
            toastr.error('DEFENSE NULL', 'PLS TRY AGAIN', {preventDuplicates: false})
        } else if (post.teachers.length === 0) {
            toastr.error('TEACHER NULL', 'PLS TRY AGAIN', {preventDuplicates: false})
        } else {
            const calendarItem_ = {
                action: {
                    is_defense: true,
                    action_id: calendarItem.action_id
                },
                calendar: {
                    calendar_id: calendarItem.calendar_id
                },
                level: {
                    level_id: calendarItem.level_id
                },
                semester: {
                    semester_id: calendarItem.semester_id
                },
                owner_id: calendarItem.owner_id
            }
            dispatch(insertUserRequest(true, post, calendarItem_, calendarItem_ => {
                const index = calendarItems.findIndex(_calendarItem => _calendarItem === calendarItem)
                const _calendarItem = Object.assign({}, calendarItems[index], {
                    calendar_item_date_start: moment(new Date(calendarItem_.calendar_item_date_start)).format('YYYY-MM-DD'),
                    calendar_item_date_end: moment(new Date(calendarItem_.calendar_item_date_end)).format('YYYY-MM-DD')
                })
                dispatch(updateCalendarItem(index, _calendarItem))
                this.toggleDate()
            }))
        }
    }

    render() {
        const {lang, calendarItem} = this.props
        const {open} = this.state
        return (
            <Tooltip
                open={open.date}
                useContext={true} unmountHTMLWhenHide={true}
                trigger='click' interactive size='big'
                arrow={true}
                position='left' theme='light'
                html={
                    <div style={{minWidth: 200, margin: 0}}>
                        <CalendarInitAdd calendarItem={calendarItem}/>
                        <div>
                            <button class='btn btn-success btn-block'
                                    onClick={() => {
                                        this.insert()
                                    }}>
                                lets go dude
                            </button>
                        </div>
                    </div>

                }>
                <button class={`btn btn-${calendarItem.calendar_item_date_start === null ? 'blue' : 'default'} btn-xs`}
                        onClick={() => this.toggleDate()}>
                    {calendarItem.calendar_item_date_start === null ? 'insert' :
                        <i class="fa fa-edit nopadding-right"/>}
                </button>
            </Tooltip>
        )
    }
}