import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import registerServiceWorker from './registerServiceWorker'
import App from './components/App'
import store from './store'
// Import the styles for the app
import './styles/index.css'

// Create a Material-UI theme so the components match the appearance of
// the app.
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#60dafb' }
  }
})

ReactDOM.render(
  <Provider store={store} key="app">
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)

// Register service worker
registerServiceWorker()
