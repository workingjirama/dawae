import React from 'react'
import {connect} from 'react-redux'
import {getAllLevel, getAllSemester} from '../../actions/calendar/calendar'
import {URL} from './../../config'
import {setHeader} from '../../actions/main'
import Tag from 'antd/lib/tag'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Loading from "../loading";
import Select from 'antd/lib/select'
import {getAllCalendar} from "../../actions/calendar/calendarList";
import {getAction, getDefense, resetDefenseAll, UpdateDefense} from "../../actions/defense/defense-all";
import JSZip from 'jszip'
import Docxtemplater from 'docxtemplater'
import JSZipUtils from 'jszip-utils'
import FileSaver from 'file-saver'

const {Option} = Select

@connect((store) => {
    return {
        config: store.main.config,
        defenses: store.defenseAll.defenses,
        actions: store.defenseAll.actions,
        semesters: store.calendar.semesters,
        levels: store.calendar.levels,
        lang: store.language.data,
        calendars: store.calendarList.all
    }
})
export default class DefenseAll extends React.Component {

    constructor() {
        super()
        this.calendar = null
        this.level = null
        this.semester = null
        this.action = null
        this.state = {
            loading: false
        }
    }

    componentWillUnmount() {
        const {dispatch} = this.props
        dispatch(resetDefenseAll())
    }

    componentDidMount() {
        const {dispatch, lang} = this.props
        dispatch(getAllCalendar())
        dispatch(getAllSemester())
        dispatch(getAllLevel())
        dispatch(getDefense(this.calendar, this.level, this.semester, this.action))
        dispatch(getAction())
    }

    calendarChange(value) {
        this.calendar = value
        this.updateUserRequest()
    }

    levelChange(value) {
        this.level = value
        this.updateUserRequest()
    }

    semesterChange(value) {
        this.semester = value
        this.updateUserRequest()
    }

    actionChange(value) {
        this.action = value
        this.updateUserRequest()
    }

    updateUserRequest() {
        const {dispatch} = this.props
        dispatch(UpdateDefense(null))
        dispatch(getDefense(this.calendar, this.level, this.semester, this.action))
    }

    moneify(money) {
        return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    print_defense_fee() {
        const {defenses, config} = this.props
        let data = []
        defenses.map(
            (defense, index) => {
                let committee_fee = 0
                let advisor_fee = 0
                let committee_main_each_fee = 0
                let committee_co_each_fee = 0
                let advisors = []
                let committees = []
                defense.defense_advisor.map(
                    (advisor, index) => {
                        let advisor_ = {
                            index: index + 1,
                            name: `${advisor.teacher.prefix} ${advisor.teacher.person_fname} ${advisor.teacher.person_lname}`,
                            fee: this.moneify(advisor.advisor_fee_amount)
                        }
                        advisor_fee += advisor.advisor_fee_amount
                        advisors.push(advisor_)
                    }
                )
                defense.committees.map(
                    (committee, index) => {
                        let committee_ = {
                            index: index + 1,
                            name: `${committee.teacher.prefix} ${committee.teacher.person_fname} ${committee.teacher.person_lname}`,
                            position: committee.position.position_name,
                            fee: this.moneify(committee.fee)
                        }
                        if (committee.position.position_id === config.COMMITTEE_MAIN_POSITION) {
                            committee_main_each_fee = committee.fee
                        }
                        if (committee.position.position_id === config.COMMITTEE_CO_POSITION) {
                            committee_co_each_fee = committee.fee
                        }
                        committee_fee += committee.fee
                        committees.push(committee_)
                    }
                )
                let data_ = {
                    plan: defense.student.plan.plan_name,
                    plan_type: defense.student.plan_type.plan_type_name,
                    level: defense.student.level.level_name,
                    program: defense.student.program.program_name,
                    branch: defense.student.branch.branch_name,
                    student_id: defense.student.person.user_id,
                    student_name: `${defense.student.person.prefix} ${defense.student.person.student_fname} ${defense.student.person.student_lname}`,
                    committees, advisors,
                    advisor_fee: this.moneify(advisor_fee),
                    committee_fee: this.moneify(committee_fee),
                    committee_main_each_fee: this.moneify(committee_main_each_fee),
                    committee_co_each_fee: this.moneify(committee_co_each_fee),
                    total_fee: this.moneify(advisor_fee + committee_fee)
                }
                data.push(data_)
            }
        )
        this.print('fee', {data})
    }

    print_defense() {
        const {defenses} = this.props
        let data = []
        defenses.map(
            (defense, index) => {
                let committees = []
                defense.committees.map(
                    committee => {
                        let committee_ = {
                            name: `${committee.teacher.prefix} ${committee.teacher.person_fname} ${committee.teacher.person_lname}`,
                            position: committee.position.position_name
                        }
                        committees.push(committee_)
                    }
                )
                let data_ = {
                    index: index + 1,
                    date: defense.defense_date,
                    time: `${defense.defense_time_start} - ${defense.defense_time_end}`,
                    program: defense.student.program.program_name,
                    student_id: defense.student.person.user_id,
                    student_name: `${defense.student.person.prefix} ${defense.student.person.student_fname} ${defense.student.person.student_lname}`,
                    project_name_th: defense.project.project_name_th,
                    project_name_en: defense.project.project_name_en,
                    student_plan_type: defense.student.plan_type.plan_type_name,
                    committee: committees,
                    room: defense.room.room_name
                }
                data.push(data_)
            }
        )
        this.print('defense', {data})
    }

    print(doc_name, data) {
        JSZipUtils.getBinaryContent(`${URL.BASE}/web_egs/docx/${doc_name}.docx`, (error, content) => {
            if (error)
                throw error
            let zip = new JSZip(content);
            let doc = new Docxtemplater().loadZip(zip)
            doc.setData(data)
            doc.render()
            let out = doc.getZip().generate({
                type: "blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            })
            FileSaver.saveAs(out, "output.docx")
        })
    }

    render() {
        const {defenses, actions, semesters, levels, calendars, lang} = this.props
        const {loading} = this.state
        return (
            levels === null || semesters === null || actions === null ? <Loading/> :
                <Row>
                    <Col span={24}>
                        <Row>
                            <Col span={24}>
                                <Select style={{width: '100%'}} disabled={loading}
                                        onChange={(value) => this.calendarChange(value)}
                                        defaultValue={calendars[calendars.findIndex(calendar => calendar.calendar_active === 1)].calendar_id}>
                                    {
                                        calendars.map(
                                            (calendar, index) =>
                                                <Option key={index} value={calendar.calendar_id}>
                                                    {calendar.calendar_id}
                                                </Option>
                                        )
                                    }
                                </Select>
                            </Col>
                            <Col span={24}>
                                <Select style={{width: '100%'}} defaultValue={levels[0].level_id}
                                        onChange={(value) => this.levelChange(value)} disabled={loading}>
                                    {
                                        levels.map(
                                            (level, index) =>
                                                <Option key={index} value={level.level_id}>
                                                    {level.level_name}
                                                </Option>
                                        )
                                    }
                                </Select>
                            </Col>
                            <Col span={24}>
                                <Select style={{width: '100%'}} defaultValue={semesters[0].semester_id}
                                        onChange={(value) => this.semesterChange(value)} disabled={loading}>
                                    {
                                        semesters.map(
                                            (semester, index) =>
                                                <Option key={index} value={semester.semester_id}>
                                                    {semester.semester_name}
                                                </Option>
                                        )
                                    }
                                </Select>
                            </Col>
                            <Col span={24}>
                                <Select style={{width: '100%'}} defaultValue={actions[0].action_id}
                                        onChange={(value) => this.actionChange(value)} disabled={loading}>
                                    {
                                        actions.map(
                                            (action, index) =>
                                                <Option key={index} value={action.action_id}>
                                                    {action.action_name}
                                                </Option>
                                        )
                                    }
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                    <Tag class='clickable tag-default' onClick={() => this.print_defense()}>print_defense</Tag>
                    <Tag class='clickable tag-default' onClick={() => this.print_defense_fee()}>print_defense_fee</Tag>
                    <Col span={24}>
                        {
                            defenses === null ? <Loading/> :
                                <table class='table'>
                                    <thead>
                                    <tr>
                                        <th>
                                            <Row class='table-row' type='flex'>
                                                <Col class='text-center table-col'
                                                     sm={24} span={24}>
                                                    LUL
                                                </Col>
                                            </Row>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        defenses.map(
                                            (defense, index) => {
                                                const action = actions[actions.findIndex(action => action.action_id === defense.defense_type.action_id)]
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <Row class='table-row' type='flex'>
                                                                <Col class='text-center table-col' sm={8} span={24}>
                                                                    <div>{defense.student.person.user_id}</div>
                                                                    <div>{`${defense.student.person.prefix} ${defense.student.person.student_fname} ${defense.student.person.student_lname}`}</div>
                                                                </Col>
                                                                <Col class='text-center table-col' sm={8} span={24}>
                                                                    {action.action_name}
                                                                </Col>
                                                                <Col class='text-center table-col' sm={8} span={24}>
                                                                    XD
                                                                </Col>
                                                            </Row>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        )
                                    }
                                    </tbody>
                                </table>
                        }
                    </Col>
                </Row>
        )
    }
}