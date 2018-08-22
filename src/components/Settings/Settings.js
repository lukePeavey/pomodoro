import React from 'react'
import PropTypes from 'prop-types'
import PlusIcon from '@material-ui/icons/AddCircleOutline'
import MinusIcon from '@material-ui/icons/RemoveCircleOutline'
import IconButton from '@material-ui/core/IconButton'
import { upperFirst } from '../../utils'

/**
 * Renders the settings for breakLength/sessionLength. Each settings
 * shows the value, label, and increment, decrement buttons.
 */
export default class Settings extends React.PureComponent {
  /** Increments the value for sessionLength/breakLength */
  increment = (type) => (event) => {
    const { sessionLength, breakLength, actions } = this.props
    const value = type === 'break' ? breakLength : sessionLength
    actions[`set${upperFirst(type)}Length`](parseInt(value + 1))
  }

  /** Decrements the value for sessionLength/breakLength */
  decrement = (type) => (event) => {
    const { sessionLength, breakLength, actions } = this.props
    const value = type === 'break' ? breakLength : sessionLength
    actions[`set${upperFirst(type)}Length`](parseInt(value - 1))
  }

  render() {
    const { sessionLength, breakLength } = this.props
    return (
      <section className="Settings">
        {['session', 'break'].map((type) => (
          <div className="Settings-field" key={type}>
            <div className="Settings-fieldLabel" id={`${type}-label`}>
              {`${upperFirst(type)} Length`}
            </div>
            <IconButton id={`${type}-increment`} onClick={this.increment(type)}>
              <PlusIcon style={{ fontSize: 32 }} />
            </IconButton>
            <span className="Settings-fieldValue" id={`${type}-length`}>
              {type === 'break' ? breakLength : sessionLength}
            </span>
            <IconButton id={`${type}-decrement`} onClick={this.decrement(type)}>
              <MinusIcon style={{ fontSize: 32 }} />
            </IconButton>
          </div>
        ))}
      </section>
    )
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
