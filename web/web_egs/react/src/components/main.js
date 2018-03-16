import React from 'react'
import Router from './router'
import LoadingBar from 'react-redux-loading-bar'
import {connect} from 'react-redux'
import {setContainer} from "../actions/main";

@connect((store) => {
    return {
        loading: store.loadingBar.default,
        header: store.main.header
    }
})

export default class Main extends React.Component {

    constructor() {
        super()
        this.container = null
    }

    componentDidMount() {
        const {dispatch} = this.props
        // NOTE: fetch needed data
        dispatch(setContainer(this.container))
    }

    render() {
        return [
            <LoadingBar key="bar"/>,
            <div ref={ref => this.container = ref} key="app" id="content" class="padding-20"
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