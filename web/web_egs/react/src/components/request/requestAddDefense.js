import React from 'react'
import {connect} from 'react-redux'
import {getDefenseEvent, setPost} from "../../actions/request/requestAdd";
import jquery from 'jquery'
import {toastr} from 'react-redux-toastr'

@connect((store) => {
    return {
        container: store.main.container,
        rooms: store.requestAdd.rooms,
        post: store.requestAdd.post,
        lang: store.language.data
    }
})
export default class RequestAddDefense extends React.Component {

    constructor(props) {
        super(props);
        this.calendar = null
        this.defense = {
            type: null,
            room: null,
            date: null,
            start: null,
            end: null
        }
        this.events = []
    }

    componentWillMount() {
        // const {defense} = this.state
        const {post, index, rooms, calendarItem} = this.props
        if (post.defenses[index] === undefined)
            this.defense.room = rooms[0].room_id
        else this.defense.room = post.defenses[index].room
        this.defense.type = calendarItem.request_defense[index].action.action_id
    }

    componentDidMount() {
        // NOTE: fetch needed data
        this.fullCalendarInit()
        this.getDefenseEvent()
    }

    unselect() {
        $(this.calendar).fullCalendar('unselect')
        const index = this.events.findIndex(event => event.type === 'current')
        if (index !== -1)
            this.events.splice(index, 1)
    }

    getDefenseEvent() {
        // const {defense} = this.state
        const {dispatch, calendarItem, index} = this.props
        dispatch(getDefenseEvent(calendarItem, this.defense, events_ => {
            this.unselect()
            let events = []
            this.events.map(event => {
                if (event.type !== 'defense')
                    events.push(event)
            })
            this.events = events.concat(events_)
            this.reCalendar()
        }))
    }

    fullCalendarInit() {
        const {calendarItem, index} = this.props
        const defaultStart = calendarItem.request_defense[index].calendar_item_date_start
        const defaultEnd = calendarItem.request_defense[index].calendar_item_date_end
        $(this.calendar).fullCalendar({
            header: {
                left: 'today prev,next',
                center: 'title',
                right: 'month,agendaDay'
            },
            defaultDate: defaultStart === null ? new Date() : defaultStart,
            selectable: true,
            selectHelper: true,
            allDaySlot: false,
            minTime: '08:00',
            maxTime: '17:00',
            slotLabelFormat: 'HH:mm',
            events: this.events,
            selectLongPressDelay: 0,
            validRange: {
                start: defaultStart === null ? new Date() : defaultStart,
                end: defaultEnd === null ? null : new Date(defaultEnd).setDate(new Date(defaultEnd).getDate() + 1)
            },
            select: (start, end) => {
                //IF SELECT TIME NOT DATE
                const {calendarItem} = this.props
                if (start._i.length !== undefined) {
                    let overlap = $(this.calendar).fullCalendar('clientEvents', (ev) => {
                        if (ev.type === 'defense')
                            return (Math.round(ev.start) / 1000 < Math.round(end) / 1000 && Math.round(ev.end) > Math.round(start))
                    })
                    start = moment(new Date(start._i[0], start._i[1], start._i[2], start._i[3], start._i[4], start._i[5], start._i[6]))
                    end = moment(new Date(end._i[0], end._i[1], end._i[2], end._i[3], end._i[4], end._i[5], end._i[6]))

                    //IF OVERLAP
                    if (overlap.length) {
                        $(this.calendar).fullCalendar('unselect')
                    } else {
                        this.unselect()
                        event = {
                            title: calendarItem.request_defense[index].action.action_name,
                            start: start.format('YYYY-MM-DDTHH:mm:ss'),
                            end: end.format('YYYY-MM-DDTHH:mm:ss'),
                            type: 'current',
                            backgroundColor: '#F19C65',
                            borderColor: '#F19C65'
                        }
                        this.events.push(event)
                        this.reCalendar()
                    }
                } else {
                    $(this.calendar).fullCalendar('changeView', 'agendaDay')
                    $(this.calendar).fullCalendar('gotoDate', start)
                }
            }
        })
    }

    reCalendar() {
        $(this.calendar).fullCalendar('unselect')
        $(this.calendar).fullCalendar('removeEvents')
        $(this.calendar).fullCalendar('addEventSource', this.events)
        $(this.calendar).fullCalendar('rerenderEvents')
    }

    roomChange(roomId) {
        // const {defense} = this.state
        if (roomId !== this.defense.room) {
            this.defense.room = roomId
            this.getDefenseEvent()
        }
    }

    addDefense() {
        const index_ = this.events.findIndex(event => event.type === 'current')
        if (index_ === -1) {
            toastr.error('DATE/TIME NULL', 'PLS SELECT TIME', {preventDuplicates: false})
            return
        }
        const event = this.events[index_]
        const {dispatch, post, index} = this.props
        this.defense = {
            ...this.defense,
            date: moment(new Date(event.start)).format('YYYY/MM/DD'),
            start: moment(new Date(event.start)).format('HH:mm'),
            end: moment(new Date(event.end)).format('HH:mm')
        }
        // console.log(this.defense)
        // return
        let newPost = Object.assign({}, post, {
            ...post,
            defenses: [
                ...post.defenses.slice(0, index),
                this.defense,
                ...post.defenses.slice(index + 1)
            ]
        })
        dispatch(setPost(newPost))
        jquery('.close-toastr').click()
    }

    render() {
        const {teachers, positions, post, rooms, lang} = this.props
        return (
            <div class='defense-add' style={{
                maxHeight: window.innerHeight * .8
            }}>
                <form class='validation' style={{display: 'flex'}}>
                    <div class='form-group' style={{width: '50%'}}>
                        <label class='margin-right-15'>{lang.requestAdd.chooseRoom}</label>
                        <div class='btn-group' data-toggle='buttons'>
                            {rooms.map((room, idx) =>
                                <label key={idx}
                                       class={`btn btn-3d btn-sm btn-white ${this.defense.room === room.room_id ? ' active' : null}`}
                                       onClick={() => this.roomChange(room.room_id)}>
                                    <input type='radio' name='options'/>
                                    <div>{room.room_name}</div>
                                </label>)
                            }
                        </div>
                    </div>
                    <div class='form-group' style={{width: '50%', float: 'right'}}>
                        {/* XD */}
                    </div>
                </form>
                <div ref={elm => {
                    this.calendar = elm
                }}/>
                <button onClick={() => this.addDefense()} class='btn btn-block btn-success'>LOL</button>
            </div>
        )
    }
}