import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import registerServiceWorker from './registerServiceWorker'
import App from './components/App'
import IconButton from '@material-ui/core/IconButton'
import GitHubIcon from './icons/Github'
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
  <React.Fragment>
    <Provider store={store} key="app">
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>
    <IconButton
      component="a"
      href="https://github.com/lukePeavey/pomodoro"
      className="githubIcon"
    >
      <GitHubIcon />
    </IconButton>
  </React.Fragment>,

  document.getElementById('root')
)

// Register service worker
registerServiceWorker()
