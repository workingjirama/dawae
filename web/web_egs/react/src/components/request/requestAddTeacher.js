import React from 'react'
import {connect} from 'react-redux'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import {toastr} from 'react-redux-toastr'
import {setPost} from "../../actions/request/requestAdd";
import jquery from 'jquery'
import {Tooltip} from 'react-tippy'

const grid = 12

const getItemStyle = (draggableStyle, isDragging) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? 'white' : 'white',
    ...draggableStyle
})

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightgreen' : '#efefef',
    padding: grid,
    paddingBottom: 1,
    minHeight: 50
})

const MAX_LOADED = 2

@connect((store) => {
    return {
        // calendarItem: store.requestAdd.calendarItem,
        teachers: store.requestAdd.teachers,
        positions: store.requestAdd.positions,
        post: store.requestAdd.post,
        lang: store.language.data
    }
})
export default class RequestAddTeacher extends React.Component {

    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.state = {
            teachers: props.post.teachers
        }
    }

    onDragEnd(result) {
        if (!result.destination || result.destination === null) {
            return
        }
        const {post, dispatch, positions} = this.props
        if (result.source.droppableId === 'source' && result.destination.droppableId.startsWith('target')) {
            const positonId = parseInt(result.destination.droppableId.slice(6))
            const position = positions.filter(position => position.position_id === positonId)[0]
            if (this.state.teachers.filter(teacher => teacher.position === position.position_id).length < position.position_maximum) {
                const teachers = this.state.teachers.concat({
                    teacher: result.draggableId,
                    position: position.position_id
                })
                this.setState({teachers})
            } else {
                toastr.error('MAXED', 'PLS TRY AGAIN', {preventDuplicates: false})
            }
        } else if (result.destination.droppableId === 'source' && result.source.droppableId.startsWith('target')) {
            const teachers = this.state.teachers.filter((teacher) => teacher.teacher !== result.draggableId)
            this.setState({teachers})
        }
    }

    addTeacher() {
        const {dispatch, post, positions} = this.props
        let newPost = Object.assign({}, post, {
            ...post,
            teachers: this.state.teachers
        })
        let minimum = false
        positions.map(position => {
            let size = this.state.teachers.filter(teacher => teacher.position === position.position_id).length
            console.log(position.position_name, position.position_minimum, size)
            if (position.position_minimum > size) {
                toastr.error(`${position.position_name} minimum is ${position.position_minimum}`, 'PLS TRY AGAIN', {preventDuplicates: false})
                minimum = true
            }
        })
        if (!minimum) {
            dispatch(setPost(newPost))
            jquery('.close-toastr').click()
        }
    }

    render() {
        const {calendarItem, teachers, positions, post, lang} = this.props
        return (
            positions === null || teachers === null ? null :
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div>
                        <div class="margin-bottom-10">
                            <div class="col-md-6">
                                {positions.map((position, idx) =>
                                    <div key={idx}>
                                        <div>{position.position_name}</div>
                                        <Droppable key={idx} droppableId={`target${position.position_id}`}>
                                            {(provided, snapshot) => (
                                                <div ref={provided.innerRef}
                                                     style={getListStyle(snapshot.isDraggingOver)}>
                                                    {this.state.teachers.filter((val) => val.position === position.position_id).map((teacher, idx) => (
                                                        <Draggable key={idx} draggableId={teacher.teacher}>
                                                            {(provided, snapshot) => (
                                                                <div>
                                                                    <div ref={provided.innerRef}
                                                                         style={getItemStyle(provided.draggableStyle, snapshot.isDragging)}
                                                                         {...provided.dragHandleProps}>
                                                                        {`${teachers.filter(teacher_ => teacher_.id === teacher.teacher)[0].prefix}
                                                                        ${teachers.filter(teacher_ => teacher_.id === teacher.teacher)[0].person_fname}
                                                                        ${teachers.filter(teacher_ => teacher_.id === teacher.teacher)[0].person_lname}`}
                                                                    </div>
                                                                    {provided.placeholder}
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </div>
                                )}
                            </div>
                            <div class="col-md-6">
                                <div>{lang.requestAdd.teacherList}</div>
                                <Droppable droppableId="source">
                                    {(provided, snapshot) => (
                                        <div class="scroll" ref={provided.innerRef}
                                             style={getListStyle(snapshot.isDraggingOver)}>
                                            {teachers.filter((teacher) => {
                                                return this.state.teachers.filter((teacher_) => teacher_.teacher === teacher.id).length === 0
                                            }).map((teacher, idx) =>
                                                teacher.loaded >= MAX_LOADED && !calendarItem.action.is_defense ?
                                                    <div style={{
                                                        padding: 24,
                                                        margin: '0px 0px 12px',
                                                        backgroundColor: 'white'
                                                    }}>
                                                        <div>
                                                            {`${teacher.prefix} ${teacher.person_fname} ${teacher.person_lname}`}
                                                        </div>
                                                        <div style={{
                                                            float: 'right',
                                                            color: 'red'
                                                        }}>
                                                            {`${teacher.loaded}(+${teacher.pre_loaded})/${MAX_LOADED}`}
                                                        </div>
                                                    </div> :
                                                    <Draggable key={idx} draggableId={teacher.id}>
                                                        {(provided, snapshot) => (
                                                            <div>
                                                                <div ref={provided.innerRef}
                                                                     style={getItemStyle(provided.draggableStyle, snapshot.isDragging)}
                                                                     {...provided.dragHandleProps}>
                                                                    <div>
                                                                        {`${teacher.prefix} ${teacher.person_fname} ${teacher.person_lname}`}
                                                                    </div>
                                                                    {
                                                                        calendarItem.action.is_defense ? null :
                                                                            <div style={{float: 'right'}}>
                                                                                <label style={{color: 'green'}}>
                                                                                    {`${teacher.loaded}`}
                                                                                </label>
                                                                                <label style={{color: '#FFBA00'}}>
                                                                                    {`(+${teacher.pre_loaded})`}
                                                                                </label>
                                                                                <label style={{color: 'green'}}>
                                                                                    {`/${MAX_LOADED}`}
                                                                                </label>
                                                                            </div>
                                                                    }
                                                                </div>
                                                                {provided.placeholder}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                            )}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                            <div class="clearfix"/>
                        </div>
                        <button class=" btn btn-block btn-green" onClick={() => this.addTeacher()}>
                            {calendarItem.action.is_defense ? lang.requestAdd.addCommittee : lang.requestAdd.addAdvisor}
                        </button>
                    </div>
                </DragDropContext>
        )
    }
}