import {URL, TYPE} from "../../config"
import 'whatwg-fetch'

const _URL = URL.PRINTING.REVIEW
const _TYPE = TYPE.PRINTING.REVIEW

export function getReview(post, callback) {
    return function (dispatch) {
        fetch(_URL.GET_ALL_REVIEW, {
            credentials: 'same-origin'
        }).then(function (response) {
            return response.json()
        }).then(function (json) {
            dispatch({
                type: _TYPE.SET_ALL_REVIEW,
                payload: json
            })
        })
    }
}

export function insertReview(post, callback) {
    return function (dispatch) {
        fetch(_URL.INSERT_REVIEW, {
            credentials: 'same-origin'
        }).then(function (response) {
            return response.json()
        }).then(function (printing) {
            callback()
            const data = new FormData()
            const post_ = {post, owner_id: printing.owner_id}
            data.append('json', JSON.stringify(post_))
            fetch(_URL.INSERT_REVIEW_COMPONENT, {
                method: 'post',
                body: data,
            }).then(function (response) {
                return response.json()
            }).then(function (json) {
            })
        })
    }
}