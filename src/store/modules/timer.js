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
  return state
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
  getDuration: (state) => {},
  /**
   * @computed
   * Returns the percentage of elapsed time
   */
  getPercentComplete: (state) => {},
  /**
   * @computed
   * Returns a time string that represents the remaining time in HH:MM:SS
   */
  getRemainingTimeString: (state) => {},
  /**
   * @computed
   * returns true if timer is done
   */
  isTimerDone: (state) => {}
}

/**
|--------------------------------------------------
| Actions
|--------------------------------------------------
*/
export const actionTypes = {
  NEW_TIMER: '[timer] NEW_TIMER',
  START_TIMER: '[timer] START_TIMER',
  PAUSE_TIMER: '[timer] PAUSE_TIMER',
  UPDATE_ELAPSED_TIME: '[timer] UPDATE_ELAPSED_TIME'
}

export const actions = {
  /** Starts a new timer of the specified type ('SESSION' | 'BREAK') */
  newTimer: (type) => ({
    type: actionTypes.NEW_TIMER,
    payload: type
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

  /** Updates the elapsed time of the timer.  */
  updateElapsedTime: (milliseconds) => ({
    type: actionTypes.UPDATE_ELAPSED_TIME,
    payload: milliseconds
  })
}
