import './main.css'

import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { routerMiddleware, ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import createRootReduser from 'reducers'
import Layout from 'containers/layout'

const history = createBrowserHistory()
const middlewares = [thunk, routerMiddleware(history)]

// В createStore первым параметром передается главный reducer, остальными параметрами middlewars
// applyMiddleware — используется, что бы применить все middlewars, применяет по очереди из массива
const store = createStore(
  createRootReduser(history),
  composeWithDevTools(applyMiddleware(...middlewares))
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
