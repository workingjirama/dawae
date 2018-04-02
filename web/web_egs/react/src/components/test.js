import React from 'react'
import JSZip from 'jszip'
import Docxtemplater from 'docxtemplater'
import JSZipUtils from 'jszip-utils'
import FileSaver from 'file-saver'
import {URL} from './../config'

const checkmark = '\u2713'
const nothing = '\u0020\u0020\u0020'

export default class Test extends React.Component {
    constructor() {
        super()
        this.content
    }

    test() {
        function loadFile(url, callback) {
            JSZipUtils.getBinaryContent(url, callback);
        }

        loadFile(`${URL.BASE}/web_egs/docx/Doc1.docx`, (error, content) => {
            if (error) {
                throw error
            }
            let zip = new JSZip(content);
            let doc = new Docxtemplater().loadZip(zip)
            doc.setData({
                test: '\u2713\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020'
            })
            doc.render()
            let out = doc.getZip().generate({
                type: "blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            })
            FileSaver.saveAs(out, "output.docx")
        })
    }

    render() {
        return (
            <button class='btn btn-success' onClick={() => this.test()}>{`\u2752`}</button>
        )
    }
}
