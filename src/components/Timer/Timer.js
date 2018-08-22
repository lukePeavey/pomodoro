import React from 'react'
import PropTypes from 'prop-types'

/**
 * Handles the timer logic - updating state while timer is running,
 * starting next session when timer is complete.
 *
 * Renders the timer interface, which consist of:
 * - Timer label
 * - Remaining time display
 * - Circular progress indicator
 * - Start/stop & reset buttons
 */
export default class Timer extends React.PureComponent {
  state = { requestID: null }

  /** Updates the timer state on each RAF callback */
  updateTimer = (timestamp) => {}

  /** Starts the next work/break session. */
  startNextSession = () => {}

  /** Listen for changes to props.isRunning */
  componentDidUpdate = (prevProps) => {}

  /** Event handler for the start/stop button */
  handleToggleButtonClick = (event) => {}

  /** Event handler for the reset button */
  handleResetButtonClick = (event) => {}

  render() {
    return <div>This is a stub</div>
  }
}

Timer.propTypes = {
  /** The type of timer currently*/
  type: PropTypes.oneOf(['SESSION', 'BREAK']).isRequired,
  /** The duration of the time in milliseconds */
  duration: PropTypes.number.isRequired,
  /** The remaining time in HH:MM:SS */
  remainingTimeString: PropTypes.string.isRequired,
  /** Elapsed time in milliseconds */
  elapsedTime: PropTypes.number.isRequired,
  /** A flag that is true while the timer is running */
  isRunning: PropTypes.bool.isRequired,
  /** The high res timestamp when timer was started */
  startTime: PropTypes.number,
  /** Bound redux actions */
  actions: PropTypes.shape({
    initializeTimer: PropTypes.func.isRequired,
    updateElapsedTime: PropTypes.func.isRequired,
    stopTimer: PropTypes.func.isRequired,
    startTimer: PropTypes.func.isRequired,
    restoreDefaults: PropTypes.func.isRequired
  }).isRequired
}
