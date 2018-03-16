import React from 'react'
import {connect} from 'react-redux'
import {
    getAllAction,
    getAllDocStatus,
    getAllPetStatus,
    getAllUserRequest,
    resetDataRequest
} from "../../actions/data/dataRequest";
import ReactTable from "react-table"
import {getAllLevel, getAllSemester} from "../../actions/calendar/calendar";
import {Tooltip} from 'react-tippy'
import {Uploader, UploadField} from '@navjobs/upload'

const MAXIMUM_SIZE = 6e+7

@connect((store) => {
    return {
        userRequests: store.dataRequest.userRequests,
        actions: store.dataRequest.actions,
        semesters: store.calendar.semesters,
        levels: store.calendar.levels,
        petStatuses: store.dataRequest.petStatuses,
        docStatuses: store.dataRequest.docStatuses
    }
})
export default class DataRequest extends React.Component {

    componentWillUpdate(props) {
        // NOTE:  props is the updated this.props
    }

    componentWillUnmount() {
        const {dispatch} = this.props
        dispatch(resetDataRequest())
    }

    componentDidMount() {
        const {dispatch, userRequests} = this.props
        // NOTE: fetch needed data
        dispatch(getAllUserRequest())
        dispatch(getAllPetStatus())
        dispatch(getAllDocStatus())
        dispatch(getAllAction())
        dispatch(getAllSemester())
        dispatch(getAllLevel())
    }

    render() {
        const {userRequests, actions, semesters, levels, petStatuses, docStatuses} = this.props
        return (
            <div>
                {levels === null || semesters === null || actions === null || userRequests === null ||
                petStatuses === null || docStatuses === null ? null :
                    <ReactTable
                        data={userRequests}
                        defaultPageSize={10}
                        style={{height: "500px"}}
                        filterable
                        defaultFilterMethod={(filter, row) =>
                            String(row[filter.id]).includes(filter.value)}
                        className="-highlight text-center"
                        SubComponent={row => {
                            return (
                                <div>
                                    {row.original.advisors.length === 0 ? null :
                                        <ReactTable
                                            data={row.original.advisors}
                                            showPaginationBottom={false}
                                            defaultPageSize={row.original.advisors.length}
                                            className="margin-15"
                                            columns={[
                                                {
                                                    Header: "TEACHER",
                                                    accessor: "teacher.person_fname",
                                                },
                                                {
                                                    Header: "POSITION",
                                                    accessor: "position.position_name",
                                                },
                                            ]}
                                        />
                                    }
                                    {row.original.defenses.length === 0 ? null :
                                        <div>
                                            <ReactTable
                                                data={row.original.defenses}
                                                showPaginationBottom={false}
                                                defaultPageSize={row.original.defenses.length}
                                                className="margin-15"
                                                columns={[
                                                    {
                                                        Header: "TYPE",
                                                        accessor: "defense_type.action_name",
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
                                                        Header: "DATE",
                                                        accessor: "",
                                                        Cell: row => (
                                                            <div style={{
                                                                width: '100%', height: '100%', display: 'table'
                                                            }}>
                                                                <div style={{
                                                                    display: 'table-cell',
                                                                    verticalAlign: 'middle'
                                                                }}>
                                                                    {`สอบวันที่ ${moment(new Date(row.value.defense_date)).format('LL')} ตั้งแต่ ${moment(new Date(`1995-04-16T${row.value.defense_time_start}Z`)).format('LT')} ถึง ${moment(new Date(`1995-04-16T${row.value.defense_time_end}Z`)).format('LT')} ที่ ${row.value.room.room_name}`}
                                                                </div>
                                                            </div>
                                                        )
                                                    },
                                                    {
                                                        Header: "STATUS",
                                                        accessor: 'defense_status',
                                                        Cell: row => (
                                                            <div style={{
                                                                width: '100%', height: '100%', display: 'table'
                                                            }}>
                                                                <div style={{
                                                                    display: 'table-cell',
                                                                    verticalAlign: 'middle'
                                                                }}>
                                                                    <span
                                                                        class={`label label-${row.value.status_label}`}>
                                                                        {row.value.status_name}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )
                                                    },
                                                    {
                                                        Header: "COOMMITTEEEESSS",
                                                        accessor: "committees",
                                                        Cell: row => (
                                                            <ReactTable
                                                                data={row.value}
                                                                showPaginationBottom={false}
                                                                defaultPageSize={row.value.length}
                                                                className="-striped"
                                                                columns={[
                                                                    {
                                                                        Header: "TEACHER",
                                                                        accessor: "teacher.person_fname",
                                                                    },
                                                                    {
                                                                        Header: "POSITION",
                                                                        accessor: "position.position_name",
                                                                    },
                                                                ]}
                                                            />
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
                                Header: "STUDENT XD",
                                columns: [
                                    {
                                        Header: "STUDENT_ID",
                                        accessor: "student.id",
                                    },
                                    {
                                        Header: "STUDENT_FNAME",
                                        accessor: "student.student_fname"
                                    },
                                    {
                                        Header: "STUDENT_LNAME",
                                        accessor: "student.student_lname"
                                    },
                                    {
                                        Header: "STUDENT_LEVEL",
                                        accessor: "calendar_item.level_id",
                                        Cell: row => {
                                            return levels.filter(level => level.level_id === row.value)[0].level_name
                                        },
                                        Filter: ({filter, onChange}) =>
                                            <select onChange={event => onChange(event.target.value)}
                                                    style={{width: "100%", maxHeight: "31px"}}>
                                                <option value="">Show All</option>
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
                                Header: "REQUEST",
                                columns: [
                                    {
                                        Header: "ACION_NAME",
                                        accessor: 'calendar_item.action_id',
                                        Cell: row => {
                                            return actions.filter(action => action.action_id === row.value)[0].action_name
                                        },
                                        Filter: ({filter, onChange}) =>
                                            <select onChange={event => onChange(event.target.value)}
                                                    style={{width: "100%", maxHeight: "31px"}}>
                                                <option value="">Show All</option>
                                                {actions.map(action =>
                                                    <option key={action.action_id} value={action.action_id}>
                                                        {action.action_name}
                                                    </option>
                                                )}
                                            </select>
                                    },
                                    {
                                        Header: "PET_STATUS",
                                        accessor: 'pet_status.status_id',
                                        Cell: row => (
                                            <div>
                                                <Tooltip
                                                    trigger="click" interactive size="big" arrow={true}
                                                    position="top" theme="light" html={
                                                    <div>
                                                        {row.original.petitions.length === 0 ? 'NOPE' : row.original.petitions.map((request_document, index) =>
                                                            <div key={index}>
                                                                {request_document.document.document_name}
                                                            </div>
                                                        )}
                                                    </div>
                                                }>
                                                    <span
                                                        class={`clickable label label-${petStatuses.filter(petStatus => petStatus.status_id === row.value)[0].status_label}`}>
                                                        {petStatuses.filter(petStatus => petStatus.status_id === row.value)[0].status_name}
                                                    </span>
                                                </Tooltip>
                                            </div>
                                        ),
                                        Filter: ({filter, onChange}) =>
                                            <select onChange={event => onChange(event.target.value)}
                                                    style={{width: "100%", maxHeight: "31px"}}>
                                                <option value="">Show All</option>
                                                {petStatuses.map(petStatus =>
                                                    <option key={petStatus.status_id}
                                                            value={petStatus.status_id}>
                                                        {petStatus.status_name}
                                                    </option>
                                                )}
                                            </select>
                                    },
                                    {
                                        Header: "DOC_STATUS",
                                        accessor: 'doc_status.status_id',
                                        Cell: row => (
                                            <Tooltip
                                                trigger="click" interactive size="big" arrow={true}
                                                position="top" theme="light" html={
                                                <div>
                                                    {row.original.papers.length === 0 ? 'NOPE' : row.original.papers.map((requestDocument, index) => [
                                                        <div style={{display: 'flex'}} key={index}>
                                                            <div style={{marginRight: 10}}>
                                                                {`${requestDocument.document.document_name} (pdf) `}
                                                            </div>
                                                            {requestDocument.request_document_path === null ?
                                                                <Uploader
                                                                    request={{
                                                                        fileName: 'paper',
                                                                        url: '/dawae/web/egs/tempo/test',
                                                                        method: 'POST',
                                                                        withCredentials: false,
                                                                    }}
                                                                    onComplete={({response, status}) => {

                                                                    }}
                                                                    uploadOnSelection={true}>
                                                                    {({onFiles, startUpload, progress, complete, canceled, failed, files}) => {
                                                                        let upup = null
                                                                        let file = null
                                                                        return (
                                                                            <div style={{display: 'flex'}}>
                                                                                <UploadField
                                                                                    containerProps={{
                                                                                        style: {
                                                                                            marginRight: 10,
                                                                                            position: 'relative'
                                                                                        }
                                                                                    }}
                                                                                    uploadProps={{
                                                                                        accept: '.pdf',
                                                                                    }}
                                                                                    onFiles={files => {
                                                                                        console.log(files[0])
                                                                                        if (files[0].size > MAXIMUM_SIZE) {
                                                                                            alert('> 60 MB')
                                                                                        } else if (files[0].type !== 'application/pdf') {
                                                                                            alert('not pdf')
                                                                                        } else {
                                                                                            onFiles(files)
                                                                                            startUpload()
                                                                                        }
                                                                                    }}>
                                                                                    <button
                                                                                        style={{marginTop: -2}}
                                                                                        class="btn btn-xs btn-blue">
                                                                                        upload
                                                                                    </button>
                                                                                </UploadField>
                                                                                <div>
                                                                                    {progress ? progress === 100 ? null : progress : null}
                                                                                    {complete ? 'yes' : null}
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                    }
                                                                </Uploader> :
                                                                <div>UPLOADED</div>
                                                            }
                                                        </div>,
                                                        index === row.original.papers.length - 1 ? null :
                                                            <hr key={`hr${index}`}
                                                                style={{marginTop: 8, marginBottom: 8}}/>
                                                    ])}
                                                </div>
                                            }>
                                                    <span
                                                        class={`clickable label label-${docStatuses.filter(docStatus => docStatus.status_id === row.value)[0].status_label}`}>
                                                    {docStatuses.filter(docStatus => docStatus.status_id === row.value)[0].status_name}
                                                </span>
                                            </Tooltip>
                                        ),
                                        Filter: ({filter, onChange}) =>
                                            <select onChange={event => onChange(event.target.value)}
                                                    style={{width: "100%", maxHeight: "31px"}}>
                                                <option value="">Show All</option>
                                                {docStatuses.map(docStatus =>
                                                    <option key={docStatus.status_id}
                                                            value={docStatus.status_id}>
                                                        {docStatus.status_name}
                                                    </option>
                                                )}
                                            </select>
                                    },
                                    {
                                        Header: "SEMESTER",
                                        accessor: 'calendar_item.semester_id',
                                        Cell: row => {
                                            return semesters.filter(semester => semester.semester_id === row.value)[0].semester_name
                                        },
                                        Filter: ({filter, onChange}) =>
                                            <select onChange={event => onChange(event.target.value)}
                                                    style={{width: "100%", maxHeight: "31px"}}>
                                                <option value="">Show All</option>
                                                {semesters.map(semester =>
                                                    <option key={semester.semester_id} value={semester.semester_id}>
                                                        {semester.semester_name}
                                                    </option>
                                                )}
                                            </select>
                                    }
                                ]
                            },
                        ]}
                    />
                }
            </div>
        )
    }
}