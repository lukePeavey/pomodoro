import React from 'react'
import PropTypes from 'prop-types'

/**
 * Renders the settings for breakLength/sessionLength. Each settings
 * shows the value, label, and increment, decrement buttons.
 */
export default class Settings extends React.PureComponent {
  /** Increments the value for sessionLength/breakLength */
  increment = (type) => (event) => {}

  /** Decrements the value for sessionLength/breakLength */
  decrement = (type) => (event) => {}

  render() {
    return <div>This is a stub</div>
  }
}

Settings.propTypes = {
  /** Length of work session (number of minutes) */
  sessionLength: PropTypes.number.isRequired,
  /** Length of break (number of minutes) */
  breakLength: PropTypes.number.isRequired,
  /** Bound Redux actions */
  actions: PropTypes.shape({
    /** Sets the session length  */
    setSessionLength: PropTypes.func.isRequired,
    /** Sets the length of break */
    setBreakLength: PropTypes.func.isRequired
  }).isRequired
}
