import React from 'react'
import {connect} from 'react-redux'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Tag from 'antd/lib/tag'
import InputNumber from 'antd/lib/input-number'
import Input from 'antd/lib/input'
import Checkbox from 'antd/lib/checkbox'
import {updateResult} from "../../../actions/request/requestData"
import {updateUserRequest} from "../../../actions/data/dataRequest";

const {TextArea} = Input

@connect((store) => {
    return {
        lang: store.language.data,
        status: store.requestData.status,
        config: store.main.config,
        currentUser: store.main.currentUser
    }
})
export default class DefenseResultEach extends React.Component {

    constructor(props) {
        super(props)
        const {defense} = props
        this.state = {
            score: defense.defense_score,
            credit: defense.defense_credit,
            comment: defense.defense_comment,
            cond: defense.defense_status_id === this.STATUS_PASS_COND,
            edit: false,
            disabled: false
        }
    }

    update() {
        const {dispatch, userRequest, defense, mainIndex} = this.props
        const {score, credit, comment, cond} = this.state
        const post = {score, credit, comment, cond}
        this.setState({disabled: true})
        dispatch(updateResult(userRequest, defense, post, response => {
            dispatch(updateUserRequest(mainIndex, response))
            this.setState({disabled: false})
            this.unedit()
        }))
    }

    scoreChange(score) {
        const {cond} = this.state
        const {config} = this.props
        this.setState({score})
        const status_id = score === undefined ?
            config.DEFENSE_STATUS_DEFAULT : score >= config.PASS_DEFENSE_SCORE ? cond ?
                config.DEFENSE_STATUS_PASS_CON : config.DEFENSE_STATUS_PASS : config.DEFENSE_STATUS_FAIL
        this.statusChange(status_id)
    }

    statusChange(status_id) {
        const {dispatch, userRequest, defense, mainIndex, index} = this.props
        const userRequest_ = Object.assign({}, userRequest, {
            ...userRequest,
            defenses: [
                ...userRequest.defenses.slice(0, index),
                {
                    ...defense,
                    defense_status_id: status_id
                },
                ...userRequest.defenses.slice(index + 1)
            ]
        })
        dispatch(updateUserRequest(mainIndex, userRequest_))
    }

    creditChange(credit) {
        this.setState({credit})
    }

    commnetChange(comment) {
        this.setState({comment})
    }

    condChange(cond) {
        this.setState({cond})
        const status_id = cond ? this.STATUS_PASS_COND : this.STATUS_PASS
        this.statusChange(status_id)
    }

    edit() {
        this.setState({edit: true})
    }

    unedit() {
        this.setState({edit: false})
    }

    render() {
        const {lang, defense, status, config, currentUser, notYet} = this.props
        const {score, credit, comment, edit, cond, disabled} = this.state
        const isStaff = currentUser.user_type_id === config.PERSON_STAFF_TYPE
        const isTeacher = currentUser.user_type_id === config.PERSON_TEACHER_TYPE
        const editor = (isStaff || isTeacher) && !notYet
        const pass = score >= config.PASS_DEFENSE_SCORE
        const defense_status = status[status.findIndex(status => status.status_id === defense.defense_status_id)]
        return (
            <Row>
                <Row style={{marginBottom: 8}}>
                    <Row style={{marginBottom: 8}}>
                        <Col span={6}>
                            STATUS
                        </Col>
                        <Col span={12}>
                            <Tag
                                class={`tag-${defense_status.status_label} margin-0`}>{defense_status.status_name}</Tag>
                        </Col>
                    </Row>
                    <Row style={{marginBottom: 8}}>
                        <Col span={6}>
                            SCORE
                        </Col>
                        <Col span={18}>
                            {
                                edit ?
                                    <InputNumber size='small' min={1} max={100} defaultValue={score}
                                                 onChange={(value) => this.scoreChange(value)}/> :
                                    <Tag class='tag-default margin-0'>
                                        {score === null ? '---' : score}
                                    </Tag>
                            }
                            {
                                !edit ? null :
                                    !defense.defense_cond ? null :
                                        !pass ? null :
                                            <Checkbox style={{marginLeft: 8}} checked={cond}
                                                      onChange={(ev) => this.condChange(ev.target.checked)}>
                                                Checkbox
                                            </Checkbox>
                            }
                        </Col>
                    </Row>
                    {
                        !defense.defense_credit ? null :
                            <Row style={{marginBottom: 8}}>
                                <Col span={6}>
                                    CREDIT
                                </Col>
                                <Col span={18}>
                                    {
                                        edit ?
                                            <InputNumber size="small" min={1} max={12} defaultValue={credit}
                                                         onChange={(value) => this.creditChange(value)}/> :
                                            <Tag class='tag-default margin-0'>{credit === null ? '---' : credit}</Tag>
                                    }
                                </Col>
                            </Row>
                    }
                    <Row style={{marginBottom: 8}}>
                        <Col span={6}>
                            COMMENT
                        </Col>
                        <Col span={18}>
                            {
                                edit ?
                                    <TextArea defaultValue={comment === null ? null : comment.replace(/<br\/>/g, '\n')}
                                              rows={4}
                                              onChange={(ev) => this.commnetChange(ev.target.value)}/> :
                                    <Tag class='tag-default margin-0'
                                         style={{maxWidth: '100%', height: 'initial'}}>
                                        {
                                            comment === null ? '---' :
                                                defense.defense_comment.split('<br/>').map(
                                                    (comment_, index) =>
                                                        comment_ === '' ? <br key={index}/> :
                                                            <div key={index} style={{whiteSpace: 'initial'}}>
                                                                {comment_}
                                                            </div>
                                                )
                                        }
                                    </Tag>
                            }
                        </Col>
                    </Row>
                </Row>
                {
                    !editor ? null :
                        <Row style={{marginBottom: 8}}>
                            <Col span={24}>
                                {
                                    edit ?
                                        <Tag class='clickable tag-big tag-success margin-0'
                                             disabled={disabled} onClick={() => this.update()}>
                                            INSERT
                                        </Tag> :
                                        <Tag class='clickable tag-big tag-default margin-0' onClick={() => this.edit()}>
                                            EDIT
                                        </Tag>
                                }
                            </Col>
                        </Row>
                }
            </Row>
        )
    }
}