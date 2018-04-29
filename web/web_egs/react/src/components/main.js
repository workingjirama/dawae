import React from 'react'
import Router from './router'
import {connect} from 'react-redux'
import {getCurrntUser, getConfig} from '../actions/main';
import {getLanguage} from '../actions/language';

@connect((store) => {
    return {
        currentUser: store.main.currentUser,
        header: store.main.header,
        config: store.main.config,
        language: store.language.data
    }
})

export default class Main extends React.Component {

    componentDidMount() {
        const {dispatch} = this.props
        // NOTE: fetch needed data
        dispatch(getCurrntUser())
        dispatch(getLanguage())
        dispatch(getConfig())
    }

    render() {
        const {currentUser, language, config} = this.props
        return currentUser === null || language === null || config === null ? null :
            <div class='padding-20'>
                <div class='panel panel-default'>
                    <div class='panel-heading panel-heading-transparent'>
                        <div class='header'>
                            <strong>{this.props.header}</strong>
                        </div>
                    </div>
                    <div class='panel-body'>
                        <Router/>
                    </div>
                </div>
            </div>

    }
}