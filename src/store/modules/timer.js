/**
|--------------------------------------------------
| Reducer
|--------------------------------------------------
*/
export const initialState = {
  /** The timestamp recorded when the timer starts running */
  startTime: null,
  /** The number of milliseconds that the timer has been running  */
  elapsedTime: 0,
  /** 'STOPPED' | 'RUNNING' | 'PAUSED' */
  timerState: 'STOPPED',
  /** The type of timer 'SESSION' | 'BREAK'  */
  type: 'SESSION'
}

export default function timerReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.INITIALIZE_TIMER: {
      return { ...initialState, ...action.payload }
    }
    case actionTypes.START_TIMER: {
      // Set `startTime` to the current timestamp minus `elapsedTime`
      const startTime = action.payload - state.elapsedTime
      return { ...state, timerState: 'RUNNING', startTime }
    }
    case actionTypes.PAUSE_TIMER: {
      return { ...state, timerState: 'PAUSED' }
    }
    case actionTypes.UPDATE_ELAPSED_TIME: {
      return { ...state, elapsedTime: action.payload }
    }
    default: {
      return state
    }
  }
}

/**
|--------------------------------------------------
| Selectors
|--------------------------------------------------
*/
export const selectors = {
  /** Get the type of timer 'SESSION' | 'BREAK' */
  getTimerType: (state) => state.timer.type,
  /** Return the current timerState 'STOPPED' 'RUNNING' | 'PAUSED' */
  getTimerState: (state) => state.timer.timerState,
  /** Get the timestamp when timer was started */
  getStartTime: (state) => state.timer.startTime,
  /** Gets  the elapsed time (in milliseconds) */
  getElapsedTime: (state) => state.timer.elapsedTime,
  /**
   * @computed
   * gets the duration of the timer in milliseconds.
   */
  getDuration: (state) => {
    return state.settings[`${state.timer.type.toLowerCase()}Length`] * 60 * 1000
  },
  /**
   * @computed
   * Returns the percentage of elapsed time
   */
  getPercentComplete: (state) => {
    const p = (state.timer.elapsedTime / selectors.getDuration(state)) * 100
    return Math.max(0, Math.min(p, 100))
  },
  /**
   * @computed
   * Returns remaining time as the total number of seconds.
   */
  getRemainingTimeInSeconds: (state) => {
    const duration = selectors.getDuration(state)
    return Math.max(0, Math.round((duration - state.timer.elapsedTime) / 1000))
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
  PAUSE_TIMER: '[timer] PAUSE_TIMER',
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
  pauseTimer: () => ({
    type: actionTypes.PAUSE_TIMER
  }),

  /** Increments the elapsed time by 1 second */
  updateElapsedTime: (ms) => ({
    type: actionTypes.UPDATE_ELAPSED_TIME,
    payload: ms
  })
}
