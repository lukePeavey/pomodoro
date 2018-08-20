import { combineReducers } from 'redux'
import configureStore from './configure'
import * as timerStore from './modules/timer'
import * as settingsStore from './modules/settings'

const rootReducer = combineReducers({
  timer: timerStore.default,
  settings: settingsStore.default
})

// For convenience, the store exports all action creators and selectors
// This assumes that action/selector names are globally unique
export const actions = { ...timerStore.actions, ...settingsStore.actions }
export const selectors = { ...timerStore.selectors, ...settingsStore.selectors }

// Export the redux store
export default configureStore(rootReducer)
