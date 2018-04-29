import React from 'react'
import {connect} from 'react-redux'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import {URL} from '../../config'

@connect((store) => {
    return {
        lang: store.language.data
    }
})
export default class RequestListEach extends React.Component {

    render() {
        const {calendarItem, lang} = this.props
        return (
            <tr>
                <td>
                    <Row>
                        <Col class='text-center' sm={9} span={24}>
                            {calendarItem.action.action_name}
                        </Col>
                        <Col class='text-center' sm={9} span={24}>
                            {`${moment(new Date(calendarItem.calendar_item_date_start)).format("LL")} ${lang.requestList.to} ${moment(new Date(calendarItem.calendar_item_date_end)).format("LL")}`}
                        </Col>
                        <Col class='text-center' sm={6} span={24}>
                            {
                                !calendarItem.calendar_item_for ? 'NOPE' :
                                    calendarItem.calendar_item_open ?
                                        <button onClick={() => {
                                            window.location = URL.REQUEST.REQUEST_ADD.MAIN.LINK(calendarItem)
                                        }}
                                                class={`btn btn-xs btn-${calendarItem.calendar_item_added ? 'info' : 'success' }`}>
                                            {calendarItem.calendar_item_added ? lang.requestList.edit : lang.requestList.add}
                                        </button> :
                                        <label class="label label-danger">
                                            {lang.requestList.not}
                                        </label>
                            }
                        </Col>
                    </Row>
                </td>
            </tr>

        )
    }
}