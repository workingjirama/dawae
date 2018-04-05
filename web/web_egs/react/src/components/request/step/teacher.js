import React from 'react'
import {connect} from 'react-redux'

@connect((store) => {
    return {
        lang: store.language.data,
    }
})
export default class Teacher extends React.Component {

    render() {
        const {lang} = this.props
        return (
            <div>Teacher</div>
        )
    }
}