import React from 'react'
import {updateUserRequest, upload} from '../../actions/data/dataRequest'
import {URL} from '../../config'
import {connect} from 'react-redux'

const MAXIMUM_SIZE = 6e+7

@connect((store) => {
    return {
        lang: store.language.data
    }
})
export default class DataRequestUpload extends React.Component {
    constructor() {
        super()
        this.state = {
            edit: false
        }
        this.input = null
    }

    toEdit() {
        this.setState({edit: true})
    }

    cancelEdit() {
        this.setState({edit: false})
    }

    upLoad(ev) {
        const {dispatch, requestDocument, userRequest, originalIndex, index} = this.props
        const file = ev.target.files[0]
        if (file.size > MAXIMUM_SIZE) {
            alert(`> ${MAXIMUM_SIZE / 1e+6} MB`)
        } else if (file.type !== 'application/pdf') {
            alert('not pdf')
        } else {
            dispatch(upload(file, requestDocument, userRequest, response => {
                this.cancelEdit()
                dispatch(updateUserRequest(originalIndex, response))
            }))
        }
    }

    render() {
        const {requestDocument, index, editor, lang, isStaff} = this.props
        const {edit} = this.state
        return (
            <div style={{display: 'flex'}}>
                <div style={{marginRight: 10}}>
                    {`${requestDocument.document.document_name} (pdf) `}
                </div>
                {editor ?
                    <div>
                        <div class={requestDocument.request_document_path === null || edit ? '' : 'hidden'}>
                            <input onChange={(ev) => this.upLoad(ev)} class='hidden' ref={ref => this.input = ref}
                                   type='file' accept='Application/pdf'/>
                            <button
                                onClick={() => this.input.click()}
                                style={{marginTop: -2, marginRight: 10}}
                                class='btn btn-xs btn-blue'>
                                {edit ? lang.data.reUpload : lang.data.upload}
                            </button>
                        </div>
                        <div class={requestDocument.request_document_path !== null && !edit ? '' : 'hidden'}>
                            <a href={`${URL.BASE}/${requestDocument.request_document_path}`}
                               target='_blank' class='btn btn-default btn-xs margin-right-10'>
                                <i class='fa fa-file-pdf-o'/>
                                {lang.data.open}
                            </a>
                            <button
                                onClick={() => this.toEdit()}
                                class='btn btn-default btn-xs'>
                                <i class='fa fa-edit'/>
                                {lang.data.edit}
                            </button>
                        </div>
                    </div> :
                    <div>{requestDocument.request_document_path === null ? `*${lang.data.noUpload}*` :
                        <a href={`${URL.BASE}/${requestDocument.request_document_path}`}
                           target='_blank' class='btn btn-default btn-xs margin-right-10'>
                            <i class='fa fa-file-pdf-o'/>
                            {lang.data.open}
                        </a>
                    }</div>
                }
            </div>
        )
    }
}