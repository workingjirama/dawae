import React from 'react'
import {connect} from 'react-redux'
import {Tooltip} from 'react-tippy'
import {showLoading, hideLoading} from 'react-redux-loading-bar'
import {toastr} from 'react-redux-toastr'
import {Link} from 'react-router-dom'
import {setHeader} from '../../actions/main'
import {URL} from '../../config'
import {getReview} from "../../actions/printing/review";
import ReactTable from 'react-table'
import JSZip from 'jszip'
import Docxtemplater from 'docxtemplater'
import JSZipUtils from 'jszip-utils'
import FileSaver from 'file-saver'
import jquery from 'jquery'

@connect((store) => {
    return {
        reviews: store.review.reviews,
        lang: store.language.data
    }
})
export default class ReviewList extends React.Component {
    constructor() {
        super()
        this.printList
    }

    componentWillUpdate(props) {
        // NOTE:  props is the updated this.props
    }

    componentWillUnmount() {
        const {dispatch} = this.props
        // NOTE: check if formAdd still displayed
    }

    componentDidMount() {
        const {dispatch} = this.props
        // NOTE: fetch needed data
        dispatch(getReview())
    }

    multiplePrinting() {
        const {reviews} = this.props
        console.log('trigged')
        let printList = {
            components: []
        }
        jquery('input[type=checkbox]').map((index, input) => {
            if (input.name === '') {
                if (input.checked) {
                    let data = {}
                    const components = reviews[input.value].printing_component
                    components.map(component => {
                        data[component.printing_component_id] = component.printing_value
                    })
                    printList.components.push(data)
                }
            }
        })

        function loadFile(url, callback) {
            JSZipUtils.getBinaryContent(url, callback);
        }

        loadFile(`${URL.BASE}/web_egs/docx/Doc2.docx`, (error, content) => {
            if (error) {
                throw error
            }
            let zip = new JSZip(content);
            let doc = new Docxtemplater().loadZip(zip)
            doc.setData(printList)
            doc.render()
            let out = doc.getZip().generate({
                type: "blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            })
            FileSaver.saveAs(out, "output.docx")
        })


    }

    printing(components) {
        let data = {}
        components.map(component => {
            data[component.printing_component_id] = component.printing_value
        })

        function loadFile(url, callback) {
            JSZipUtils.getBinaryContent(url, callback);
        }

        loadFile(`${URL.BASE}/web_egs/docx/Doc1.docx`, (error, content) => {
            if (error) {
                throw error
            }
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

    addChecked() {
        jquery('input[type=checkbox]').map((index, input) => {
            if (input.name === '') {
                if (!input.checked)
                    allChecked = false
            }
        })
    }

    check(ev) {
        let allChecked = true
        jquery('input[type=checkbox]').map((index, input) => {
            if (input.name === '') {
                if (!input.checked)
                    allChecked = false
            }
        })
        jquery('input[name=all]').prop('checked', allChecked)
    }

    checkAll(ev) {
        jquery('input[type=checkbox]').map((index, input) => {
            if (input.name === '') {
                console.log(jquery(input).prop('checked', ev.target.checked))
            }
        })
    }

    render() {
        const {reviews, lang} = this.props
        return (
            reviews === null ? null :
                <ReactTable
                    noDataText={lang.nodata}
                    data={reviews}
                    defaultPageSize={reviews.length === 0 ? 5 : reviews.length}
                    showPaginationBottom={reviews.length > 10}
                    filterable sortable={false}
                    defaultFilterMethod={(filter, row) => {
                        jquery('input[type=checkbox]').map((index, input) => {
                            jquery(input).prop('checked', false)
                        })
                        return String(row[filter.id]).includes(filter.value)
                    }}
                    className='text-center'
                    columns={[
                        {
                            Header: '',
                            accessor: '',
                            width: 31,
                            resizable: false,
                            Cell: row =>
                                <div style={{marginTop: -16}}>
                                    <label class="checkbox">
                                        <input type="checkbox" onChange={(ev) => this.check(ev)} value={row.index}/>
                                        <i/>
                                    </label>
                                </div>
                            ,
                            Filter: () =>
                                <div style={{marginTop: -10}}>
                                    <label class="checkbox">
                                        <input type="checkbox" name='all' onChange={(ev) => this.checkAll(ev)}/>
                                        <i/>
                                    </label>
                                </div>
                        },
                        {
                            Header: lang.data.studentId,
                            accessor: 'owner.user_id',
                        },
                        {
                            Header: lang.data.studentFname,
                            accessor: 'owner.student_fname'
                        },
                        {
                            Header: lang.data.studentLname,
                            accessor: 'owner.student_lname'
                        },
                        {
                            Header: 'LETS GO DUDE',
                            accessor: 'printing_id',
                            Cell: row =>
                                <a href={URL.PRINTING.REVIEW_ADD.MAIN.LINK} class="btn btn-xs btn-default">GO</a>
                        },
                        {
                            Header: 'DOWNLOAD',
                            accessor: 'printing_component',
                            Cell: row =>
                                <button onClick={() => this.printing(row.value)} class="btn btn-xs btn-default">
                                    DOWNLOAD
                                </button>,
                            Filter: () =>
                                <button onClick={() => this.multiplePrinting()} class="btn btn-xs btn-default">
                                    DOWNLOAD CHECKED
                                </button>
                        }
                    ]}
                />
        )
    }
}