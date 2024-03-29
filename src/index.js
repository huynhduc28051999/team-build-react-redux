import React from 'react'
import ReactDOM from 'react-dom'
import App from '@pages'
import { Provider } from "react-redux"
import rootReducer from "./reducers"
import rootSaga from "./sagas"
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import { enableBatching, batchDispatchMiddleware } from 'redux-batched-actions'
import { SocketContext, app } from '@utils/socket'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(enableBatching(rootReducer), applyMiddleware(sagaMiddleware, batchDispatchMiddleware))
sagaMiddleware.run(rootSaga)
ReactDOM.render(
  <SocketContext.Provider value={app}>
    <Provider store={store}>
      <App />
    </Provider>
  </SocketContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
