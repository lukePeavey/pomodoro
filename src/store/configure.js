import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'

// ============================
// Redux Devtools configuration

// When the timer is running, UPDATE_ELAPSED_TIME is dispatched on each
// requestAnimationFrame callback, roughly 60 times per second. To avoid
// flooding the log monitor, this action is blacklisted.
const devTools = devToolsEnhancer({
  name: 'Pomodoro Clock',
  actionsBlacklist: ['UPDATE_ELAPSED_TIME'],
  maxAge: 10000,
  latency: 1000
})

export default function configureStore(rootReducer, initialState = {}) {
  return createStore(rootReducer, initialState, devTools)
}
