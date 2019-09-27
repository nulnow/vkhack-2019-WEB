import React from 'react'
import ReactDOM from 'react-dom'

import App from './containers/App'
import connection from './connection'
import store from './store'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

const reactRootElement = document.querySelector('#root')

if (reactRootElement) {
    ReactDOM.render(<BrowserRouter>
        <Provider store={ store }>
            <App/>
        </Provider>
    </BrowserRouter>, reactRootElement)
}