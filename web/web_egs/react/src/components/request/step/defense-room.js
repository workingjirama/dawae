import React from 'react'
import {connect} from 'react-redux'
import Select from 'antd/lib/select'

const Option = Select.Option;

@connect((store) => {
    return {
        lang: store.language.data,
        rooms: store.requestAdd.rooms,
    }
})
export default class DefenseRoom extends React.Component {

    roomChange(room) {
        const {roomChange} = this.props
        roomChange(room)
    }

    render() {
        const {lang, rooms} = this.props
        return (
            <Select defaultValue={rooms[0].room_id} style={{width: 250}} onChange={(room) => {
                this.roomChange(room)
            }}>
                {
                    rooms.map(
                        (room, index) =>
                            <Option key={index} value={room.room_id}>{room.room_name}</Option>
                    )
                }
            </Select>
        )
    }
}