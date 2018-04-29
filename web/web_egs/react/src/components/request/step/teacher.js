import React from 'react'
import {connect} from 'react-redux'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Select from 'antd/lib/select'
import Loading from "../../loading"
import Button from "../step/button"
import {setPost} from "../../../actions/request/requestAdd"

const {Option, OptGroup} = Select

@connect((store) => {
    return {
        lang: store.language.data,
        positions: store.requestAdd.positions,
        teachers: store.requestAdd.teachers,
        post: store.requestAdd.post
    }
}, null, null, {withRef: true})
export default class Teacher extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            teachers: null,
            value: null
        }
    }

    componentDidMount() {
        this.init()
    }

    init() {
        const {post, positions} = this.props
        const {teachers} = this.state
        let value = {}
        positions.map(position => {
            let _teachers = post.teachers.filter(teacher => teacher.position === position.position_id)
            let values = []
            _teachers.map(teacher => {
                values.push(teacher.teacher)
            })
            value[position.position_id] = values
        })
        this.setState({value})
        this.setState({teachers: post.teachers})
    }

    onChange(values, position) {
        if (values.length > position.position_maximum) {
            alert('max')
            return
        }
        const {teachers, value} = this.state
        let teachers_ = teachers.filter(teacher => teacher.position !== position.position_id)
        values.map(teacher => {
            teachers_.push({
                teacher,
                position: position.position_id
            })
        })
        let _value = Object.assign({}, value)
        _value[position.position_id] = values
        this.setState({value: _value})
        this.setState({teachers: teachers_})
    }

    validate() {
        const {value} = this.state
        const {positions} = this.props
        let position = true
        positions.map(_position => {
            if (value[_position.position_id].length < _position.position_minimum) {
                alert(`min`)
                position = false
                return
            }
        })
        if (!position) return false
        this.setPost()
        return true
    }

    setPost() {
        const {teachers} = this.state
        const {dispatch, post} = this.props
        let _post = Object.assign({}, post, {
            ...post,
            teachers
        })
        dispatch(setPost(_post))
    }

    render() {
        const {lang, post, positions, teachers} = this.props
        const {value} = this.state
        return (
            teachers === null || this.state.teachers === null || value === null ? <Loading/> :
                <Row>
                    <Row class='step'>
                        {
                            positions.map(
                                (position, index) =>
                                    <Row key={index} style={{marginBottom: positions.length - 1 !== index ? 10 : 0}}>
                                        <Row>
                                            <Col span={24}>
                                                {position.position_name}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={24}>
                                                <Select
                                                    mode="multiple"
                                                    style={{minWidth: 250, maxWidth: 250}}
                                                    placeholder="SELECT TEACHER PLS"
                                                    value={value[position.position_id]}
                                                    onChange={(value) => this.onChange(value, position)}
                                                    filterOption={(input, option) => option.props.children.toLowerCase().includes(input.toLowerCase())}>
                                                    <OptGroup label="Manager">
                                                        {
                                                            teachers.map(
                                                                (teacher, index) => {
                                                                    const remain = this.state.teachers.findIndex(_teacher => teacher.id === _teacher.teacher) === -1
                                                                    return (
                                                                        <Option
                                                                            disabled={!remain}
                                                                            key={index}
                                                                            value={teacher.id}>
                                                                            {`${teacher.prefix} ${teacher.person_fname} ${teacher.person_lname}`}
                                                                        </Option>
                                                                    )
                                                                }
                                                            )
                                                        }
                                                    </OptGroup>
                                                </Select>
                                            </Col>
                                        </Row>
                                    </Row>
                            )
                        }
                    </Row>
                    {
                        this.props.button === false ? null :
                            <Button key='btn' validate={() => this.validate()}/>
                    }
                </Row>
        )
    }
}