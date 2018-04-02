import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/main'
import {Provider} from "react-redux"
import store from './store'
import ReduxToastr from 'react-redux-toastr'

const app = document.getElementById('app')
ReactDOM.render(
    <Provider store={store}>
        <div>
            <Main/>
            <ReduxToastr
                timeOut={5000}
                position="top-right"
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                preventDuplicates
                progressBar/>
        </div>
    </Provider>
    , app
)