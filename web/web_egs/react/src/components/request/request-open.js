import React from 'react'
import {connect} from 'react-redux'
import Modal from 'antd/lib/modal'
import Icon from 'antd/lib/icon'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Collapse from 'antd/lib/collapse'
import RequestProcess from "./request-process";

@connect((store) => {
    return {
        lang: store.language.data,
        status: store.requestData.status
    }
})
export default class RequestOpen extends React.Component {
    constructor() {
        super()
        this.state = {
            open: false
        }
    }

    open() {
        this.setState({open: true})
    }

    close = () => {
        this.setState({open: false});
    }

    render() {
        const {lang, current, userRequest, status, index} = this.props
        return status === null ? null : [
            <label key='btn' onClick={() => this.open()} class={'clickable label label-info'}>
                CLICK ME
            </label>,
            <Modal key='md' footer={null} title='HEADER' destroyOnClose
                   visible={this.state.open} onCancel={() => this.close()}>
                <RequestProcess index={index} userRequest={userRequest}/>
            </Modal>
        ]
    }
}