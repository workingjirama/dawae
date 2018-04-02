import React from 'react'
import {connect} from 'react-redux'
import {Tooltip} from 'react-tippy'
import {
    updateDefense, updateDefenseComment, updateDefenseCredit,
    updateDefenseScore, updateResult
} from '../../actions/data/dataDefense';

@connect((store) => {
    return {
        defenses: store.dataDefense.defenses,
        lang: store.language.data,
        container: store.main.container
    }
})
export default class DataDefenseResult extends React.Component {

    constructor(props) {
        super(props)
        const {defense} = props
        this.state = {
            post: {
                score: defense.defense_score,
                credit: defense.defense_credit,
                comment: defense.defense_comment
            },
            open: {
                score: false,
                credit: false,
                comment: false
            }
        }
    }

    componentDidMount() {
        const {dispatch} = this.props
        // NOTE: fetch needed data
    }

    scoreChange(ev) {
        this.setState({
            post: {
                ...this.state.post,
                score: parseInt(ev.target.value)
            }
        })
    }

    creditChange(ev) {
        this.setState({
            post: {
                ...this.state.post,
                credit: parseInt(ev.target.value)
            }
        })
    }

    commentChange(ev) {
        this.setState({
            post: {
                ...this.state.post,
                comment: ev.target.value
            }
        })
    }

    update() {
        const {dispatch, defense, defenses, index, container} = this.props
        const {post} = this.state
        dispatch(updateResult(defense, post, response => {
            dispatch(updateDefense(index, response))
            container.click()
        }))
    }

    openScore() {
        this.setState({
            open: {
                score: !this.state.open.score,
                credit: false,
                comment: false
            }
        })
    }

    openCredit() {
        this.setState({
            open: {
                score: false,
                credit: !this.state.open.credit,
                comment: false
            }
        })
    }

    openComment() {
        this.setState({
            open: {
                score: false,
                credit: false,
                comment: !this.state.open.comment
            }
        })
    }

    closeScore() {
        this.setState({
            ...open,
            open: {score: false}
        })
    }

    closeCredit() {
        this.setState({
            ...open,
            open: {credit: false}
        })
    }

    closeComment() {
        this.setState({
            ...open,
            open: {comment: false}
        })
    }

    render() {
        const {defense, editor, lang} = this.props
        const {open, post} = this.state
        return (
            <div class='table-responsive'>
                <table
                    class='table table-bordered table-vertical-middle nomargin'>
                    <tbody>
                    <tr>
                        <td>{lang.data.score}</td>
                        <td>
                            <label>
                                {post.score === null ? lang.nodata : post.score}
                            </label>
                            {!editor ? null :
                                <Tooltip
                                    open={open.score}
                                    trigger='click' interactive
                                    position='left' theme='light' html={
                                    <div style={{display: 'flex'}}>
                                        <input class='form-control'
                                               defaultValue={post.score === null ? 0 : post.score}
                                               min={0}
                                               max={100}
                                               onChange={(ev) => this.scoreChange(ev)}
                                               style={{
                                                   width: 60,
                                                   padding: 6,
                                                   marginRight: 5
                                               }}
                                               type='number'/>
                                        <div onClick={() => this.closeScore()} class='custom-close clickable'>X</div>
                                    </div>
                                }>
                                    <button
                                        class='btn btn-default btn-xs'
                                        onClick={() => this.openScore()}>
                                        <i class='fa fa-edit'/>
                                        {lang.data.edit}
                                    </button>
                                </Tooltip>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>{lang.data.credit}</td>
                        <td>
                            <label>
                                {post.credit === null ? lang.nodata : post.credit}
                            </label>
                            {!editor ? null :
                                <Tooltip
                                    open={open.credit}
                                    trigger='click' interactive
                                    position='left' theme='light' html={
                                    <div style={{display: 'flex'}}>
                                        <input class='form-control'
                                               defaultValue={post.credit === null ? 0 : post.credit}
                                               min={0}
                                               max={12}
                                               onChange={(ev) => this.creditChange(ev)}
                                               style={{
                                                   width: 60,
                                                   padding: 6,
                                                   margin: 5
                                               }}
                                               type='number'/>
                                        <div onClick={() => this.closeCredit()} class='custom-close clickable'>X</div>
                                    </div>
                                }>
                                    <div
                                        class='btn btn-default btn-xs'
                                        onClick={() => this.openCredit()}>
                                        <i class='fa fa-edit'/>
                                        {lang.data.edit}
                                    </div>
                                </Tooltip>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>{lang.data.comment}</td>
                        <td>
                            <label>
                                {post.comment === null ? lang.nodata :
                                    <div>
                                        {post.comment.replace(/<br\/>/g, ' ').length > 15 ? post.comment.replace(/<br\/>/g, ' ').substring(0, 15) + '...' : post.comment.replace(/<br\/>/g, '\n')}
                                    </div>
                                }
                            </label>
                            {!editor ? null :
                                <Tooltip
                                    open={open.comment}
                                    trigger='click' interactive
                                    position='left' theme='light' html={
                                    <div style={{display: 'flex'}}>
                                    <textarea
                                        onChange={(ev) => {
                                            this.commentChange(ev)
                                        }}
                                        defaultValue={post.comment === null ? null : post.comment.replace('<br/>', '\n')}
                                        style={{
                                            padding: 6,
                                            margin: 5
                                        }}
                                        class='form-control' rows={4} cols={50}/>
                                        <div onClick={() => this.closeComment()} class='custom-close clickable'>X</div>
                                    </div>
                                }>
                                    <button
                                        class='btn btn-default btn-xs'
                                        onClick={() => this.openComment()}>
                                        <i class='fa fa-edit'/>
                                        {lang.data.edit}
                                    </button>
                                </Tooltip>
                            }
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button class='btn btn-success btn-block' onClick={() => this.update()}>xQc</button>
            </div>
        )
    }
}