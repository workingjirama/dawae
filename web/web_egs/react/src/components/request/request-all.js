import React from 'react'
import {connect} from 'react-redux'
import {
    getAllAction,
    getAllFeeStatus,
    getAllPetStatus,
    getAllUserRequest,
    resetDataRequest, toggleFee, togglePetition, updateUserRequest, getAllPostReqDocStatus
} from '../../actions/data/dataRequest'
import ReactTable from 'react-table'
import {getAllLevel, getAllSemester} from '../../actions/calendar/calendar'
import {Tooltip} from 'react-tippy'
import {Uploader, UploadField} from '@navjobs/upload'
import {URL} from './../../config'
import {setHeader} from '../../actions/main'
import moment from 'moment'
import {getAllDocStatus} from "../../actions/data/dataDefense"
import RequestOpen from "./request-open";
import {getDefenseStatus} from "../../actions/request/requestData";

@connect((store) => {
    return {
        userRequests: store.dataRequest.userRequests,
        actions: store.dataRequest.actions,
        semesters: store.calendar.semesters,
        levels: store.calendar.levels,
        // petStatuses: store.dataRequest.petStatuses,
        // docStatuses: store.dataDefense.docStatuses,
        // feeStatuses: store.dataRequest.feeStatuses,
        // postReqDocStatuses: store.dataRequest.postReqDocStatuses,
        // currentUser: store.main.currentUser,
        lang: store.language.data,
        status: store.requestData.status
    }
})
export default class RequestAll extends React.Component {

    constructor(props) {
        super(props)
        const {lang} = props
        moment.locale(lang.lang)
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
        dispatch(getAllAction())
        dispatch(getAllSemester())
        dispatch(getAllLevel())
        dispatch(getDefenseStatus())
    }

    render() {
        const {userRequests, actions, semesters, levels, lang, status} = this.props
        return (
            levels === null || semesters === null || actions === null ||
            userRequests === null || status === null
                // || petStatuses === null || docStatuses === null || feeStatuses === null || postReqDocStatuses === null
                ? null :
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
                                {
                                    row.original.defenses.length === 0 ? null :
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
                                                    },
                                                    {
                                                        Header: lang.data.paperStatus,
                                                        accessor: 'document_status_id',
                                                        Cell: row =>
                                                            <div style={{
                                                                width: '100%', height: '100%', display: 'table'
                                                            }}>
                                                                <div style={{
                                                                    display: 'table-cell',
                                                                    verticalAlign: 'middle'
                                                                }}>
                                                                    <label
                                                                        class={`label label-${docStatuses.filter(docStatus => docStatus.status_id === row.value)[0].status_label}`}>
                                                                        {docStatuses.filter(docStatus => docStatus.status_id === row.value)[0].status_name}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                    }
                                                ]}
                                            />
                                        </div>
                                }
                            </div>
                        )
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
                                    Cell: row =>
                                        levels.filter(level => level.level_id === row.value)[0].level_name,
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
                                    Cell: row =>
                                        actions.filter(action => action.action_id === row.value)[0].action_name,
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
                                    Cell: row =>
                                        semesters.filter(semester => semester.semester_id === row.value)[0].semester_name,
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
                                    Header: 'OMEGALUL',
                                    accessor: 'calendar_item.semester_id',
                                    filterable: false,
                                    Cell: row => <RequestOpen index={row.index} userRequest={row.original}/>
                                }
                            ]
                        }
                    ]}
                />
        )
    }
}