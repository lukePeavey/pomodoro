import { connect } from 'react-redux'
import { actions, selectors } from '../../store/'
import bindActions from '../../utils/bindActions'
import Timer from './Timer'

const mapStateToProps = (state) => ({
  percentComplete: selectors.getPercentComplete(state),
  duration: selectors.getDuration(state),
  timerType: selectors.getTimerType(state),
  remainingTime: selectors.getRemainingTimeInSeconds(state),
  timerState: selectors.getTimerState(state),
  startTime: selectors.getStartTime(state)
})

// Injects an `actions` prop containing bound action creators
const mapDispatchToProps = bindActions({
  initializeTimer: actions.initializeTimer,
  incrementElapsedTime: actions.incrementElapsedTime,
  startTimer: actions.startTimer,
  pauseTimer: actions.pauseTimer,
  resetTimer: actions.resetTimer,
  restoreDefaults: actions.restoreDefaults
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer)
