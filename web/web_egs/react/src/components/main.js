import React from 'react'
import Router from './router'
import LoadingBar from 'react-redux-loading-bar'
import {connect} from 'react-redux'
import {getCurrntUser, setContainer} from "../actions/main";
import {getLanguage} from "../actions/language";

@connect((store) => {
    return {
        currentUser: store.main.currentUser,
        loading: store.loadingBar.default,
        header: store.main.header,
        language: store.language.data
    }
})

export default class Main extends React.Component {

    constructor(props) {
        super(props)
        this.container
    }

    componentWillUpdate(props) {
        // NOTE:  props is the updated this.props
        const {dispatch, currentUser, language} = props
        if (currentUser !== null && language !== null)
            dispatch(setContainer(this.container))
    }


    componentDidMount() {
        const {dispatch} = this.props
        // NOTE: fetch needed data
        dispatch(getCurrntUser())
        dispatch(getLanguage())
    }

    render() {
        const {currentUser, language, dispatch} = this.props
        return [
            <LoadingBar key="bar"/>,
            currentUser === null || language === null ? null :
                <div ref={ref => {
                    this.container = ref
                }} key="app" id="content" class="padding-20"
                     style={{pointerEvents: this.props.loading ? "none" : "initial"}}>
                    <div class="panel panel-default">
                        <div class="panel-heading panel-heading-transparent">
                            <div class="header">
                                <strong>{this.props.header}</strong>
                            </div>
                        </div>
                        <div class="panel-body">
                            <Router/>
                        </div>
                    </div>
                </div>
        ]
    }
}