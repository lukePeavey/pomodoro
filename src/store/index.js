import { combineReducers } from 'redux'
import configureStore from './configure'
import * as timerStore from './modules/timer'
import * as settingsStore from './modules/settings'

// appReducer combines the reducers from each redux module
export const appReducer = combineReducers({
  timer: timerStore.default,
  settings: settingsStore.default
})

// rootReducer handles top-level redux actions like resetting state
export const rootReducer = function(state, action) {
  if (action.type === 'RESET_APP_STATE') {
    state = undefined
  }
  return appReducer(state, action)
}

// The store exports all action creators and selectors from the root
// module. Assumes that action/selector names are globally unique
export const actions = {
  ...timerStore.actions,
  ...settingsStore.actions,
  resetAppState: () => ({ type: 'RESET_APP_STATE' })
}

export const selectors = {
  ...timerStore.selectors,
  ...settingsStore.selectors
}

// Export the redux store
export default configureStore(rootReducer)
