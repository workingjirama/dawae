import React from 'react'
import {connect} from 'react-redux'
import {setPost} from "../../actions/request/requestAdd";
import jquery from 'jquery'

@connect((store) => {
    return {
        rooms: store.requestAdd.rooms,
        post: store.requestAdd.post,
        calendarItem: store.requestAdd.calendarItem,
    }
})
export default class RequestAddDefense extends React.Component {

    constructor(props) {
        super(props);
        this.calendar = null
        this.overlab = false
        this.state = {
            defense: {
                type: null,
                room: null,
                date: null,
                start: null,
                end: null
            }
        }
    }

    componentWillMount() {
        const {defense} = this.state
        const {post, index, rooms, calendarItem} = this.props
        if (post.defenses[index] === undefined)
            defense.room = rooms[0].room_id
        else defense.room = post.defenses[index].room
        defense.type = calendarItem.request_defense[index].action.action_id
    }

    componentDidMount() {
        // NOTE: fetch needed data
        this.fullCalendarInit()
    }

    fullCalendarInit() {
        const {calendarItem, index} = this.props
        // console.log(calendarItem.request_defense[index])
        $(this.calendar).fullCalendar({
            header: {
                left: 'today prev,next',
                center: 'title',
                right: 'month,agendaDay'
            },
            defaultDate: new Date(calendarItem.request_defense[index].calendar_item_date_start),
            selectable: true,
            selectHelper: true,
            allDaySlot: false,
            minTime: "08:00",
            maxTime: "17:00",
            slotLabelFormat: "HH:mm",
            locale: "th",
            selectLongPressDelay: 100,
            validRange: {
                start: calendarItem.request_defense[index].calendar_item_date_start,
                end: new Date(calendarItem.request_defense[index].calendar_item_date_end)
                    .setDate(new Date(calendarItem.request_defense[index].calendar_item_date_end).getDate() + 1)
            },
            select: (start, end) => {
                //IF SELECT TIME NOT DATE
                if (start._i.length !== undefined) {
                    let overlap = $(this.calendar).fullCalendar('clientEvents', (ev) => {
                        return (Math.round(ev.start) / 1000 < Math.round(end) / 1000 && Math.round(ev.end) > Math.round(start))
                    })
                    //IF OVERLAP
                    if (overlap.length) {
                        this.overlab = true
                        $(this.calendar).fullCalendar('unselect')
                    } else {
                        let date = moment(new Date(start)).format("YYYY-MM-DD");
                        start = moment(new Date(start._i[0], start._i[1], start._i[2], start._i[3], start._i[4], start._i[5], start._i[6])).format("HH:mm")
                        end = moment(new Date(end._i[0], end._i[1], end._i[2], end._i[3], end._i[4], end._i[5], end._i[6])).format("HH:mm")
                        this.state.defense.date = date
                        this.state.defense.start = start
                        this.state.defense.end = end
                    }
                } else {
                    $(this.calendar).fullCalendar("changeView", "agendaDay")
                    $(this.calendar).fullCalendar("gotoDate", start)
                }
            },
            unselect: (ev) => {
                if (this.overlab) {
                    this.state.defense = {}
                    this.state.defense.date = null
                    this.state.defense.start = null
                    this.state.defense.end = null
                } else {
                    // console.log('TRIGGERED SELECT HERE')
                    // $(this.calendar).fullCalendar('select')
                }
                this.overlab = false
            }
        })
    }

    roomChange(roomId) {
        this.state.defense.room = roomId
    }

    addDefense() {
        const {dispatch, post, index} = this.props
        console.log(typeof post.defenses)
        let newPost = Object.assign({}, post, {
            ...post,
            defenses: [
                ...post.defenses.slice(0, index),
                this.state.defense,
                ...post.defenses.slice(index + 1)
            ]
        })
        dispatch(setPost(newPost))
        jquery('.close-toastr').click()
    }

    render() {
        const {teachers, positions, post, rooms} = this.props
        console.log(this.props.index)
        return (
            <div class="calendar-xd" style={{maxHeight: window.innerHeight * .8}}>
                <form class="validation" key="form">
                    <div class="form-group">
                        <label class="margin-right-15">เลือกห้องสอบ</label>
                        <div class="btn-group" data-toggle="buttons">
                            {rooms.map((room, idx) =>
                                <label key={idx}
                                       class={`btn btn-3d btn-sm btn-white ${this.state.defense.room === room.room_id ? " active" : null}`}
                                       onClick={() => this.roomChange(room.room_id)}>
                                    <input type="radio" name="options"/>
                                    <div>{room.room_name}</div>
                                </label>)
                            }
                        </div>
                    </div>
                </form>
                <div id="Lolz"
                     ref={elm => {
                         this.calendar = elm
                     }}/>
                <button onClick={() => this.addDefense()} class="btn btn-block btn-green">LOL</button>
            </div>
        )
    }
}