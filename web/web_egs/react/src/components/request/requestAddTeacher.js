import React from 'react'
import {connect} from 'react-redux'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import {toastr} from 'react-redux-toastr'
import {setPost} from "../../actions/request/requestAdd";
import jquery from 'jquery'

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

@connect((store) => {
    return {
        teachers: store.requestAdd.teachers,
        positions: store.requestAdd.positions,
        post: store.requestAdd.post,
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
        const {dispatch, post} = this.props
        let newPost = Object.assign({}, post, {
            ...post,
            teachers: this.state.teachers
        })
        dispatch(setPost(newPost))
        jquery('.close-toastr').click()
        // toastr.removeByType('message')
    }


    render() {
        const {teachers, positions, post} = this.props
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
                                <div>รายการอาจารย์</div>
                                <Droppable droppableId="source">
                                    {(provided, snapshot) => (
                                        <div class="scroll" ref={provided.innerRef}
                                             style={getListStyle(snapshot.isDraggingOver)}>
                                            {teachers.filter((teacher) => {
                                                return this.state.teachers.filter((teacher_) => teacher_.teacher === teacher.id).length === 0
                                            }).map((teacher, idx) => (
                                                <Draggable key={idx} draggableId={teacher.id}>
                                                    {(provided, snapshot) => (
                                                        <div>
                                                            <div ref={provided.innerRef}
                                                                 style={getItemStyle(provided.draggableStyle, snapshot.isDragging)}
                                                                 {...provided.dragHandleProps}>
                                                                {`${teacher.prefix} ${teacher.person_fname} ${teacher.person_lname}`}
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
                            <div class="clearfix"/>
                        </div>
                        <button class=" btn btn-block btn-green" onClick={() => this.addTeacher()}>
                            I HATE MYSELF
                        </button>
                    </div>
                </DragDropContext>
        )
    }
}