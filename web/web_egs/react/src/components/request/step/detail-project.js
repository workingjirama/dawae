import React from 'react'
import {connect} from 'react-redux'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Tag from 'antd/lib/tag'
import Input from 'antd/lib/input'
import Icon from 'antd/lib/icon'
import {setProject, updateProject} from "../../../actions/request/requestAdd";
import Popover from 'antd/lib/popover'

@connect((store) => {
    return {
        lang: store.language.data,
        container: store.main.container,
        calendarItem: store.requestAdd.calendarItem,
        project: store.requestAdd.project
    }
})
export default class DetailProject extends React.Component {
    constructor(props) {
        super(props)
        const {project} = props
        this.state = {
            loading: false,
            visible: false,
            name_th: project === null ? null : project.project_name_th,
            name_en: project === null ? null : project.project_name_en
        }
    }

    nameThChange(name_th) {
        this.setState({name_th})
    }

    nameEnChange(name_en) {
        this.setState({name_en})
    }

    submit() {
        const {dispatch, container} = this.props
        const {name_th, name_en} = this.state
        if (name_th === null || name_en === null || name_th === '' || name_en === '') {
            alert('>.<')
            return
        }
        this.setState({loading: true})
        dispatch(updateProject(name_th, name_en, response => {
            dispatch(setProject(response))
            this.setState({loading: false, visible: false})
        }))
    }

    render() {
        const {lang, calendarItem, project, container} = this.props
        const {name_th, name_en, loading} = this.state
        return (
            <Row>
                <Col onClick={() => container.click()} style={{marginBottom: 16}} span={24}>
                    <Tag class={`tag-${project === null ? 'empty' : 'default'}`}>
                        {project === null ? 'nope' : project.project_name_th}
                    </Tag>
                </Col>
                <Col style={{marginBottom: 16}} span={24}>
                    <Tag class={`tag-${project === null ? 'empty' : 'default'}`}>
                        {project === null ? 'nope' : project.project_name_en}
                    </Tag>
                </Col>
                <Popover visible={this.state.visible} content={
                    <Row gutter={16}>
                        <Row style={{marginBottom: 16}} type="flex" justify="center">
                            <Col style={{textAlign: 'center'}} sm={12} span={24}>
                                PEOJECT_NAME_TH
                            </Col>
                            <Col sm={12} span={24}>
                                <Input value={name_th} size='small' placeholder="PEOJECT_NAME_TH"
                                       onChange={(ev) => this.nameThChange(ev.target.value)}/>
                            </Col>
                        </Row>
                        <Row style={{marginBottom: 16}} type="flex" justify="center">
                            <Col style={{textAlign: 'center'}} sm={12} span={24}>
                                PEOJECT_NAME_EN
                            </Col>
                            <Col sm={12} span={24}>
                                <Input value={name_en} size='small' placeholder="PEOJECT_NAME_EN"
                                       onChange={(ev) => this.nameEnChange(ev.target.value)}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Tag class='clickable tag-big tag-default margin-0'
                                     onClick={() => this.submit()}>{loading ?
                                    <Icon type="loading"/> : 'submit'}</Tag>
                            </Col>
                        </Row>
                    </Row>
                } trigger='click'>
                    <Tag onClick={() => this.setState({visible: !this.state.visible})} class='clickable tag-default'>
                        EDIT LUL
                    </Tag>
                </Popover>
            </Row>
        )
    }
}