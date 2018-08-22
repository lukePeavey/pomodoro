import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import ResetIcon from '@material-ui/icons/SettingsBackupRestore'
import IconButton from '@material-ui/core/IconButton'
import ProgressIndicator from '../ProgressIndicator'
import { requestAnimationFrame, cancelAnimationFrame } from '../../utils'

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

  componentDidMount = () => {
    // Initialize a new timer on mount
    this.props.actions.initializeTimer()
  }

  /** Updates the timer state on each RAF callback */
  updateTimer = (timestamp) => {
    const { startTime, duration, actions } = this.props
    const elapsedTime = timestamp - startTime

    // When the timer reaches zero, start the next session
    if (elapsedTime >= duration) {
      this.startNextSession()
    } else {
      // Update the elapsed time value in state.
      actions.updateElapsedTime(elapsedTime)
      this.setState({ requestID: requestAnimationFrame(this.updateTimer) })
    }
  }

  /** Starts the next work/break session. */
  startNextSession = () => {
    const { type: previousType, actions } = this.props
    actions.stopTimer()
    actions.initializeTimer({
      type: previousType === 'SESSION' ? 'BREAK' : 'SESSION',
      startTime: window.performance.now(),
      isRunning: true
    })
  }

  /** Listen for changes to props.isRunning */
  componentDidUpdate = (prevProps) => {
    // When the timer is stopped/started...
    if (prevProps.isRunning !== this.props.isRunning) {
      // Start running the updateTimer loop when the timer is started
      if (this.props.isRunning) {
        cancelAnimationFrame(this.state.requestID)
        this.setState({ requestID: requestAnimationFrame(this.updateTimer) })
      }
      // Stop the updateTimer loop when the timer is stopped/paused
      if (!this.props.isRunning) {
        this.setState(({ requestID }) => ({
          requestID: cancelAnimationFrame(requestID)
        }))
      }
    }
  }

  /** Event handler for the start/stop button */
  handleToggleButtonClick = (event) => {
    const { isRunning, actions } = this.props
    const timestamp = window.performance.now()
    const toggleTimer = isRunning ? 'stopTimer' : 'startTimer'
    actions[toggleTimer](timestamp)
  }

  /** Event handler for the reset button */
  handleResetButtonClick = (event) => {
    const { actions } = this.props
    actions.stopTimer()
    actions.restoreDefaults()
    actions.initializeTimer()
  }

  render() {
    const { remainingTimeString, isRunning, type, percentComplete } = this.props
    return [
      <section className="Timer" key="timer">
        <div className="Timer-content">
          <h1 className="Timer-label" id="timer-label">
            {type}
          </h1>
          <div id="time-left" className="Timer-displayTime">
            {remainingTimeString}
          </div>
          <div className="controls">
            <IconButton onClick={this.handleResetButtonClick}>
              <ResetIcon />
            </IconButton>
            <Button id="start_stop" onClick={this.handleToggleButtonClick}>
              {isRunning ? 'Stop' : 'Start'}
            </Button>
          </div>
        </div>
        <ProgressIndicator percentComplete={percentComplete} />
      </section>
    ]
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
  /** Number representing percentage of elapsed time (for progressIndicator) */
  percentComplete: PropTypes.number.isRequired,
  /** Bound redux actions */
  actions: PropTypes.shape({
    initializeTimer: PropTypes.func.isRequired,
    updateElapsedTime: PropTypes.func.isRequired,
    stopTimer: PropTypes.func.isRequired,
    startTimer: PropTypes.func.isRequired,
    restoreDefaults: PropTypes.func.isRequired
  }).isRequired
}
