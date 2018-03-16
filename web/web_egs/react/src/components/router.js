import React from 'react'
import {HashRouter, Route} from 'react-router-dom'
import CalendarList from './calendar/calendarList';
import Test from './test';
import CalendarSemester from "./calendar/calendar";
import Calendar from "./calendar/calendarList";
import {URL} from "../config";
import RequestList from "./request/requestList";
import RequestAdd from "./request/requestAdd";
import DataRequest from "./data/dataRequest";
import DataDefense from "./data/dataDefense";

export default class Router extends React.Component {

    render() {
        return (
            <HashRouter history={null}>
                <div>
                    {/*========================================= NOTE: CALENDAR ======================================================================*/}
                    <Route path={URL.CALENDAR.CALENDAR_LIST.MAIN.PATH} exact render={() => <CalendarList/>}/>
                    <Route path={URL.CALENDAR.CALENDAR.MAIN.PATH} exact
                           render={({match}) => <CalendarSemester calendarId={match.params.calendarId}/>}/>
                    {/*========================================= NOTE: REQUEST ======================================================================*/}
                    <Route path={URL.REQUEST.REQUEST_LIST.MAIN.PATH} exact render={() => <RequestList/>}/>
                    <Route path={URL.REQUEST.REQUEST_ADD.MAIN.PATH} exact
                           render={({match}) =>
                               <RequestAdd calendarId={match.params.calendarId}
                                           semesterId={match.params.semesterId}
                                           actionId={match.params.actionId}
                               />}
                    />
                    {/*============================================ NOTE: DATA ======================================================================*/}
                    <Route path={URL.DATA.DATA_REQUEST.MAIN.PATH} exact render={() => <DataRequest/>}/>
                    <Route path={URL.DATA.DATA_DEFENSE.MAIN.PATH} exact render={() => <DataDefense/>}/>

                    {/*============================================ NOTE: ETC =======================================================================*/}
                    <Route path="/" exact render={() => <div>Nothing</div>}/>
                    <Route path="/test" exact render={() => <Test/>}/>
                </div>
            </HashRouter>
        )
    }
}