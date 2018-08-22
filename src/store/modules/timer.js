/**
|--------------------------------------------------
| Reducer
|--------------------------------------------------
*/
export const initialState = {
  /** A high res timestamp recorded when the timer starts running */
  startTime: null,
  /** The number of milliseconds that the timer has been running  */
  elapsedTime: 0,
  /** A flag that indicates if timer currently running. */
  isRunning: false,
  /** The type of timer 'SESSION' | 'BREAK'  */
  type: 'SESSION'
}

export default function timerReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.INITIALIZE_TIMER: {
      return { ...initialState, ...action.payload }
    }
    case actionTypes.START_TIMER: {
      // When re-starting a timer that was paused paused, the startTime is set to timestamp - elapsedTime
      const timestamp = state.startTime
        ? action.payload - state.elapsedTime
        : action.payload
      return { ...state, isRunning: true, startTime: timestamp }
    }
    case actionTypes.STOP_TIMER: {
      return { ...state, isRunning: false }
    }
    case actionTypes.UPDATE_ELAPSED_TIME: {
      return { ...state, elapsedTime: action.payload }
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
  /** Gets  the elapsed time (in milliseconds) */
  getElapsedTime: (state) => state.timer.elapsedTime,
  /** Gets the startTime, returns null if timer hasn't started */
  getStartTime: (state) => state.timer.startTime,
  /** Get the type of timer 'SESSION' | 'BREAK' */
  getTimerType: (state) => state.timer.type,
  /** Returns true if timer is currently paused */
  isRunning: (state) => state.timer.isRunning,
  /**
   * @computed
   * gets the duration of the timer in milliseconds. This is derived from
   * settings (sessionLength | breakLength)
   */
  getDuration: (state) => {
    return state.settings[`${state.timer.type.toLowerCase()}Length`] * 60 * 1000
  },
  /**
   * @computed
   * Returns the percentage of elapsed time
   */
  getPercentComplete: (state) => {
    return (state.timer.elapsedTime / selectors.getDuration(state)) * 100
  },
  /**
   * @computed
   * Returns a time string that represents the remaining time in HH:MM:SS
   */
  getRemainingTimeString: (state) => {
    // Gets the remaining time (in milliseconds) and converts to HH:MM:SS
    const remainingTime = selectors.getDuration(state) - state.timer.elapsedTime
    const hours = parseInt((remainingTime / (1000 * 60 * 60)) % 24)
    const minutes = parseInt((remainingTime / (1000 * 60)) % 60)
    const seconds = parseInt((remainingTime / 1000) % 60)
    return [hours, minutes, seconds].map((n) => (n < 10 ? `0${n}` : n)).join(':') // prettier-ignore
  },
  /**
   * @computed
   * returns true if timer is done
   */
  isTimerDone: (state) => {
    return selectors.getElapsedTime(state) >= selectors.getDuration(state)
  }
}

/**
|--------------------------------------------------
| Actions
|--------------------------------------------------
*/
export const actionTypes = {
  INITIALIZE_TIMER: '[timer] INITIALIZE_TIMER',
  START_TIMER: '[timer] START_TIMER',
  STOP_TIMER: '[timer] STOP_TIMER',
  UPDATE_ELAPSED_TIME: '[timer] UPDATE_ELAPSED_TIME'
}

export const actions = {
  /** Initializes a new timer */
  initializeTimer: (state) => ({
    type: actionTypes.INITIALIZE_TIMER,
    payload: state
  }),

  /** Starts running the current timer. (sets isRunning to true) */
  startTimer: (timestamp) => ({
    type: actionTypes.START_TIMER,
    payload: timestamp
  }),

  /** Pauses the timer (sets isRunning to f) */
  stopTimer: () => ({
    type: actionTypes.STOP_TIMER
  }),

  /** Updates the elapsed time of the timer.  */
  updateElapsedTime: (milliseconds) => ({
    type: actionTypes.UPDATE_ELAPSED_TIME,
    payload: milliseconds
  })
}
