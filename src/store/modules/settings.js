const MIN = 1
const MAX = 60

/**
|--------------------------------------------------
| Reducer
|--------------------------------------------------
*/
export const initialState = {
  /** length of work session (number of minutes) */
  sessionLength: 25,
  /** length of a break (number of minutes) */
  breakLength: 5
}

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SESSION_LENGTH: {
      const value = Math.min(Math.max(action.payload, MIN), MAX)
      return { ...state, sessionLength: value }
    }
    case actionTypes.SET_BREAK_LENGTH: {
      const value = Math.min(Math.max(action.payload, MIN), MAX)
      return { ...state, breakLength: value }
    }
    case actionTypes.RESTORE_DEFAULTS: {
      return initialState
    }
    default:
      return state
  }
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
