import { connect } from 'react-redux'
import { actions, selectors } from '../../store/'
import bindActions from '../../utils/bindActions'
import Timer from './Timer'

const mapStateToProps = (state) => ({
  percentComplete: selectors.getPercentComplete(state),
  duration: selectors.getDuration(state),
  type: selectors.getTimerType(state),
  remainingTimeString: selectors.getRemainingTimeString(state),
  elapsedTime: selectors.getElapsedTime(state),
  isRunning: selectors.isRunning(state),
  sessionLength: selectors.getSessionLength(state),
  startTime: selectors.getStartTime(state)
})

const mapDispatchToProps = bindActions({
  updateElapsedTime: actions.updateElapsedTime,
  initializeTimer: actions.initializeTimer,
  stopTimer: actions.stopTimer,
  startTimer: actions.startTimer,
  restoreDefaults: actions.restoreDefaults
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer)
