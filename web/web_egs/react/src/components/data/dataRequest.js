import React from 'react'
import {connect} from 'react-redux'
import {
    getAllAction,
    getAllDocStatus, getAllFeeStatus,
    getAllPetStatus,
    getAllUserRequest,
    resetDataRequest, toggleFee, togglePetition, updateUserRequest
} from '../../actions/data/dataRequest'
import ReactTable from 'react-table'
import {getAllLevel, getAllSemester} from '../../actions/calendar/calendar'
import {Tooltip} from 'react-tippy'
import {Uploader, UploadField} from '@navjobs/upload'
import {URL} from './../../config'
import DataRequestUpload from './dataRequestUpload'
import {setHeader} from '../../actions/main'
import moment from 'moment'

const student_type = 0
const teacher_type = 1
const staff_type = 2

@connect((store) => {
    return {
        userRequests: store.dataRequest.userRequests,
        actions: store.dataRequest.actions,
        semesters: store.calendar.semesters,
        levels: store.calendar.levels,
        petStatuses: store.dataRequest.petStatuses,
        docStatuses: store.dataRequest.docStatuses,
        feeStatuses: store.dataRequest.feeStatuses,
        currentUser: store.main.currentUser,
        lang: store.language.data
    }
})
export default class DataRequest extends React.Component {

    constructor(props) {
        super(props)
        const {lang, currentUser} = props
        moment.locale(lang.lang)
        this.isStaff = currentUser.user_type_id === staff_type
        this.isSudent = currentUser.user_type_id === student_type
        this.isTeacher = currentUser.user_type_id === teacher_type
    }

    componentWillUpdate(props) {
        // NOTE:  props is the updated this.props
    }

    componentWillUnmount() {
        const {dispatch} = this.props
        // dispatch(resetDataRequest())
    }

    componentDidMount() {
        const {dispatch, userRequests, lang} = this.props
        // NOTE: fetch needed data
        dispatch(setHeader(lang.dataRequest.head))
        dispatch(getAllUserRequest())
        dispatch(getAllPetStatus())
        dispatch(getAllDocStatus())
        dispatch(getAllFeeStatus())
        dispatch(getAllAction())
        dispatch(getAllSemester())
        dispatch(getAllLevel())
    }

    togglePettion(ev, row, requestDocument) {
        const {dispatch} = this.props
        const userRequest = row.original
        dispatch(togglePetition(ev.target.checked, userRequest, requestDocument, response => {
            dispatch(updateUserRequest(row.index, response))
        }))
    }

    toggleFee(ev, row) {
        const {dispatch} = this.props
        // console.log(ev.target.checked, row.original, row.index)
        dispatch(toggleFee(ev.target.checked, row.original, response => {
            // console.log(response)
            // return
            dispatch(updateUserRequest(row.index, response))
        }))
    }

    render() {
        const {currentUser, userRequests, actions, semesters, levels, petStatuses, docStatuses, feeStatuses, dispatch, lang} = this.props
        return (
            levels === null || semesters === null || actions === null || userRequests === null ||
            petStatuses === null || docStatuses === null || feeStatuses === null ? null :
                <ReactTable
                    noDataText={lang.nodata}
                    data={userRequests}
                    defaultPageSize={userRequests.length === 0 ? 5 : userRequests.length}
                    showPaginationBottom={userRequests.length > 10}
                    filterable
                    defaultFilterMethod={(filter, row) =>
                        String(row[filter.id]).includes(filter.value)}
                    className='text-center'
                    SubComponent={row => {
                        return (
                            <div style={{backgroundColor: '#f7f7f7'}}>
                                {row.original.advisors.length === 0 ? null :
                                    <ReactTable
                                        style={{backgroundColor: 'white'}}
                                        data={row.original.advisors}
                                        showPaginationBottom={false}
                                        defaultPageSize={row.original.advisors.length}
                                        className='margin-15'
                                        columns={[
                                            {
                                                Header: lang.data.advisor,
                                                accessor: 'teacher',
                                                Cell: row => (
                                                    `${row.value.prefix} ${row.value.person_fname} \xa0${row.value.person_lname}`
                                                )
                                            },
                                            {
                                                Header: lang.data.position,
                                                accessor: 'position.position_name',
                                            }
                                        ]}
                                    />
                                }
                                {row.original.defenses.length === 0 ? null :
                                    <div>
                                        <ReactTable
                                            data={row.original.defenses}
                                            showPaginationBottom={false}
                                            defaultPageSize={row.original.defenses.length}
                                            className='margin-15'
                                            style={{backgroundColor: 'white'}}
                                            columns={[
                                                {
                                                    Header: lang.data.defenseName,
                                                    accessor: 'defense_type.action_name',
                                                    Cell: row => (
                                                        <div style={{
                                                            width: '100%', height: '100%', display: 'table'
                                                        }}>
                                                            <div style={{
                                                                display: 'table-cell',
                                                                verticalAlign: 'middle'
                                                            }}>
                                                                {row.value}
                                                            </div>
                                                        </div>
                                                    )
                                                },
                                                {
                                                    Header: lang.data.date,
                                                    accessor: '',
                                                    Cell: row => (
                                                        <div style={{
                                                            width: '100%', height: '100%', display: 'table'
                                                        }}>
                                                            <div style={{
                                                                display: 'table-cell',
                                                                verticalAlign: 'middle'
                                                            }}>
                                                                <div>
                                                                    {moment(new Date(row.value.defense_date)).format('LL')}
                                                                </div>
                                                                <div>
                                                                    {`${lang.data.from} ${moment(new Date(`1995-04-16T${row.value.defense_time_start}`)).format('LT')} ${lang.data.to} ${moment(new Date(`1995-04-16T${row.value.defense_time_end}`)).format('LT')}`}
                                                                </div>
                                                                <div>
                                                                    {`${lang.data.at} ${row.value.room.room_name}`}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                },
                                                {
                                                    Header: lang.data.committee,
                                                    accessor: 'committees',
                                                    Cell: row => (
                                                        <ReactTable
                                                            data={row.value}
                                                            showPaginationBottom={false}
                                                            defaultPageSize={row.value.length}
                                                            columns={[
                                                                {
                                                                    Header: lang.data.teacher,
                                                                    accessor: 'teacher',
                                                                    Cell: row => (
                                                                        `${row.value.prefix}${row.value.person_fname} ${row.value.person_lname}`
                                                                    )
                                                                },
                                                                {
                                                                    Header: lang.data.position,
                                                                    accessor: 'position.position_name',
                                                                },
                                                            ]}
                                                        />
                                                    )
                                                },
                                                {
                                                    Header: lang.data.defStatus,
                                                    accessor: 'defense_status',
                                                    Cell: row => (
                                                        <div style={{
                                                            width: '100%', height: '100%', display: 'table'
                                                        }}>
                                                            <div style={{
                                                                display: 'table-cell',
                                                                verticalAlign: 'middle'
                                                            }}>
                                                                <label
                                                                    class={`label label-${row.value.status_label}`}>
                                                                    {row.value.status_name}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            ]}
                                        />
                                    </div>
                                }
                            </div>
                        );
                    }}
                    columns={[
                        {
                            Header: lang.data.student,
                            columns: [
                                {
                                    Header: lang.data.studentId,
                                    accessor: 'student.user_id',
                                },
                                {
                                    Header: lang.data.studentFname,
                                    accessor: 'student.student_fname'
                                },
                                {
                                    Header: lang.data.studentLname,
                                    accessor: 'student.student_lname'
                                },
                                {
                                    Header: lang.data.level,
                                    accessor: 'calendar_item.level_id',
                                    Cell: row => {
                                        return levels.filter(level => level.level_id === row.value)[0].level_name
                                    },
                                    Filter: ({filter, onChange}) =>
                                        <select onChange={event => onChange(event.target.value)}
                                                style={{width: '100%', maxHeight: 31}}>
                                            <option value=''>{lang.showall}</option>
                                            {levels.map(level =>
                                                <option key={level.level_id} value={level.level_id}>
                                                    {level.level_name}
                                                </option>
                                            )}
                                        </select>
                                },
                            ],
                        },
                        {
                            Header: lang.data.request,
                            columns: [
                                {
                                    Header: lang.data.requestName,
                                    accessor: 'calendar_item.action_id',
                                    Cell: row => {
                                        return actions.filter(action => action.action_id === row.value)[0].action_name
                                    },
                                    Filter: ({filter, onChange}) =>
                                        <select onChange={event => onChange(event.target.value)}
                                                style={{width: '100%', maxHeight: 31}}>
                                            <option value=''>{lang.showall}</option>
                                            {actions.map(action =>
                                                <option key={action.action_id} value={action.action_id}>
                                                    {action.action_name}
                                                </option>
                                            )}
                                        </select>
                                },
                                {
                                    Header: lang.data.semester,
                                    accessor: 'calendar_item.semester_id',
                                    Cell: row => {
                                        return semesters.filter(semester => semester.semester_id === row.value)[0].semester_name
                                    },
                                    Filter: ({filter, onChange}) =>
                                        <select onChange={event => onChange(event.target.value)}
                                                style={{width: '100%', maxHeight: 31}}>
                                            <option value=''>{lang.showall}</option>
                                            {semesters.map(semester =>
                                                <option key={semester.semester_id} value={semester.semester_id}>
                                                    {semester.semester_name}
                                                </option>
                                            )}
                                        </select>
                                },
                                {
                                    Header: 'FEE_STATUS',
                                    accessor: 'fee_status_id',
                                    Cell: row => (
                                        <div>
                                            <Tooltip
                                                trigger='click' interactive size='big' arrow={true}
                                                position='left' theme='light' html={
                                                row.original.request_fee === 0 ? lang.nodata :
                                                    <div style={{display: 'flex'}}>
                                                        <div style={{marginRight: 10}}>
                                                            {`ค่าสอบ ${row.original.request_fee} บาท`}
                                                        </div>
                                                        {
                                                            !this.isStaff ? null :
                                                                <label
                                                                    style={{
                                                                        marginRight: 0,
                                                                        paddingLeft: 19,
                                                                        marginTop: -5
                                                                    }}
                                                                    class='checkbox'>
                                                                    <input type='checkbox'
                                                                           onChange={ev => this.toggleFee(ev, row)}
                                                                           defaultChecked={row.original.request_fee_paid}/>
                                                                    <i/>
                                                                </label>
                                                        }
                                                    </div>
                                            }>
                                                <label
                                                    class={`clickable label label-${feeStatuses[feeStatuses.findIndex(feeStatus => feeStatus.status_id === row.value)].status_label}`}>
                                                    {feeStatuses[feeStatuses.findIndex(feeStatus => feeStatus.status_id === row.value)].status_name}
                                                </label>
                                            </Tooltip>
                                        </div>
                                    ),
                                    Filter: ({filter, onChange}) =>
                                        <select onChange={event => onChange(event.target.value)}
                                                style={{width: '100%', maxHeight: 31}}>
                                            <option value=''>{lang.showall}</option>
                                            {feeStatuses.map(feeStatus =>
                                                <option key={feeStatus.status_id}
                                                        value={feeStatus.status_id}>
                                                    {feeStatus.status_name}
                                                </option>
                                            )}
                                        </select>
                                },
                                {
                                    /* TODO : COMFIRM BOX */
                                    Header: lang.data.petStatus,
                                    accessor: 'petition_status_id',
                                    Cell: row => (
                                        <div>
                                            <Tooltip
                                                trigger='click' interactive size='big' arrow={true}
                                                position='left' theme='light' html={
                                                <div>
                                                    {row.original.petitions.length === 0 ? lang.nodata : row.original.petitions.map((requestDocument, index) =>
                                                        <div key={index}>
                                                            <div style={{display: 'flex'}}>
                                                                <div style={{marginRight: 10}}>
                                                                    {requestDocument.document.document_name}
                                                                </div>
                                                                {this.isStaff ?
                                                                    <label
                                                                        style={{
                                                                            marginRight: 0,
                                                                            paddingLeft: 19,
                                                                            marginTop: -5
                                                                        }}
                                                                        class='checkbox'>
                                                                        <input type='checkbox'
                                                                               onChange={ev => this.togglePettion(ev, row, requestDocument)}
                                                                               defaultChecked={requestDocument.request_document_id !== null}/>
                                                                        <i/>
                                                                    </label> :
                                                                    <div>
                                                                        {
                                                                            requestDocument.request_document_id !== null ?
                                                                                <i style={{
                                                                                    padding: 5,
                                                                                    backgroundColor: '#5cb85c',
                                                                                    color: 'white'
                                                                                }}
                                                                                   class='fa fa-check'/>
                                                                                : <i style={{
                                                                                    padding: 5,
                                                                                    backgroundColor: '#d9534f',
                                                                                    color: 'white'
                                                                                }}
                                                                                     class='fa fa-close'/>
                                                                        }
                                                                    </div>
                                                                }
                                                            </div>
                                                            {
                                                                index === row.original.petitions.length - 1 ? null :
                                                                    <hr key={`hr${index}`}
                                                                        style={{marginTop: 8, marginBottom: 8}}/>
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                            }>
                                                <label
                                                    class={`clickable label label-${petStatuses.filter(petStatus => petStatus.status_id === row.value)[0].status_label}`}>
                                                    {petStatuses.filter(petStatus => petStatus.status_id === row.value)[0].status_name}
                                                </label>
                                            </Tooltip>
                                        </div>
                                    ),
                                    Filter: ({filter, onChange}) =>
                                        <select onChange={event => onChange(event.target.value)}
                                                style={{width: '100%', maxHeight: 31}}>
                                            <option value=''>{lang.showall}</option>
                                            {petStatuses.map(petStatus =>
                                                <option key={petStatus.status_id}
                                                        value={petStatus.status_id}>
                                                    {petStatus.status_name}
                                                </option>
                                            )}
                                        </select>
                                },
                                {
                                    Header: lang.data.paperStatus,
                                    accessor: 'paper_status_id',
                                    Cell: row => (
                                        <Tooltip
                                            useContext={true} trigger='click' interactive size='big'
                                            arrow={true} position='left' theme='light' html={
                                            <div>
                                                {
                                                    row.original.papers.length === 0 ? lang.nodata : row.original.papers.map((requestDocument, index) =>
                                                        <div key={index}>
                                                            <DataRequestUpload
                                                                editor={row.original.student.id === currentUser.id || this.isStaff}
                                                                userRequest={row.original}
                                                                originalIndex={row.index}
                                                                requestDocument={requestDocument}
                                                                index={index}/>
                                                            {
                                                                index === row.original.papers.length - 1 ? null :
                                                                    <hr style={{marginTop: 8, marginBottom: 8}}/>
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        }>
                                            <label
                                                class={`clickable label label-${docStatuses.filter(docStatus => docStatus.status_id === row.value)[0].status_label}`}>
                                                {docStatuses.filter(docStatus => docStatus.status_id === row.value)[0].status_name}
                                            </label>
                                        </Tooltip>
                                    ),
                                    Filter: ({filter, onChange}) =>
                                        <select onChange={event => onChange(event.target.value)}
                                                style={{width: '100%', maxHeight: 31}}>
                                            <option value=''>{lang.showall}</option>
                                            {docStatuses.map(docStatus =>
                                                <option key={docStatus.status_id}
                                                        value={docStatus.status_id}>
                                                    {docStatus.status_name}
                                                </option>
                                            )}
                                        </select>
                                }
                            ]
                        }
                    ]}
                />

        )
    }
}