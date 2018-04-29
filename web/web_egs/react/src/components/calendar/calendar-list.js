import React from 'react'
import {connect} from 'react-redux'
import {
    getAllCalendar,
    insertCalendar,
    resetCalendarList,
    setPostCalendar,
} from '../../actions/calendar/calendarList'
import {setHeader} from '../../actions/main'
import {URL} from '../../config'
import Popover from 'antd/lib/popover'
import Card from 'antd/lib/card'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Icon from 'antd/lib/icon'
import Input from 'antd/lib/input'
import Tag from 'antd/lib/tag'

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

    constructor() {
        super()
        this.state = {
            year: null,
            visible: false,
            loading: false
        }
    }

    componentWillUnmount() {
        const {dispatch} = this.props
        dispatch(resetCalendarList())
    }

    componentDidMount() {
        const {dispatch, lang} = this.props
        // NOTE: fetch needed data
        dispatch(setHeader(lang.calendarList.head))
        dispatch(getAllCalendar())
    }

    changeYear(year) {
        this.setState({year})
    }

    submitYear() {
        const {post, dispatch, active, container} = this.props
        const {year, loading} = this.state
        if (!loading) {
            if (year === null || year === '')
                alert('YEAR NULL', 'PLS TRY AGAIN')
            else if (year.length !== 4)
                alert('YEAR 4 CHAR', 'PLS TRY AGAIN')
            else if (isNaN(year))
                alert('NUMBER ONLY', 'PLS TRY AGAIN')
            else {
                this.setState({loading: true})
                dispatch(insertCalendar(year, (resp) => {
                    if (resp !== 1)
                        alert('DUPLICATE', 'PLS TRY AGAIN')
                    else {
                        dispatch(getAllCalendar())
                        this.setState({visible: false, year: null})
                    }
                    this.setState({loading: false})
                }))
            }
        }
    }

    visible(visible) {
        this.setState({visible})
    }

    render() {
        const {calendars, active, lang} = this.props
        const {year, visible, loading} = this.state
        return (
            <Row gutter={8}>
                <Col span={24} sm={6}>
                    <Popover placement='right' trigger="click" visible={visible} content={
                        <Row>
                            <Input value={year} style={{width: 60}} placeholder="Year"
                                   maxLength={4} onChange={(ev) => this.changeYear(ev.target.value)}/>
                            <Tag class='clickable tag-medium tag-success' onClick={() => this.submitYear()}>
                                {loading ? <Icon type="loading"/> : lang.calendarList.add}
                            </Tag>
                        </Row>
                    }>
                        <Card class='clickable' onClick={() => this.visible(!visible)}>
                            <Icon type="plus"/>
                            <span style={{marginLeft: 8}}>ADD</span>
                        </Card>
                    </Popover>
                </Col>
                {
                    calendars === null ? null : calendars.map(
                        calendar =>
                            <Col key={calendar.calendar_id} span={24} sm={6} onClick={() => {
                                window.location = `${URL.EGS_BASE}/#/calendar/${calendar.calendar_id}`
                            }}>
                                <Card class={`clickable ${!calendar.calendar_active ? '' : 'background-success'}`}>
                                    {calendar.calendar_id}
                                </Card>
                            </Col>
                    )
                }
            </Row>
        )
    }
}