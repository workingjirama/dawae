import React from 'react'
import {connect} from 'react-redux'
import {URL} from '../../config'
import JSZip from 'jszip'
import Docxtemplater from 'docxtemplater'
import JSZipUtils from 'jszip-utils'
import FileSaver from 'file-saver'
import Loading from "../loading";
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Checkbox from 'antd/lib/checkbox'
import Tag from 'antd/lib/tag'
import {getUserEvaluation} from "../../actions/evaluation/evaluation-all";

@connect((store) => {
    return {
        userEvaluations: store.evaluationAll.userEvaluations,
        lang: store.language.data
    }
})
export default class EvaluationAll extends React.Component {
    constructor() {
        super()
        this.checkBox = []
        this.state = {
            indeterminate: false,
            checked: false
        }
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(getUserEvaluation())
    }

    printingSelected() {
        const {userEvaluations} = this.props
        let data = {}
        data.components = []
        this.checkBox.map((checkBox, index) => {
            if (checkBox.rcCheckbox.state.checked) {
                data.components.push(JSON.parse(userEvaluations[index].user_evaluation_data).data)
            }
        })

        console.log(data)
        return

        function loadFile(url, callback) {
            JSZipUtils.getBinaryContent(url, callback)
        }

        loadFile(`${URL.BASE}/web_egs/uploads/eval/eval_template_${userEvaluations[0].evaluation_id}.docx`, (error, content) => {
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

    check(checked, index_) {
        let isTrue = []
        let isFalse = []
        this.checkBox.map((checkBox, index) => {
            if (index === index_)
                checked ? isTrue.push(true) : isFalse.push(false)
            else
                checkBox.rcCheckbox.state.checked ? isTrue.push(true) : isFalse.push(false)
        })
        if (isTrue.length === 0)
            this.setState({checked: false, indeterminate: false})
        else if (isFalse.length === 0)
            this.setState({checked: true, indeterminate: false})
        else
            this.setState({checked: false, indeterminate: true})
    }

    mainCheck() {
        const {indeterminate, checked} = this.state
        if (indeterminate)
            this.setState({checked: true, indeterminate: false})
        if (checked)
            this.setState({checked: false, indeterminate: false})
        else
            this.setState({checked: true, indeterminate: false})
        this.checkBox.map((checkBox, index) => {
            checkBox.rcCheckbox.setState({checked: !checked})
        })
    }

    render() {
        const {userEvaluations, lang} = this.props
        const {indeterminate, checked} = this.state
        this.checkBox = []
        console.log(userEvaluations)
        return (
            userEvaluations === null ? <Loading/> :
                <Row type='flex' justify='center'>
                    <Col sm={22} span={24}>
                        <Tag class='clickable tag-default'
                             onClick={() => this.printingSelected()}>
                            DONWLOAD SELECTED
                        </Tag>
                        <table class='table'>
                            <thead>
                            <tr>
                                <th>
                                    <Row class='table-row' type='flex'>
                                        <Col class='text-center table-col'
                                             sm={2} span={24}>
                                            <Checkbox indeterminate={indeterminate}
                                                      onChange={() => this.mainCheck()}
                                                      checked={checked}/>
                                        </Col>
                                        <Col class='text-center table-col'
                                             sm={11} span={24}>
                                            STUDENT
                                        </Col>
                                        <Col class='text-center table-col'
                                             sm={11} span={24}>
                                            TYPE
                                        </Col>
                                    </Row>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                userEvaluations.map(
                                    (userEvaluation, index) =>
                                        <tr key={index}>
                                            <td>
                                                <Row class='table-row' type='flex'>
                                                    <Col class='text-center table-col' sm={2} span={24}>
                                                        <Checkbox ref={ref => {
                                                            if (ref !== null) this.checkBox.push(ref)
                                                        }} onChange={(ev) => this.check(ev.target.checked, index)}/>
                                                    </Col>
                                                    <Col class='text-center table-col' sm={11} span={24}>
                                                        {`${userEvaluation.student.prefix} ${userEvaluation.student.student_fname} ${userEvaluation.student.student_lname}`}
                                                    </Col>
                                                    <Col class='text-center table-col' sm={11} span={24}>
                                                        {userEvaluation.evaluation_id}
                                                    </Col>
                                                </Row>
                                            </td>
                                        </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </Col>
                </Row>
        )
    }
}