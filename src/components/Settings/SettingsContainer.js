import { connect } from 'react-redux'
import { actions, selectors } from '../../store/'
import bindActions from '../../utils/bindActions'
import Settings from './Settings'

const mapStateToProps = (state) => ({
  sessionLength: selectors.getSessionLength(state),
  breakLength: selectors.getBreakLength(state)
})

// Injects an `actions` prop containing bound action creators
const mapDispatchToProps = bindActions({
  setSessionLength: actions.setSessionLength,
  setBreakLength: actions.setBreakLength
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
