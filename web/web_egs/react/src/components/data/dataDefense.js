import React from 'react'
import {connect} from 'react-redux'
import ReactTable from "react-table"
import {getAllLevel, getAllSemester} from "../../actions/calendar/calendar";
import {
    getAllDefense, getAllAction, getDefenseDetail, resetDataDefense,
    getAllDefenseStatus
} from "../../actions/data/dataDefense";
import {toastr} from 'react-redux-toastr'
import {Tooltip} from 'react-tippy'

@connect((store) => {
    return {
        container: store.main.container,
        defenses: store.dataDefense.defenses,
        actions: store.dataDefense.actions,
        semesters: store.calendar.semesters,
        levels: store.calendar.levels,
        defenseStatuses: store.dataDefense.defenseStatuses
    }
})
export default class DataDefense extends React.Component {

    constructor(props) {
        super(props)
    }

    componentWillUpdate(props) {
        // NOTE:  props is the updated this.props
    }

    componentWillUnmount() {
        const {dispatch} = this.props
        dispatch(resetDataDefense())
    }

    componentDidMount() {
        const {dispatch} = this.props
        // NOTE: fetch needed data
        dispatch(getAllDefense())
        dispatch(getAllDefenseStatus())
        dispatch(getAllAction())
        dispatch(getAllSemester())
        dispatch(getAllLevel())
    }

    render() {
        const {defenses, actions, semesters, levels, defenseStatuses, container} = this.props
        return (
            <div>
                {levels === null || semesters === null || actions === null || defenses === null || defenseStatuses === null ? null :
                    <ReactTable
                        data={defenses}
                        defaultPageSize={10}
                        style={{height: "500px"}}
                        filterable
                        defaultFilterMethod={(filter, row) =>
                            String(row[filter.id]).includes(filter.value)}
                        className="-highlight text-center"
                        SubComponent={row => {
                            return (
                                <ReactTable
                                    data={[row.original]}
                                    showPaginationBottom={false}
                                    defaultPageSize={1}
                                    className="margin-15"
                                    columns={[
                                        {
                                            Header: "DATE",
                                            accessor: '',
                                            Cell: row => (
                                                <div style={{
                                                    width: '100%', height: '100%', display: 'table'
                                                }}>
                                                    <div style={{
                                                        display: 'table-cell', verticalAlign: 'middle'
                                                    }}>
                                                        {`สอบวันที่ ${moment(new Date(row.value.defense_date)).format('LL')} ตั้งแต่ ${moment(new Date(`1995-04-16T${row.value.defense_time_start}Z`)).format('LT')} ถึง ${moment(new Date(`1995-04-16T${row.value.defense_time_end}Z`)).format('LT')} ที่ ${row.value.room.room_name}`}
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
                                                    columns={[
                                                        {
                                                            Header: "TEACHER",
                                                            accessor: "teacher.person_fname",
                                                        },
                                                        {
                                                            Header: "POSITION",
                                                            accessor: "position.position_name",
                                                        }
                                                    ]}
                                                />
                                            )
                                        }
                                    ]}
                                />
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
                                Header: "DEFENSE",
                                columns: [
                                    {
                                        Header: "DEFENSE_NAME",
                                        accessor: 'defense_type.action_id',
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
                                        Header: "STATUS",
                                        accessor: 'defense_status.status_id',
                                        Cell: row => (
                                            <div>
                                                <span class={
                                                    `label label-${defenseStatuses.filter(defenseStatus => defenseStatus.status_id === row.value)[0].status_label}`
                                                }>
                                                    {defenseStatuses.filter(defenseStatus => defenseStatus.status_id === row.value)[0].status_name}
                                                </span>
                                            </div>
                                        ),
                                        Filter: ({filter, onChange}) =>
                                            <select onChange={event => onChange(event.target.value)}
                                                    style={{width: "100%", maxHeight: "31px"}}>
                                                <option value="">Show All</option>
                                                {defenseStatuses.map(defenseStatus =>
                                                    <option key={defenseStatus.status_id}
                                                            value={defenseStatus.status_id}>
                                                        {defenseStatus.status_name}
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