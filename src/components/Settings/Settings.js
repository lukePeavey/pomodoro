import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import { upperFirst, capitalize } from '../../utils'

/**
 * Renders the settings for break length and session length. Each setting
 * shows the value, label, and increment, decrement buttons.
 */
export default class Settings extends React.PureComponent {
  /**
   * Returns a callback function that increments timer length by 1 minute
   * @param {'session' | 'break'} timerType
   */
  incrementTimerLength = (timerType) => () => {
    const currentValue = this.props[`${timerType}Length`]
    this.props.actions[`set${capitalize(timerType)}Length`](currentValue + 1)
  }

  /**
   * Returns a callback function that decrements timer length by 1 minute
   * @param {'session' | 'break'} timerType
   */
  decrementTimerLength = (timerType) => () => {
    const currentValue = this.props[`${timerType}Length`]
    this.props.actions[`set${capitalize(timerType)}Length`](currentValue - 1)
  }

  render() {
    return (
      <section className="Settings">
        {['session', 'break'].map((timerType) => {
          const value = this.props[`${timerType}Length`]
          const increment = this.incrementTimerLength(timerType)
          const decrement = this.decrementTimerLength(timerType)
          return (
            <div className="Settings-field" key={timerType}>
              <span className="Settings-label" id={`${timerType}-label`}>
                {`${capitalize(timerType)} Length`}
              </span>
              <IconButton id={`${timerType}-decrement`} onClick={decrement}>
                <ArrowLeftIcon className="Settings-icon" />
              </IconButton>
              <span className="Settings-value" id={`${timerType}-length`}>
                {value}
              </span>
              <IconButton id={`${timerType}-increment`} onClick={increment}>
                <ArrowRightIcon className="Settings-icon" />
              </IconButton>
            </div>
          )
        })}
      </section>
    )
  }
}

Settings.propTypes = {
  /** Length of work session (number of minutes) */
  sessionLength: PropTypes.number.isRequired,
  /** Length of break (number of minutes) */
  breakLength: PropTypes.number.isRequired,
  /** Object containing bound Redux actions */
  actions: PropTypes.shape({
    /** Sets the session length  */
    setSessionLength: PropTypes.func.isRequired,
    /** Sets the length of break */
    setBreakLength: PropTypes.func.isRequired
  }).isRequired
}
