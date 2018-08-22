/**
|--------------------------------------------------
| Reducer
|--------------------------------------------------
*/
export const initialState = {
  /** length of work session (number of minutes) */
  sessionLength: 0.5,
  /** length of a break (number of minutes) */
  breakLength: 5
}

export default function settingsReducer(state = initialState, action) {
  return state
}

/**
|--------------------------------------------------
| Selectors
|--------------------------------------------------
*/
export const selectors = {
  getSessionLength: (state) => state.settings.sessionLength,
  getBreakLength: (state) => state.settings.breakLength
}

/**
|--------------------------------------------------
| Actions
|--------------------------------------------------
*/

export const actionTypes = {
  SET_SESSION_LENGTH: '[settings] SET_SESSION_LENGTH',
  SET_BREAK_LENGTH: '[settings] SET_BREAK_LENGTH',
  RESTORE_DEFAULTS: '[settings] RESTORE_DEFAULTS'
}

export const actions = {
  setSessionLength: (minutes) => ({
    type: actionTypes.SET_SESSION_LENGTH,
    payload: minutes
  }),

  setBreakLength: (minutes) => ({
    type: actionTypes.SET_BREAK_LENGTH,
    payload: minutes
  }),

  restoreDefaults: () => ({
    type: actionTypes.RESTORE_DEFAULTS
  })
}