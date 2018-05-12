import React from 'react'
import {connect} from 'react-redux'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Tag from 'antd/lib/tag'
import {URL} from "../../config";
import Loading from "../loading";
import {activeEvaluation, getEvaluation} from "../../actions/evaluation/evaluation-list"

@connect((store) => {
    return {
        lang: store.language.data,
        evaluations: store.evaluationList.evaluations
    }
})
export default class EvaluationList extends React.Component {
    componentWillUnmount() {
        const {dispatch} = this.props
        /* TODO : RESET */
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(getEvaluation())
    }

    active(eval_id) {
        const {dispatch} = this.props
        dispatch(activeEvaluation(eval_id))
    }

    render() {
        const {evaluations, lang} = this.props
        return (
            evaluations === null ? <Loading/> :
                <Row type='flex' justify='center'>
                    <Col sm={22} span={24}>
                        <Tag class='tag-default clickable'
                             onClick={() => window.location = `${URL.EGS_BASE}/#/evaluation-add`}>
                            ADD_LUL
                        </Tag>
                    </Col>
                    <Col sm={22} span={24}>
                        <table class='table'>
                            <tbody>
                            {
                                evaluations.map(
                                    (evaluation, index) =>
                                        <tr key={index}>
                                            <td>
                                                <Row class='table-row' type='flex'>
                                                    <Col class='text-center table-col' sm={8} span={24}>
                                                        {evaluation.evaluation_name}
                                                    </Col>
                                                    <Col class='text-center table-col' sm={8} span={24}>
                                                        {
                                                            evaluation.evaluation_active ?
                                                                <Tag class='tag-success'>
                                                                    using
                                                                </Tag> :
                                                                <div>
                                                                    <Tag class='tag-error'>
                                                                        not use
                                                                    </Tag>
                                                                    <Tag class='clickable tag-default'
                                                                         onClick={() => this.active(evaluation.evaluation_id)}>
                                                                        use dis
                                                                    </Tag>
                                                                </div>
                                                        }
                                                    </Col>
                                                    <Col class='text-center table-col' sm={8} span={24}>
                                                        <Tag class='tag-default clickable'>
                                                            <a target='_blank'
                                                               href={`${URL.EGS_BASE}/evaluation/find?eval_id=${evaluation.evaluation_id}`}>
                                                                DETAIL LUL
                                                            </a>
                                                        </Tag>
                                                    </Col>
                                                </Row>
                                            </td>
                                        </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </Col>
                </Row>
        )
    }
}