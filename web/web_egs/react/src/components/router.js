import React from 'react'
import {HashRouter, Route} from 'react-router-dom'
import CalendarList from './calendar/calendar-list'
import Calendar from './calendar/calendar'
import Test from './test'
import {URL} from '../config'
// import RequestList from './request/requestList'
import RequestList from './request/request-list'
import RequestAdd from './request/request-add'
// import DataRequest from './data/dataRequest'
// import DataDefense from './data/dataDefense'
import ReviewAdd from './printing/reviewAdd'
import ReviewList from './printing/reviewList'
import RequestAll from './request/request-all'
import CalendarInit from "./calendar/calendar-init";

export default class Router extends React.Component {

    render() {
        return (
            <HashRouter history={null}>
                <div>
                    {/*========================================= NOTE: CALENDAR ======================================================================*/}
                    <Route path={URL.CALENDAR.CALENDAR_LIST.MAIN.PATH} exact render={() => <CalendarList/>}/>
                    <Route path={URL.CALENDAR.CALENDAR_INIT.MAIN.PATH} exact render={() => <CalendarInit/>}/>
                    <Route path={URL.CALENDAR.CALENDAR.MAIN.PATH} exact
                           render={({match}) => <Calendar calendarId={match.params.calendarId}/>}/>
                    {/*========================================= NOTE: REQUEST ======================================================================*/}
                    <Route path={URL.REQUEST.REQUEST_LIST.MAIN.PATH} exact render={() => <RequestList/>}/>
                    <Route path={URL.REQUEST.REQUEST_ADD.MAIN.PATH} exact render={({match}) =>
                        <RequestAdd calendarId={match.params.calendarId}
                                    levelId={match.params.levelId}
                                    semesterId={match.params.semesterId}
                                    actionId={match.params.actionId}
                                    ownerId={match.params.ownerId}/>
                    }/>
                    {/*============================================ NOTE: DATA ======================================================================*/}
                    <Route path={URL.DATA.DATA_REQUEST.MAIN.PATH} exact render={() => <RequestAll/>}/>
                    {/*<Route path={URL.DATA.DATA_DEFENSE.MAIN.PATH} exact render={() => <RequestAll/>}/>*/}
                    {/*============================================ NOTE: PRINTING ======================================================================*/}
                    <Route path={URL.PRINTING.REVIEW_ADD.MAIN.PATH} exact render={() => <ReviewAdd/>}/>
                    <Route path={URL.PRINTING.REVIEW_LIST.MAIN.PATH} exact render={() => <ReviewList/>}/>
                    {/*============================================ NOTE: ETC =======================================================================*/}
                    <Route path='/' exact render={() => <div>Nothing</div>}/>
                    <Route path='/test' exact render={() => <Test/>}/>
                </div>
            </HashRouter>
        )
    }
}