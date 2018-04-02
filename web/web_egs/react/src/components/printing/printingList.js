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
        reviews: store.review.reviews,
        lang: store.language.data
    }
})
export default class printingList extends React.Component {
    componentWillUpdate(props) {
        // NOTE:  props is the updated this.props
    }

    componentWillUnmount() {
        const {dispatch} = this.props
        // NOTE: check if formAdd still displayed
    }

    componentDidMount() {
        const {dispatch} = this.props
        // NOTE: fetch needed data
    }

    render() {
        const {calendars, lang} = this.props
        return (
            <div>
                printings-list
            </div>
        )
    }
}