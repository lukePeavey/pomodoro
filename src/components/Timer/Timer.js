import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ResetIcon from '@material-ui/icons/SettingsBackupRestore'
import { capitalize, getTimestamp, formatTime } from '../../utils'
import ProgressIndicator from '../ProgressIndicator'
import { ALERT_URL } from '../../constants'

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
export default class Timer extends React.Component {
  /** Store the requestAnimationFrame id in state */
  state = { rid: null }

  componentWillUnMount() {
    // Stop the requestAnimationFrame loop when component unMounts
    if (this.state.rid) {
      window.cancelAnimationFrame(this.state.rid)
    }
  }

  /**
   * Listen for changes to the `timerState` prop. After a redux action is
   * dispatched to start or stop the timer, the value of the `timerState`
   * prop will change. When this occurs, the requestAnimationFrame loop
   * that updates the elapsed time is stopped/started
   */
  componentDidUpdate = (prevProps) => {
    const { timerState } = this.props
    if (prevProps.timerState !== timerState) {
      // When the timer is started, start running the requestAnimationFrame loop
      if (timerState === 'RUNNING') {
        this.setState({ rid: window.requestAnimationFrame(this.tick) })
      }
      // When the timer is stopped/paused, stop the requestAnimationFrame loop
      if (timerState !== 'RUNNING') {
        this.setState({ rid: window.cancelAnimationFrame(this.state.rid) })
      }
    }
  }

  /** The callback function that the updates elapsed */
  tick = () => {
    const { startTime, duration, actions } = this.props
    const timestamp = getTimestamp()
    const elapsedTime = timestamp - startTime
    if (elapsedTime < duration) {
      // Dispatch redux action to update elapsed time
      actions.updateElapsedTime(elapsedTime)
      this.setState({ rid: window.requestAnimationFrame(this.tick) })
    } else {
      // If the full duration of the timer has elapsed, start the next session.
      this.startNextTimer()
    }
  }

  /** Starts the next timer (session/break) when a timer is complete */
  startNextTimer = () => {
    const { timerType: previousTimerType, actions } = this.props
    const nextTimerType = previousTimerType === 'SESSION' ? 'BREAK' : 'SESSION'
    this.playAudioAlert()
    // Wait 500ms before starting the next timer
    window.setTimeout(() => {
      actions.initializeTimer({ type: nextTimerType })
      actions.startTimer(getTimestamp())
    }, 500)
  }

  /** Toggle the audio alert */
  playAudioAlert(play = true) {
    if (this.audioElement) {
      if (play === true) {
        this.audioElement.currentTime = 0
        this.volume = '0.5'
        this.audioElement.play()
      } else {
        this.audioElement.pause()
      }
    }
  }

  /** Event handler for the start/stop button */
  onStartStopClick = (event) => {
    const { timerState, actions } = this.props
    if (timerState === 'RUNNING') {
      actions.pauseTimer()
    } else {
      actions.startTimer(getTimestamp())
    }
  }

  /** Event handler for the reset button */
  onResetClick = (event) => {
    const { actions } = this.props
    this.playAudioAlert(false)
    actions.resetAppState()
  }

  onAudioRef = (element) => {
    this.audioElement = element
  }

  render() {
    const { timerType, remainingTime, timerState, percentComplete } = this.props
    const { onResetClick, onStartStopClick, onAudioRef } = this
    return (
      <section className="Timer" key="timer">
        <div className="Timer-content">
          <h1 id="timer-label" className="Timer-label">
            {capitalize(timerType)}
          </h1>
          <div id="time-left" className="Timer-displayTime">
            {formatTime(remainingTime)}
          </div>
          <div className="Timer-controls">
            <IconButton id="reset" onClick={onResetClick} color="primary">
              <ResetIcon />
            </IconButton>
            <Button id="start_stop" onClick={onStartStopClick} color="primary">
              {timerState === 'RUNNING' ? 'Stop' : 'Start'}
            </Button>
          </div>
        </div>
        <ProgressIndicator percentComplete={percentComplete} />
        <audio ref={onAudioRef} id="beep" src={ALERT_URL} />
      </section>
    )
  }
}

Timer.propTypes = {
  /** The type of timer currently*/
  timerType: PropTypes.oneOf(['SESSION', 'BREAK']).isRequired,
  /** The duration of the time in milliseconds */
  duration: PropTypes.number.isRequired,
  /** The remaining time (number of seconds) */
  remainingTime: PropTypes.number.isRequired,
  /** A flag that is true while the timer is running */
  timerState: PropTypes.oneOf(['RUNNING', 'STOPPED', 'PAUSED']),
  /** The high res timestamp when timer was started */
  startTime: PropTypes.number,
  /** The percentage of time that has elapsed */
  percentComplete: PropTypes.number.isRequired,
  /** Bound redux actions */
  actions: PropTypes.shape({
    initializeTimer: PropTypes.func.isRequired,
    updateElapsedTime: PropTypes.func.isRequired,
    startTimer: PropTypes.func.isRequired,
    pauseTimer: PropTypes.func.isRequired,
    resetAppState: PropTypes.func.isRequired
  }).isRequired
}
