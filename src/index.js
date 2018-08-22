import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import App from './components/App'
import store from './store'
import './styles/index.css'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// Register service worker
registerServiceWorker()
