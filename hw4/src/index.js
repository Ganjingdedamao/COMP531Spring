require('expose?$!expose?jQuery!jquery')
require("bootstrap-webpack")
require('./style.css')



import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

import App from './components/app'
import Reducer from './reducers'


const logger = createLogger()
const store = createStore(Reducer, applyMiddleware(logger))


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
