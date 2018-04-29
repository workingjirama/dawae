import {combineReducers} from 'redux'
import {reducer as toastr} from 'react-redux-toastr'
import {loadingBarReducer as loadingBar} from 'react-redux-loading-bar'

// NOTE: reducers
import main from './main'
import language from './language'
import calendar from './calendar/calendar'
import calendarInit from './calendar/calendar-init'
import calendarList from './calendar/calendarList'
import requestList from './request/requestList'
import requestAdd from './request/requestAdd'
import requestData from './request/requestData'
import dataRequest from './data/dataRequest'
import dataDefense from './data/dataDefense'
import review from './printing/review'

export default combineReducers({
    main, language,
    // NOTE: calendar gruop
    calendarList, calendar, calendarInit,
    // NOTE: request gruop
    requestList, requestAdd, requestData,
    // NOTE: request gruop
    dataRequest, dataDefense,
    // NOTE: printing gruop
    review,
    // NOTE: library group
    toastr, loadingBar
})