import React from 'react'
import {connect} from 'react-redux'
import {URL} from '../../config'
import JSZip from 'jszip'
import Docxtemplater from 'docxtemplater'
import JSZipUtils from 'jszip-utils'
import FileSaver from 'file-saver'
import {getPrinting} from "../../actions/evaluation/printing";
import Loading from "../loading";
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Checkbox from 'antd/lib/checkbox'
import Tag from 'antd/lib/tag'


// import mammoth from "mammoth"

// import docxConverter from 'docx-pdf'


@connect((store) => {
    return {
        printings: store.printing.printings,
        lang: store.language.data
    }
})
export default class PrintingList extends React.Component {
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
        dispatch(getPrinting())
    }

    printing(data) {
        data = JSON.parse(data)
        function loadFile(url, callback) {
            JSZipUtils.getBinaryContent(url, callback)
        }
        loadFile(`${URL.BASE}/web_egs/docx/Doc1.docx`, (error, content) => {
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
            let file = new File([out, out], "lul.docx")
            console.log(file)
            return
            FileSaver.saveAs(out, "output.docx")
        })
    }

    printingSelected() {
        const {printings} = this.props
        let data = {}
        data.components = []
        this.checkBox.map((checkBox, index) => {
            if (checkBox.rcCheckbox.state.checked) {
                data.components.push(JSON.parse(printings[index].printing_data))
            }
        })

        function loadFile(url, callback) {
            JSZipUtils.getBinaryContent(url, callback)
        }

        loadFile(`${URL.BASE}/web_egs/docx/Doc2.docx`, (error, content) => {
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
        const {printings, lang} = this.props
        const {indeterminate, checked} = this.state
        this.checkBox = []
        return (
            printings === null ? <Loading/> :
                <Row type='flex' justify='center'>
                    <Col sm={22} span={24}>
                        <table class='table'>
                            <thead>
                            <tr>
                                <th>
                                    <Row class='table-row' type='flex'>
                                        <Col class='text-center table-col'
                                             sm={1} span={24}>
                                            <Checkbox indeterminate={indeterminate}
                                                      onChange={() => this.mainCheck()}
                                                      checked={checked}
                                            />
                                        </Col>
                                        <Col class='text-center table-col'
                                             sm={8} span={24}>
                                            STUDENT
                                        </Col>
                                        <Col class='text-center table-col'
                                             sm={8} span={24}>
                                            TYPE
                                        </Col>
                                        <Col class='text-center table-col'
                                             sm={7} span={24}>
                                            <Tag class='clickable tag-default'
                                                 onClick={() => this.printingSelected()}>
                                                DONWLOAD SELECTED
                                            </Tag>
                                        </Col>
                                    </Row>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                printings.map(
                                    (printing, index) =>
                                        <tr key={index}>
                                            <td>
                                                <Row class='table-row' type='flex'>
                                                    <Col class='text-center table-col' sm={1} span={24}>
                                                        <Checkbox ref={ref => {
                                                            if (ref !== null) this.checkBox.push(ref)
                                                        }} onChange={(ev) => this.check(ev.target.checked, index)}/>
                                                    </Col>
                                                    <Col class='text-center table-col' sm={8} span={24}>
                                                        {`${printing.owner.prefix} ${printing.owner.student_fname} ${printing.owner.student_lname}`}
                                                    </Col>
                                                    <Col class='text-center table-col' sm={8} span={24}>
                                                        {printing.printing_type.printing_type_name}
                                                    </Col>
                                                    <Col class='text-center table-col' sm={7} span={24}>
                                                        <Tag class='clickable tag-default'
                                                             onClick={() => this.printing(printing.printing_data)}>
                                                            DONWLOAD LUL
                                                        </Tag>
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