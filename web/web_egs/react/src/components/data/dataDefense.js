import React from 'react'
import {connect} from 'react-redux'
import ReactTable from 'react-table'
import {getAllLevel, getAllSemester} from '../../actions/calendar/calendar'
import {
    getAllDefense, getAllAction, resetDataDefense,
    getAllDefenseStatus, getAllDocStatus, getAllPostDefDocStatus
} from '../../actions/data/dataDefense'
import {toastr} from 'react-redux-toastr'
import {Tooltip} from 'react-tippy'
import DataDefenseResult from './dataDefenseResult'
import moment from 'moment'
import {setHeader} from "../../actions/main"
import DataRequestUpload from "./dataRequestUpload";

@connect((store) => {
    return {
        container: store.main.container,
        defenses: store.dataDefense.defenses,
        actions: store.dataDefense.actions,
        semesters: store.calendar.semesters,
        levels: store.calendar.levels,
        docStatuses: store.dataDefense.docStatuses,
        defenseStatuses: store.dataDefense.defenseStatuses,
        postDefDocStatuses: store.dataDefense.postDefDocStatuses,
        lang: store.language.data,
        currentUser: store.main.currentUser
    }
})
export default class DataDefense extends React.Component {

    constructor(props) {
        super(props)
        const {currentUser, lang} = props
        moment.locale(lang.lang)
    }

    componentWillUpdate(props) {
        // NOTE:  props is the updated this.props
    }

    componentWillUnmount() {
        const {dispatch} = this.props
        dispatch(resetDataDefense())
    }

    componentDidMount() {
        const {dispatch, lang} = this.props
        // NOTE: fetch needed data
        dispatch(setHeader(lang.dataDefense.head))
        dispatch(getAllDefense())
        dispatch(getAllDefenseStatus())
        dispatch(getAllPostDefDocStatus())
        dispatch(getAllDocStatus())
        dispatch(getAllAction())
        dispatch(getAllSemester())
        dispatch(getAllLevel())
    }

    render() {
        const {defenses, actions, semesters, levels, defenseStatuses, docStatuses, container, lang, currentUser, postDefDocStatuses} = this.props
        return (
            <div>
                {levels === null || semesters === null || actions === null ||
                defenses === null || defenseStatuses === null || docStatuses === null || postDefDocStatuses === null ? null :
                    <ReactTable
                        noDataText={lang.nodata}
                        data={defenses}
                        defaultPageSize={defenses.length === 0 ? 5 : defenses.length}
                        showPaginationBottom={defenses.length > 10}
                        filterable
                        defaultFilterMethod={(filter, row) =>
                            String(row[filter.id]).includes(filter.value)}
                        className='text-center'
                        SubComponent={rowMain => {
                            return (
                                <div style={{backgroundColor: '#f7f7f7'}}>
                                    <ReactTable
                                        data={[rowMain.original]}
                                        showPaginationBottom={false}
                                        defaultPageSize={1}
                                        className='margin-15'
                                        style={{backgroundColor: 'white'}}
                                        columns={[
                                            {
                                                Header: lang.data.date,
                                                accessor: '',
                                                Cell: row => (
                                                    <div style={{
                                                        width: '100%', height: '100%', display: 'table'
                                                    }}>
                                                        <div style={{
                                                            display: 'table-cell', verticalAlign: 'middle'
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
                                                                accessor: 'teacher.person_fname',
                                                            },
                                                            {
                                                                Header: lang.data.position,
                                                                accessor: 'position.position_name',
                                                            }
                                                        ]}
                                                    />
                                                )
                                            }
                                        ]}
                                    />
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
                                        Cell: row => (
                                            levels.filter(level => level.level_id === row.value)[0].level_name
                                        ),
                                        Filter: ({filter, onChange}) => (
                                            <select onChange={event => onChange(event.target.value)}
                                                    style={{width: '100%', maxHeight: 31}}>
                                                <option value=''>{lang.showall}</option>
                                                {levels.map(level =>
                                                    <option key={level.level_id} value={level.level_id}>
                                                        {level.level_name}
                                                    </option>
                                                )}
                                            </select>
                                        )
                                    }
                                ]
                            },
                            {
                                Header: lang.data.defense,
                                columns: [
                                    {
                                        Header: lang.data.defenseName,
                                        accessor: 'defense_type_id',
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
                                        Header: lang.data.paperStatus,
                                        accessor: 'document_status',
                                        Cell: row =>
                                            <Tooltip
                                                useContext={true} trigger='click' interactive size='big'
                                                arrow={true} position='left' theme='light' html={
                                                <div>
                                                    {
                                                        row.original.defense_document.length === 0 ? lang.nodata : row.original.defense_document.map((defenseDocument, index) =>
                                                            <div key={index}>
                                                                <DataRequestUpload
                                                                    editor={row.value.editable}
                                                                    originalIndex={row.index}
                                                                    defenseDocument={defenseDocument}
                                                                    index={index}/>
                                                                {
                                                                    index === row.original.defense_document.length - 1 ? null :
                                                                        <hr style={{marginTop: 8, marginBottom: 8}}/>
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            }>
                                                <label
                                                    class={`clickable label label-${docStatuses.filter(docStatus => docStatus.status_id === row.value.document_status_id)[0].status_label}`}>
                                                    {docStatuses.filter(docStatus => docStatus.status_id === row.value.document_status_id)[0].status_name}
                                                </label>
                                            </Tooltip>,
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
                                    },
                                    {
                                        Header: lang.data.defStatus,
                                        accessor: 'defense_status',
                                        Cell: row => (
                                            <div>
                                                <Tooltip
                                                    useContext={true} unmountHTMLWhenHide={true}
                                                    trigger='click' interactive size='big' arrow={true}
                                                    position='left' theme='light'
                                                    html={
                                                        <DataDefenseResult
                                                            editor={row.value.editable && row.value.ready}
                                                            index={row.index}
                                                            defense={row.original}/>
                                                    }>
                                                    <label
                                                        class={`clickable label label-${defenseStatuses.filter(defenseStatus => defenseStatus.status_id === row.value.defense_status_id)[0].status_label}`}>
                                                        {defenseStatuses.filter(defenseStatus => defenseStatus.status_id === row.value.defense_status_id)[0].status_name}
                                                    </label>
                                                </Tooltip>
                                            </div>
                                        ),
                                        Filter: ({filter, onChange}) =>
                                            <select onChange={event => onChange(event.target.value)}
                                                    style={{width: '100%', maxHeight: 31}}>
                                                <option value=''>{lang.showall}</option>
                                                {defenseStatuses.map(defenseStatus =>
                                                    <option key={defenseStatus.status_id}
                                                            value={defenseStatus.status_id}>
                                                        {defenseStatus.status_name}
                                                    </option>
                                                )}
                                            </select>
                                    },
                                    {
                                        Header: lang.data.paperStatusAfter,
                                        accessor: 'post_document_status',
                                        Cell: row =>
                                            <Tooltip
                                                useContext={true} trigger='click' interactive size='big'
                                                arrow={true} position='left' theme='light' html={
                                                <div>
                                                    {
                                                        row.original.post_defense_document.length === 0 ? lang.nodata : row.original.post_defense_document.map((defenseDocument, index) =>
                                                            <div key={index}>
                                                                <DataRequestUpload
                                                                    editor={row.value.editable && row.value.ready}
                                                                    ready={row.value.ready}
                                                                    originalIndex={row.index}
                                                                    defenseDocument={defenseDocument}
                                                                    index={index}/>
                                                                {
                                                                    index === row.original.post_defense_document.length - 1 ? null :
                                                                        <hr style={{marginTop: 8, marginBottom: 8}}/>
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            }>
                                                <label
                                                    class={`clickable label label-${postDefDocStatuses.filter(postDefDocStatus => postDefDocStatus.status_id === row.value.post_document_status_id)[0].status_label}`}>
                                                    {postDefDocStatuses.filter(postDefDocStatus => postDefDocStatus.status_id === row.value.post_document_status_id)[0].status_name}
                                                </label>
                                            </Tooltip>,
                                        Filter: ({filter, onChange}) =>
                                            <select onChange={event => onChange(event.target.value)}
                                                    style={{width: '100%', maxHeight: 31}}>
                                                <option value=''>{lang.showall}</option>
                                                {postDefDocStatuses.map(postDefDocStatus =>
                                                    <option key={postDefDocStatus.status_id}
                                                            value={postDefDocStatus.status_id}>
                                                        {postDefDocStatus.status_name}
                                                    </option>
                                                )}
                                            </select>
                                    },
                                ]
                            }
                        ]}
                    />
                }
            </div>
        )
    }
}